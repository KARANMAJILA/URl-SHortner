// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import {
  BarChart3,
  Copy,
  ExternalLink,
  Calendar,
  MousePointer,
  Link as LinkIcon,
  Loader2,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import api from '../services/Api';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await api.get('/urls');
      setUrls(response.data);
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch URLs';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUrls();
    setRefreshing(false);
    toast.success('Dashboard refreshed!');
  };

  const handleCopy = (url) => {
    toast.success('URL copied to clipboard!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTotalStats = () => {
    return {
      totalUrls: urls.length,
      totalClicks: urls.reduce((sum, url) => sum + url.clicks, 0),
      avgClicks:
        urls.length > 0
          ? (urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length).toFixed(1)
          : 0
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <button
          onClick={fetchUrls}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Overview of all your shortened URLs</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={refreshing}
        >
          <RefreshCw className={refreshing ? 'animate-spin' : ''} size={18} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-full">
            <LinkIcon size={24} />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{stats.totalUrls}</p>
            <p className="text-sm text-gray-500">Total URLs</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-full">
            <MousePointer size={24} />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{stats.totalClicks}</p>
            <p className="text-sm text-gray-500">Total Clicks</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{stats.avgClicks}</p>
            <p className="text-sm text-gray-500">Avg Clicks</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent URLs</h2>
        {urls.length === 0 ? (
          <div className="text-center py-10">
            <LinkIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No URLs yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first shortened URL</p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create URL
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Original URL</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Short URL</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600">Clicks</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600">Created</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url.id} className="border-t">
                    <td className="px-4 py-2 max-w-sm truncate text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <LinkIcon size={16} className="text-gray-400" />
                        <span title={url.originalUrl}>{url.originalUrl}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-blue-600 font-medium">{url.shortCode}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 flex items-center gap-1 justify-center">
                      <MousePointer size={14} />
                      {url.clicks}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">{formatDate(url.createdAt)}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      <div className="flex gap-2">
                        <CopyToClipboard text={url.shortUrl} onCopy={() => handleCopy(url.shortUrl)}>
                          <button className="p-1 border border-gray-300 rounded hover:bg-gray-100" title="Copy">
                            <Copy size={14} />
                          </button>
                        </CopyToClipboard>
                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                          title="Open"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <Link
                          to={`/stats/${url.shortCode}`}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                          title="View Stats"
                        >
                          <BarChart3 size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
