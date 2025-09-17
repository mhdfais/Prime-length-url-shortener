import { Request, Response } from "express";
import { errorHandler } from "../utils/handleError";
import { isValidUrl } from "../utils/isValidUrl";
import { CustomError } from "../errors/customError";
import HttpStatusCode from "../enums/httpStatusCodes";
import UrlSchema from "../models/UrlSchema";
import { hash } from "../utils/urlHash";
import { smallestPrimeNumberGreaterThanDocuments } from "../utils/findSmallPrime";

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || !isValidUrl(url))
      throw new CustomError("invalid url", HttpStatusCode.BAD_REQUEST);

    const existingUrl = await UrlSchema.findOne({ url });
    if (existingUrl) {
      return res.json({
        url: existingUrl.url,
        shorted: existingUrl.shortCode,
        shortUrl: `${req.protocol}://${req.get("host")}/r/${existingUrl.shortCode}`,
      });
    }

    const maxAttempts = 5;
    let collisionAttempts = 0;

    while (collisionAttempts < maxAttempts) {
      const numOfDocuments = await UrlSchema.countDocuments();
      const smallPrimeNum = smallestPrimeNumberGreaterThanDocuments(numOfDocuments);

      const hashedurl = hash(url);
      const shortedcode = hashedurl.substring(0, smallPrimeNum);

      const isExist = await UrlSchema.findOne({ shortCode: shortedcode });
      
      if (isExist) {
        if (isExist.url === url) {
          return res.json({
            url: isExist.url,
            shorted: isExist.shortCode,
            shortUrl: `${req.protocol}://${req.get("host")}/r/${isExist.shortCode}`,
          });
        } else {
          const nextPrime = smallestPrimeNumberGreaterThanDocuments(smallPrimeNum);
          const nextShortedCode = hashedurl.substring(0, nextPrime);

          const nextExist = await UrlSchema.findOne({ shortCode: nextShortedCode });
          
          if (nextExist && nextExist.url === url) {
            return res.json({
              url: nextExist.url,
              shorted: nextExist.shortCode,
              shortUrl: `${req.protocol}://${req.get("host")}/r/${nextExist.shortCode}`,
            });
          }

          if (!nextExist) {
            try {
              const newUrlSchema = new UrlSchema({
                url,
                shortCode: nextShortedCode,
              });

              await newUrlSchema.save();
              return res.json({
                url: newUrlSchema.url,
                shorted: newUrlSchema.shortCode,
                shortUrl: `${req.protocol}://${req.get("host")}/r/${newUrlSchema.shortCode}`,
              });
              
            } catch (error: any) {
              if (error.code === 11000) {
                collisionAttempts++;
                console.log(`Next prime collision attempt ${collisionAttempts}/${maxAttempts}`);
                
                continue;
              }
              throw error;
            }
          } else {
            collisionAttempts++;
            console.log(`Multiple collisions, attempt ${collisionAttempts}/${maxAttempts}`);
            
            await new Promise(resolve => setTimeout(resolve, Math.random() * 150));
          }
        }
      } else {
        try {
          const newUrlSchema = new UrlSchema({
            url,
            shortCode: shortedcode,
          });

          await newUrlSchema.save();
          return res.json({
            url: newUrlSchema.url,
            shorted: newUrlSchema.shortCode,
            shortUrl: `${req.protocol}://${req.get("host")}/r/${newUrlSchema.shortCode}`,
          });
          
        } catch (error: any) {
          if (error.code === 11000) {
            collisionAttempts++;
            console.log(`Race condition collision attempt ${collisionAttempts}/${maxAttempts}`);
            
            continue;
          }
          throw error;
        }
      }
      
      collisionAttempts++;
    }

    throw new CustomError(
      "not able to short url, max attempts reached", 
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );

  } catch (error) {
    errorHandler(error, res);
  }
};

export const redirectShortUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const shortedUrl = await UrlSchema.findOne({ shortCode });
    if (!shortedUrl)
      throw new CustomError("url not found", HttpStatusCode.NOT_FOUND);

    res.redirect(shortedUrl.url)
  } catch (error) {
    errorHandler(error, res);
  }
};
