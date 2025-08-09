'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle, User, Zap, FileText } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';
import Link from 'next/link';

const LoginCard = ({ className = '' }: { className?: string }) => {
  const router = useRouter();
  const { login, isLoading, clearError } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success('Welcome back!', {
        description: 'You have been logged in successfully.',
        duration: 3000
      });
      router.push("/dashboard");
    } else {
      toast.error('Login Failed', {
        description: result.error || 'Invalid email or password',
        duration: 5000
      });
    }
  };

  return (
    <div className={`w-full max-w-md p-6 rounded-2xl ${className}`}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm">Sign in to continue to QueryDocs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link href="#" className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" color="white" className="mr-2" />
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 text-xs">or</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-sm"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="#000" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
          </svg>
          Continue with GitHub
        </button>
      </div>

      {/* Sign up Link */}
      <p className="text-center text-xs text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default function QueryDocsLogin() {
  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center relative px-6 py-8">
        {/* Back to Home Button */}
        <div className="absolute top-6 left-6 animate-fade-in-left">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
          
        {/* Login Card */}
        <div className="animate-fade-in-up w-full max-w-lg" style={{ animationDelay: '0.2s' }}>
          <LoginCard className="shadow-2xl border-0 bg-white/90 backdrop-blur-md px-8 py-10 max-w-xl" />
        </div>
      </div>

      {/* Right Side - Enhanced Illustration */}
      <div className="w-1/2 h-screen overflow-hidden hidden md:flex flex-col relative animate-fade-in-right bg-gradient-to-br from-blue-600/10 via-blue-500/15 to-purple-600/10" style={{ animationDelay: '0.3s' }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Document Icons */}
          <div className="absolute top-20 right-20 w-48 h-28 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl animate-float border border-blue-200/50" style={{ animationDelay: '0s' }}>
            <div className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="w-20 h-2.5 bg-gray-300 rounded-full mb-2"></div>
                <div className="w-14 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* AI Chat Bubble */}
          <div className="absolute top-1/3 left-16 transform -translate-y-1/2">
            <div className="relative">
              <div className="w-32 h-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200/50 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="p-4 space-y-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mb-2 shadow-md"></div>
                  <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-1/2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Checkmarks */}
          <div className="absolute bottom-32 right-24 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse shadow-lg" style={{ animationDelay: '2s' }}>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>

          {/* Floating Search Element */}
          <div className="absolute bottom-20 left-20 w-56 h-16 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl animate-float border border-blue-200/50" style={{ animationDelay: '1.5s' }}>
            <div className="p-3 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="w-full h-2.5 bg-gray-200 rounded-full mb-1"></div>
                <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Additional floating elements */}
          <div className="absolute top-1/2 right-8 w-12 h-12 bg-purple-500/20 rounded-full animate-float shadow-lg" style={{ animationDelay: '3s' }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            </div>
          </div>

          {/* Connecting Lines Animation */}
          <svg className="absolute inset-0 w-full h-full opacity-30" style={{ animationDelay: '2.5s' }}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <path
              d="M100,100 Q200,50 300,100 T500,100"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Main Content - Centered */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-12">
          <div className="animate-fade-in-up max-w-md" style={{ animationDelay: '0.5s' }}>
            {/* Welcome Message */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome Back!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sign in to access your AI-powered document library
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3 animate-fade-in-right" style={{ animationDelay: '0.8s' }}>
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Quick Access</h3>
                  <p className="text-xs text-gray-600">Jump right back into your documents</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 animate-fade-in-right" style={{ animationDelay: '0.9s' }}>
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Smart Search</h3>
                  <p className="text-xs text-gray-600">Find answers instantly with AI</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 animate-fade-in-right" style={{ animationDelay: '1.0s' }}>
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Secure & Private</h3>
                  <p className="text-xs text-gray-600">Your data stays protected</p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <p className="text-xs text-gray-500 mb-2">Trusted by thousands of users</p>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm animate-pulse"
                    style={{ animationDelay: `${1.3 + i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(2deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
