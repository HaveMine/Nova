import { useState } from 'react';
import { Factory, Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';
import { Page } from '../App';

type AuthPageProps = {
  page: Page;
  onNavigate: (page: Page) => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, companyName: string, password: string) => void;
};

export function AuthPage({ page, onNavigate, onLogin, onRegister }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 'login') {
      onLogin(email, password);
    } else if (page === 'register') {
      onRegister(name, email, companyName, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Factory className="text-cyan-400" size={40} />
            <span className="text-white">AutoUMKM</span>
          </div>
          <p className="text-gray-400">
            {page === 'login' && 'Selamat datang kembali'}
            {page === 'register' && 'Mulai digitalisasi UMKM Anda'}
            {page === 'forgot-password' && 'Reset password Anda'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <h2 className="text-white mb-6 text-center">
            {page === 'login' && 'Masuk ke Akun'}
            {page === 'register' && 'Daftar Gratis'}
            {page === 'forgot-password' && 'Lupa Password'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {page === 'register' && (
              <>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Nama Anda"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nama UMKM/Perusahaan</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Nama bisnis Anda"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {page !== 'forgot-password' && (
              <div>
                <label className="block text-gray-300 text-sm mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-11 pr-11 py-3 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 rounded"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {page === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-cyan-400 text-sm hover:text-cyan-300"
                >
                  Lupa password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              {page === 'login' && 'Masuk'}
              {page === 'register' && 'Daftar Sekarang'}
              {page === 'forgot-password' && 'Kirim Link Reset'}
            </button>
          </form>

          {page === 'forgot-password' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('login')}
                className="text-cyan-400 text-sm hover:text-cyan-300"
              >
                Kembali ke login
              </button>
            </div>
          )}

          {page === 'login' && (
            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">Belum punya akun? </span>
              <button
                onClick={() => onNavigate('register')}
                className="text-cyan-400 text-sm hover:text-cyan-300"
              >
                Daftar gratis
              </button>
            </div>
          )}

          {page === 'register' && (
            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">Sudah punya akun? </span>
              <button
                onClick={() => onNavigate('login')}
                className="text-cyan-400 text-sm hover:text-cyan-300"
              >
                Masuk
              </button>
            </div>
          )}
        </div>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-gray-400 text-sm hover:text-cyan-400"
          >
            ← Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  );
}
