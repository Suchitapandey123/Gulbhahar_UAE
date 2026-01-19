"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/providers/ContextProviders/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import authApi from '../../api/auth/auth';

const OAuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Don't process if already authenticated or already processing
      if (isAuthenticated || isProcessing) return;
      
      // Only process when we have an authenticated session with backend token
      if (status === 'authenticated' && session?.backendToken) {
        // console.log('🔄 Processing OAuth callback...', { 
        //   provider: session.user?.email ? 'social' : 'unknown',
        //   hasBackendToken: !!session.backendToken 
        // });
        
        setIsProcessing(true);
        
        try {
          const token = session.backendToken;
          
          // Get user data from session or fetch from backend
          let userData = session.userData;
          
          if (!userData) {
            // console.log('📡 Fetching user data from backend...');
            // const response = await axios.post(
            //   `https://api.gulbhahar.com/api/users/user-by-token`, 
            //   {},
            //   {
            //     headers: {
            //       'Content-Type': 'application/json',
            //       Authorization: `Bearer ${token}`
            //     }
            //   }
            // );
            
            const result = await authApi.handleSocialLoginCallback(token);
             if (!result.success) {
              throw new Error(result.error);
            }
             userData = result.userData;
            // console.log('📦 User data from backend:', userData);
          }
          
          // console.log('🔑 Completing social login...');
          const loginSuccess = await login(token, userData);
            // const data = response.data.user;
            // // console.log('📦 User data from backend:', data);
            
          //   userData = {
          //     email: data.email,
          //     name: data.name,
          //     firstName: data.firstName || data.first_name || data.user?.firstName || '',
          //     lastName: data.lastName || data.last_name || data.user?.lastName || '',
          //     userId: data.userId || data.id || data.user?.id || '',
          //     location: data.location || data.user?.location || '',
          //     phoneNumber: data.phoneNumber || data.phone || data.user?.phoneNumber || '',
          //     profilePicture: data.profilePicture || data.avatar || data.user?.profilePicture || data?.image || '',
          //     emailVerified: data.emailVerified !== undefined ? data.emailVerified : true,
          //     phoneVerified: data.phoneVerified !== undefined ? data.phoneVerified : true,
          //     ...data.user
          //   };
          // }
          
          // // console.log('🔑 Completing social login...');
          // const loginSuccess = await login(token, userData);
          
          if (loginSuccess) {
            // console.log('✅ Social login successful, redirecting to home...');
            // Direct redirect to home page
            window.location.href = '/';
          } else {
            throw new Error('Failed to complete login process');
          }
        } catch (error) {
          console.error('❌ OAuth callback error:', error);
          setError('Failed to complete social login. Please try again.');
          
          // Redirect to login page after error
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } finally {
          setIsProcessing(false);
        }
      } else if (status === 'unauthenticated') {
        // No valid session, redirect to login
        // console.log('❌ No valid OAuth session, redirecting to login');
        router.push('/login');
      }
    };

    handleOAuthCallback();
  }, [session, status, isAuthenticated, isProcessing, login, router]);

  // Show loading state
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
              {isProcessing 
                ? 'Processing your social login...' 
                : 'Preparing your account...'
              }
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