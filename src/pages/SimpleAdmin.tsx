import React, { useState } from 'react';

const SimpleAdmin = () => {
  const [password, setPassword] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchData = async (pw: string) => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/.netlify/functions/simple-admin-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw })
      });

      const text = await res.text();
      let payload: any = null;
      try { 
        payload = text ? JSON.parse(text) : null; 
      } catch {
        setError('Invalid response format');
        return;
      }

      if (res.ok) {
        setRows(Array.isArray(payload) ? payload : []);
        setLoggedIn(true);
      } else if (res.status === 401) {
        setError(payload?.error || 'Incorrect password');
      } else {
        setError(payload?.error || `Server error (${res.status})`);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password);
  };

  const onRefresh = () => fetchData(password);

  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto p-6">
          {!loggedIn ? (
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <h1 className="text-xl font-semibold text-gray-900">Admin Login</h1>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded px-4 py-2 w-full transition-colors"
                  type="submit"
                >
                  {loading ? 'Loading...' : 'Enter'}
                </button>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900">Database Records</h1>
                <button
                  onClick={onRefresh}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded px-4 py-2 transition-colors"
                >
                  {loading ? 'Refreshing...' : 'Refresh Data'}
                </button>
              </div>
              
              
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">ID</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Phone</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Address</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Message</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Preferred Time</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Source Page</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">UTM Source</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-900">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                          No records found
                        </td>
                      </tr>
                    ) : (
                      rows.map((row: any) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{row.id}</td>
                          <td className="px-4 py-3 text-gray-900">{row.name}</td>
                          <td className="px-4 py-3 text-gray-900">{row.phone}</td>
                          <td className="px-4 py-3 text-gray-600">{row.address || '-'}</td>
                          <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{row.message || '-'}</td>
                          <td className="px-4 py-3 text-gray-600">{row.preferred_time || '-'}</td>
                          <td className="px-4 py-3 text-gray-600">{row.source_page || '-'}</td>
                          <td className="px-4 py-3 text-gray-600">{row.utm_source || '-'}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SimpleAdmin;