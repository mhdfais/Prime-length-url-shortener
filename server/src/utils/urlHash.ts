import crypto from "crypto";

export function hash(url: string) {
  const hashUrl = crypto.createHash("sha256").update(url).digest("hex");
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopkrstuvwxyz";

  let result = "";

  for (let i = 0; i < hashUrl.length; i += 2) {
    const pair = hashUrl.substring(i, i + 2);
    const decimal = parseInt(pair, 16);
    result += chars[decimal % 62];
  }
  return result;
}
