import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function ShortenUrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrlString: longUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      setShortUrl(result);
      setError(null);
    } catch (error) {
      setError("Failed to shorten URL");
      setShortUrl("");
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Kelechi's URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <Button type="submit">Shorten URL</Button>
      </form>
      {shortUrl && (
        <div className="mt-4 flex items-center space-x-2">
          <p className="font-semibold">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            <ClipboardIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
