import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, User, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { register, getMyDetails, login } from '../services/auth';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'register') {
      console.log('Registering with:', { name, email });
      handleRegister();
    } else {
      console.log('Logging in with:', { email });
      handleLogin();
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      console.log('Attempting registration with:', { name, email });

      await register(name, email, password);

      toast.success('Success..!');

      console.log('Registration successful. Navigating to products page.');

      navigate('/products');

      console.log('Navigation complete. Current path:', window.location.pathname);

    } catch (error: any) {
      console.error('Registration error:', error);

      console.log("Status: ", error.response?.status);
      console.log("Data: ", error.response?.data);

      toast.error(error.response?.data?.message || 'Registration failed.');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      console.log('Attempting login with:', { email, password });

      const data = await login(email, password);

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);

      const res = await getMyDetails();

      console.log("ME RESPONSE: ", res);
      
      const userData = res.data;

      console.log("UserData: ", userData);

      setUser(userData);

      const role = userData?.roles || [];

      toast.success('Login successful!');

      console.log('User roles:', role);

      if (role?.includes("ADMIN")) {
        navigate("/admin", { replace: true });
        // window.location.reload();
      } else {
        navigate("/products", { replace: true });
        // window.location.reload();
      }

      console.log('Navigation complete. Current path:', window.location.pathname);

    } catch (error: any) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message);
    }
  }

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Luxury Banner */}
        <div className="bg-charcoal-900 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.2)_0,transparent_70%)]" />
          <Sparkles className="w-8 h-8 text-gold-300 mx-auto mb-3.5 animate-pulse" />
          <h2 className="font-serif text-2xl font-bold tracking-widest uppercase">AURA LOUNGE</h2>
          <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] mt-1">Unlock haute-couture membership</p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-neutral-100 bg-neutral-50/50">
          <button
            onClick={() => {
              setActiveTab('login');
            }}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'login'
                ? 'border-charcoal-900 text-charcoal-900 bg-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
            }}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === 'register'
                ? 'border-charcoal-900 text-charcoal-900 bg-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === 'register' && (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-neutral-200 focus:border-charcoal-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-charcoal-900 text-neutral-800 bg-neutral-50/50 focus:bg-white transition-all"
                  />
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-neutral-200 focus:border-charcoal-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-charcoal-900 text-neutral-800 bg-neutral-50/50 focus:bg-white transition-all"
                />
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Password</label>
                <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Demo mode (No password req.)</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 border border-neutral-200 rounded-lg text-xs font-semibold focus:outline-none bg-neutral-50/20 text-neutral-400"
                />
                <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 border border-neutral-200 rounded-lg text-xs font-semibold focus:outline-none bg-neutral-50/20 text-neutral-400"
                  />
                  <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-6 cursor-pointer"
            >
              {activeTab === 'login' ? 'Login to Club' : 'Generate Membership'}
            </button>
          </form>

          {/* Bottom security assurance */}
          <div className="flex justify-center items-center gap-1.5 text-[9px] text-neutral-400 font-mono uppercase tracking-widest mt-8">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Secured Sandbox</span>
          </div>
        </div>

      </div>
    </div>
  );
};
