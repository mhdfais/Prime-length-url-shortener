import { useState } from "react";
import toast from "react-hot-toast";
import { shortUrl } from "../services/shortenService";

const Shortener = () => {
  const [url, setUrl] = useState("");
  const [shortedUrl, setSShortedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    try {
      setLoading(true);
      if (!url || url.trim() === ""){
         toast.error("please enter url properly");
         return
      }
      const response = await shortUrl(url.trim());
      setSShortedUrl(response.data.shortUrl);
    } catch (error) {
      toast.error("failed to shorten url");
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-6 mt-10 w-full max-w-md">
      <div className="mb-3">
        <label className="font-bold text-gray-700 block mb-2">Enter URL</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="url"
          required
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="flex justify-center">
        <button
          disabled={loading}
          onClick={shortenUrl}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 w-full"
        >
          {loading ? "Shortening" : "Shorten URL"}
        </button>
      </div>

      {shortedUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            Short URL Created!
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <code className="flex-1 px-2 py-1 bg-white border rounded text-sm">
                {shortedUrl}
              </code>
              <button
                onClick={() => openUrl(shortedUrl)}
                className="p-1 text-green-600 hover:text-green-800"
                title="Open in new tab"
              >
                Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shortener;
