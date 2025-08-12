import React, { useState, useEffect } from 'react';
import { Eye, LogOut, Search, ChevronLeft, ChevronRight, AlertCircle, Database, CheckCircle } from 'lucide-react';

interface TableInfo {
  name: string;
  schema: string;
}

interface QueryResult {
  rows: any[];
  totalCount: number;
  columns: string[];
}

interface DbStatus {
  ok: boolean;
  driver: string;
  error?: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Database status
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [dbStatusLoading, setDbStatusLoading] = useState(false);

  // Data viewer state
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [data, setData] = useState<QueryResult>({ rows: [], totalCount: 0, columns: [] });
  const [dataLoading, setDataLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState('');

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Load DB status and tables when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      checkDbStatus();
      loadTables();
    }
  }, [isAuthenticated]);

  // Load sample data when table changes
  useEffect(() => {
    if (isAuthenticated && selectedTable) {
      loadSampleData();
    }
  }, [isAuthenticated, selectedTable]);

  // Load paginated data when params change
  useEffect(() => {
    if (isAuthenticated && selectedTable && (page > 1 || search || sortBy)) {
      loadData();
    }
  }, [isAuthenticated, selectedTable, page, limit, search, sortBy, sortDir]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/.netlify/functions/admin-db-ping', {
        credentials: 'include'
      });
      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const checkDbStatus = async () => {
    setDbStatusLoading(true);
    try {
      const response = await fetch('/.netlify/functions/admin-db-ping', {
        credentials: 'include'
      });
      
      if (response.ok) {
        try {
          const status = await response.json();
          setDbStatus(status);
        } catch {
          setDbStatus({ ok: false, driver: 'unknown', error: 'Invalid response format' });
        }
      } else {
        setDbStatus({ ok: false, driver: 'unknown', error: `Failed to ping database (${response.status})` });
      }
    } catch (error) {
      setDbStatus({ ok: false, driver: 'unknown', error: 'Network error' });
    } finally {
      setDbStatusLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/.netlify/functions/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginForm)
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
      } else {
        try {
          const error = await response.json();
          setLoginError(error.error || `Login failed (${response.status})`);
        } catch {
          setLoginError(`Login failed (${response.status})`);
        }
      }
    } catch (error) {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/.netlify/functions/admin-logout', {
        method: 'POST',
        credentials: 'include'
      });
    } finally {
      setIsAuthenticated(false);
      setTables([]);
      setSelectedTable('');
      setData({ rows: [], totalCount: 0, columns: [] });
      setDbStatus(null);
    }
  };

  const loadTables = async () => {
    try {
      const response = await fetch('/.netlify/functions/admin-tables', {
        credentials: 'include'
      });
      
      if (response.ok) {
        try {
          const result = await response.json();
          if (result.ok && result.tables) {
            setTables(result.tables);
            if (result.tables.length > 0) {
              setSelectedTable(result.tables[0].name);
            }
          } else {
            setError(result.error || 'Failed to load tables');
          }
        } catch {
          setError(`Failed to parse tables response (${response.status})`);
        }
      } else {
        setError(`Failed to fetch tables (${response.status})`);
      }
    } catch (error) {
      console.error('Error loading tables:', error);
      setError('Network error loading tables');
    }
  };

  const loadSampleData = async () => {
    if (!selectedTable) return;
    
    setDataLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/.netlify/functions/admin-sample?table=${encodeURIComponent(selectedTable)}&limit=10`, {
        credentials: 'include'
      });

      if (response.ok) {
        try {
          const result = await response.json();
          if (result.ok) {
            setData({
              rows: result.rows,
              totalCount: result.totalCount,
              columns: result.columns
            });
            setPage(1); // Reset to first page
          } else {
            setError(result.error || 'Failed to load sample data');
          }
        } catch {
          setError(`Failed to parse sample data response (${response.status})`);
        }
      } else {
        setError(`Failed to fetch sample data (${response.status})`);
      }
    } catch (error) {
      console.error('Error loading sample data:', error);
      setError('Network error loading sample data');
    } finally {
      setDataLoading(false);
    }
  };

  const loadData = async () => {
    if (!selectedTable) return;
    
    setDataLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams({
        action: 'rows',
        table: encodeURIComponent(selectedTable),
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { q: search }),
        ...(sortBy && { sortBy, sortDir })
      });

      const response = await fetch(`/.netlify/functions/admin-data?${params}`, {
        credentials: 'include'
      });

      if (response.ok) {
        try {
          const result = await response.json();
          if (result.ok) {
            setData({
              rows: result.rows,
              totalCount: result.totalCount,
              columns: result.columns
            });
          } else {
            setError(result.error || 'Failed to load data');
          }
        } catch {
          setError(`Failed to parse data response (${response.status})`);
        }
      } else {
        setError(`Failed to fetch data (${response.status})`);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Network error loading data');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  const totalPages = Math.ceil(data.totalCount / limit);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center mb-6">
            <Eye className="w-6 h-6 text-red-500 mr-2" />
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-red-400 text-sm">{loginError}</div>
            )}
            
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-6 h-6 text-red-500 mr-2" />
            <h1 className="text-xl font-bold">Admin • Data Viewer</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Database Status Banner */}
      {dbStatusLoading ? (
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
          <div className="flex items-center text-gray-400">
            <Database className="w-4 h-4 mr-2 animate-spin" />
            Checking database connection...
          </div>
        </div>
      ) : dbStatus && !dbStatus.ok ? (
        <div className="bg-red-900/50 border-b border-red-700 px-6 py-3">
          <div className="flex items-center text-red-200">
            <AlertCircle className="w-4 h-4 mr-2" />
            Database Error ({dbStatus.driver}): {dbStatus.error}
          </div>
        </div>
      ) : dbStatus && dbStatus.ok ? (
        <div className="bg-green-900/50 border-b border-green-700 px-6 py-3">
          <div className="flex items-center text-green-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Connected to {dbStatus.driver} • {tables.length} tables found
          </div>
        </div>
      ) : null}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-900/50 border-b border-red-700 px-6 py-3">
          <div className="flex items-center justify-between text-red-200">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
            <button
              onClick={() => setError('')}
              className="text-red-300 hover:text-red-100"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Table
            </label>
            <select
              value={selectedTable}
              onChange={(e) => {
                setSelectedTable(e.target.value);
                setPage(1);
                setSearch('');
                setSortBy('');
              }}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
            >
              {tables.length === 0 ? (
                <option value="">No tables found</option>
              ) : (
                tables.map((table) => (
                  <option key={table.name} value={table.name}>
                    {table.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search records..."
                className="pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Per Page
            </label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-6">
        {tables.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">
              No tables found. Check DATABASE_URL or run migrations.
              <br />
              <span className="text-sm">For Supabase: Check your database schema and RLS policies.</span>
            </div>
          </div>
        ) : dataLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Loading data...</div>
          </div>
        ) : data.rows.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">No data found in {selectedTable}</div>
          </div>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      {data.columns.map((column) => (
                        <th
                          key={column}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                          onClick={() => handleSort(column)}
                        >
                          <div className="flex items-center">
                            {column}
                            {sortBy === column && (
                              <span className="ml-1">
                                {sortDir === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {data.rows.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-700">
                        {data.columns.map((column) => (
                          <td key={column} className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">
                            {formatValue(row[column])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, data.totalCount)} of {data.totalCount} results
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-md transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-sm text-gray-400">
                  Page {page} of {totalPages}
                </span>
                
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-md transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;