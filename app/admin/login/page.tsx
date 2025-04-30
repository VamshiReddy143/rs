'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Child component for search params
function RedirectHandler({ onRedirect }: { onRedirect: (redirect: string) => void }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  onRedirect(redirect); // Pass redirect to parent
  return null; // No UI needed
}

export default function AdminLoginPage() {
  const [redirect, setRedirect] = useState('/admin'); // Default redirect
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('[AdminLoginPage] Submitting login:', { email, redirect });
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('[AdminLoginPage] Fetch response status:', res.status);
      const data = await res.json();
      console.log('[AdminLoginPage] Response data:', data);

      if (!res.ok) {
        console.error('[AdminLoginPage] Login error:', data.error);
        toast.error(data.error || 'Login failed', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
        throw new Error(data.error || 'Login failed');
      }

      console.log('[AdminLoginPage] Login successful, redirecting to:', redirect);
      toast.success('Access granted. Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      setTimeout(() => {
        window.location.assign(redirect);
        console.log('[AdminLoginPage] window.location.assign called');
      }, 2000);
    } catch (err: any) {
      console.error('[AdminLoginPage] Error:', err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191a1b] text-white flex items-center justify-center p-5">
      <Suspense fallback={null}>
        <RedirectHandler onRedirect={setRedirect} />
      </Suspense>
      <div className="max-w-md w-full p-8 bg-[#242425] rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Secure Admin Login
        </h1>
        {error && (
          <p className="text-red-400 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm text-[#969699]" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-[#3d3d3f] rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-[#969699]" htmlFor="password">
              Password *
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-[#3d3d3f] rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-[#f6ff7a] text-black rounded-lg font-bold text-[1em] transition-colors duration-300 hover:bg-[#AAB418] disabled:bg-[#AAB418] disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#242425',
          color: '#FFFFFF',
          border: '1px solid #969699',
          borderRadius: '8px',
        }}
      />
    </div>
  );
}