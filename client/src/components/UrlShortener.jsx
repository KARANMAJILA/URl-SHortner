
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { Link, Copy, ExternalLink, BarChart3, Loader2 } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import api from '../services/Api';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/shorten', { url });
      setResult(response.data);
      setShortUrl(response.data.shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to shorten URL';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    toast.success('URL copied to clipboard!');
  };

  const handleReset = () => {
    setUrl('');
    setShortUrl('');
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Shorten Your URLs</h1>
        <p className="text-gray-500">Create short, manageable links from long URLs</p>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-8">
        <div className="flex items-center border border-gray-300 rounded-lg w-full overflow-hidden">
          <div className="pl-3 text-white">
            <Link size={20} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className="flex-1 py-3 px-2 outline-none text-white"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : 'Shorten'}
        </button>
      </form>

      {result && (
        <div className="bg-white text-black shadow-md border border-gray-200 rounded-lg p-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-green-600 text-xl font-semibold">Your shortened URL is ready!</h3>
            <button onClick={handleReset} className="text-sm text-blue-600 hover:underline">Create Another</button>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-500">Original URL:</label>
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2 mt-1">
              <span className="flex-1 text-sm break-all">{result.originalUrl}</span>
              <a href={result.originalUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-500">Short URL:</label>
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2 mt-1">
              <span className="text-blue-600 font-medium break-all">{result.shortUrl}</span>
              <div className="flex gap-1">
                <CopyToClipboard text={result.shortUrl} onCopy={handleCopy}>
                  <button className="p-1 border border-gray-300 rounded hover:bg-gray-100" title="Copy">
                    <Copy size={16} />
                  </button>
                </CopyToClipboard>
                <a href={result.shortUrl} target="_blank" rel="noopener noreferrer" className="p-1 border border-gray-300 rounded hover:bg-gray-100" title="Open">
                  <ExternalLink size={16} />
                </a>
                <RouterLink to={`/stats/${result.shortCode}`} className="p-1 border border-gray-300 rounded hover:bg-gray-100" title="Stats">
                  <BarChart3 size={16} />
                </RouterLink>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Short Code</p>
              <p className="font-semibold text-gray-800">{result.shortCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Clicks</p>
              <p className="font-semibold text-gray-800">{result.clicks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-semibold text-gray-800">{new Date(result.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;