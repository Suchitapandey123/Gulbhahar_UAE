// @ts-nocheck
"use client"
export const dynamic = 'force-dynamic'
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/providers/ContextProviders/AuthContext';
import { useRouter } from 'next/navigation';
import authApi from '@/services/auth/authService';

const OAuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const hasProcessed = useRef(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
      return;
    }

    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // status === 'authenticated' from here
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const run = async () => {
      setIsProcessing(true);

      try {
        const token = session?.backendToken;

        if (!token) {
          console.error('[auth/callback] session.backendToken is missing. Session:', session);
          throw new Error('No backend token received. The backend login may have failed.');
        }

        let userData = session?.userData;

        if (!userData) {
          console.warn('[auth/callback] session.userData missing, fetching from backend...');
          const result = await authApi.handleSocialLoginCallback(token);
          if (!result.success || !result.userData) {
            throw new Error(result.error || 'Failed to fetch user data from backend.');
          }
          userData = result.userData;
        }

        console.log('[auth/callback] Calling login() with token and userData:', userData);
        const loginSuccess = await login(token, userData);

        if (loginSuccess) {
          window.location.href = '/';
        } else {
          throw new Error('login() returned false — failed to save to localStorage.');
        }
      } catch (err) {
        console.error('[auth/callback] Error:', err);
        setError(err?.message || 'Failed to complete social login. Please try again.');
        setTimeout(() => router.push('/login'), 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    run();
  }, [session, status, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-red-900/20 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        {error ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Login Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Redirecting to login page...</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Completing Login</h2>
            <p className="text-gray-600 mb-4">
              {isProcessing ? 'Processing your social login...' : 'Preparing your account...'}
            </p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-red-900 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-900 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-red-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
