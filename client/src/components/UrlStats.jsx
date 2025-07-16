
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import {
  BarChart3,
  Copy,
  ExternalLink,
  Calendar,
  MousePointer,
  Link as LinkIcon,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import api from '../services/Api';

const UrlStats = () => {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [code]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/stats/${code}`);
      setStats(response.data);
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch statistics';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    toast.success('URL copied to clipboard!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="mt-4 text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <Link to="/" className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <ArrowLeft size={18} className="mr-2" />
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center gap-4">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600">
          <ArrowLeft size={18} className="mr-1" /> Back to Home
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">URL Statistics</h1>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-600 text-white rounded-full">
            <BarChart3 size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Short Code: {stats.shortCode}</h2>
            <p className="text-sm text-gray-500">Detailed analytics for your shortened URL</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Original URL</label>
            <div className="flex items-center gap-2 mt-1 p-2 border border-gray-200 rounded-md">
              <span className="flex-1 text-sm break-all">{stats.originalUrl}</span>
              <a href={stats.originalUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Short URL</label>
            <div className="flex items-center gap-2 mt-1 p-2 border border-gray-200 rounded-md">
              <span className="text-blue-600 font-medium break-all">{stats.shortUrl}</span>
              <CopyToClipboard text={stats.shortUrl} onCopy={handleCopy}>
                <button className="p-1 border border-gray-300 rounded hover:bg-gray-100">
                  <Copy size={16} />
                </button>
              </CopyToClipboard>
              <a href={stats.shortUrl} target="_blank" rel="noopener noreferrer" className="p-1 border border-gray-300 rounded hover:bg-gray-100">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
          <div className="bg-gray-50 p-4 rounded-md border">
            <MousePointer size={24} className="mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{stats.clicks}</p>
            <p className="text-sm text-gray-500">Total Clicks</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border">
            <Calendar size={24} className="mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{formatDate(stats.createdAt).split(',')[0]}</p>
            <p className="text-sm text-gray-500">Created Date</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border">
            <Calendar size={24} className="mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{stats.lastClicked ? formatDate(stats.lastClicked).split(',')[0] : 'Never'}</p>
            <p className="text-sm text-gray-500">Last Clicked</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Detailed Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex justify-between bg-white p-3 border border-gray-200 rounded-md">
              <span className="text-gray-500 font-medium">Total Clicks:</span>
              <span className="text-gray-800 font-semibold">{stats.clicks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlStats;
