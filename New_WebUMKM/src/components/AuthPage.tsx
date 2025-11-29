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
            <svg xmlns="http://www.w3.org/2000/svg" width="104" height="38" viewBox="0 0 104 38" fill="none">
<path d="M67.4304 11.4545V26H64.7741L58.446 16.8452H58.3395V26H55.2642V11.4545H57.9631L64.2415 20.6023H64.3693V11.4545H67.4304ZM74.8434 26.2131C73.7402 26.2131 72.7861 25.9787 71.9812 25.5099C71.181 25.0365 70.5631 24.3783 70.1275 23.5355C69.6919 22.688 69.4741 21.7055 69.4741 20.5881C69.4741 19.4612 69.6919 18.4763 70.1275 17.6335C70.5631 16.786 71.181 16.1278 71.9812 15.6591C72.7861 15.1856 73.7402 14.9489 74.8434 14.9489C75.9466 14.9489 76.8983 15.1856 77.6985 15.6591C78.5034 16.1278 79.1237 16.786 79.5593 17.6335C79.9949 18.4763 80.2127 19.4612 80.2127 20.5881C80.2127 21.7055 79.9949 22.688 79.5593 23.5355C79.1237 24.3783 78.5034 25.0365 77.6985 25.5099C76.8983 25.9787 75.9466 26.2131 74.8434 26.2131ZM74.8576 23.8693C75.3595 23.8693 75.7785 23.7273 76.1147 23.4432C76.4509 23.1544 76.7042 22.7614 76.8746 22.2642C77.0498 21.767 77.1374 21.2012 77.1374 20.5668C77.1374 19.9323 77.0498 19.3665 76.8746 18.8693C76.7042 18.3722 76.4509 17.9792 76.1147 17.6903C75.7785 17.4015 75.3595 17.2571 74.8576 17.2571C74.351 17.2571 73.9248 17.4015 73.5792 17.6903C73.2383 17.9792 72.9802 18.3722 72.805 18.8693C72.6346 19.3665 72.5494 19.9323 72.5494 20.5668C72.5494 21.2012 72.6346 21.767 72.805 22.2642C72.9802 22.7614 73.2383 23.1544 73.5792 23.4432C73.9248 23.7273 74.351 23.8693 74.8576 23.8693ZM91.9989 15.0909L88.185 26H84.7759L80.962 15.0909H84.158L86.4237 22.8963H86.5373L88.7958 15.0909H91.9989ZM96.3651 26.206C95.669 26.206 95.0488 26.0852 94.5043 25.8438C93.9598 25.5975 93.5289 25.2353 93.2116 24.7571C92.8991 24.2741 92.7429 23.6728 92.7429 22.9531C92.7429 22.3471 92.8542 21.8381 93.0767 21.4261C93.2992 21.0142 93.6023 20.6828 93.9858 20.4318C94.3693 20.1809 94.8049 19.9915 95.2926 19.8636C95.785 19.7358 96.3011 19.6458 96.8409 19.5938C97.4754 19.5275 97.9867 19.4659 98.375 19.4091C98.7633 19.3475 99.045 19.2576 99.2202 19.1392C99.3954 19.0208 99.483 18.8456 99.483 18.6136V18.571C99.483 18.1212 99.3409 17.7732 99.0568 17.527C98.7775 17.2808 98.3797 17.1577 97.8636 17.1577C97.3191 17.1577 96.8859 17.2784 96.5639 17.5199C96.242 17.7566 96.0289 18.0549 95.9247 18.4148L93.1264 18.1875C93.2685 17.5246 93.5478 16.9517 93.9645 16.4688C94.3812 15.9811 94.9186 15.607 95.5767 15.3466C96.2396 15.0814 97.0066 14.9489 97.8778 14.9489C98.4839 14.9489 99.0639 15.0199 99.6179 15.1619C100.177 15.304 100.671 15.5241 101.102 15.8224C101.538 16.1207 101.881 16.5043 102.132 16.973C102.383 17.437 102.509 17.9934 102.509 18.642V26H99.6392V24.4872H99.554C99.3788 24.8281 99.1444 25.1288 98.8509 25.3892C98.5573 25.6449 98.2045 25.8461 97.7926 25.9929C97.3807 26.1349 96.9048 26.206 96.3651 26.206ZM97.2315 24.1179C97.6766 24.1179 98.0696 24.0303 98.4105 23.8551C98.7514 23.6752 99.0189 23.4337 99.2131 23.1307C99.4072 22.8277 99.5043 22.4844 99.5043 22.1009V20.9432C99.4096 21.0047 99.2794 21.0616 99.1136 21.1136C98.9527 21.161 98.7704 21.206 98.5668 21.2486C98.3632 21.2865 98.1596 21.322 97.956 21.3551C97.7524 21.3835 97.5677 21.4096 97.402 21.4332C97.0469 21.4853 96.7367 21.5682 96.4716 21.6818C96.2064 21.7955 96.0005 21.9493 95.8537 22.1435C95.7069 22.3329 95.6335 22.5696 95.6335 22.8537C95.6335 23.2656 95.7827 23.5805 96.081 23.7983C96.384 24.0114 96.7675 24.1179 97.2315 24.1179Z" fill="#00BCD4"></path>
<rect width="14.1642" height="33.5443" rx="7.0821" transform="matrix(-0.869984 -0.49308 -0.49308 0.869984 48.5254 6.98407)" fill="url(#paint0_linear_1052_10)"></rect>
<rect width="14.1642" height="33.5443" rx="7.0821" transform="matrix(0.869984 0.49308 0.49308 -0.869984 0 31.0159)" fill="url(#paint1_linear_1052_10)"></rect>
<rect x="9.93469" y="7.60089" width="14.1642" height="33.5443" rx="7.0821" transform="rotate(-29.5432 9.93469 7.60089)" fill="#215C5C"></rect>
<defs>
<linearGradient id="paint0_linear_1052_10" x1="7.0821" y1="0" x2="7.0821" y2="33.5443" gradientUnits="userSpaceOnUse">
<stop stop-color="#215C5C" stop-opacity="0"></stop>
<stop offset="0.595" stop-color="#215C5C"></stop>
</linearGradient>
<linearGradient id="paint1_linear_1052_10" x1="7.0821" y1="0" x2="7.0821" y2="33.5443" gradientUnits="userSpaceOnUse">
<stop stop-color="#215C5C" stop-opacity="0"></stop>
<stop offset="1" stop-color="#215C5C"></stop>
</linearGradient>
</defs>
</svg>
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
