
import React from 'react';
import { ProfilePageProps } from '../types';
import Logo from '../components/Logo';
import { TrendingUp, Users, Sprout, ShieldCheck, CheckCircle } from 'lucide-react';

const CoverPage: React.FC<ProfilePageProps> = ({ lang }) => {
  const stats = [
    { 
      label: lang === 'BN' ? 'সক্রিয় বিনিয়োগকারী' : 'Active Investors', 
      value: '১২৫০+', 
      icon: <Users size={20} className="text-emerald-500" />,
      bg: 'bg-emerald-50'
    },
    { 
      label: lang === 'BN' ? 'পরিচালিত মূলধন' : 'Managed Capital', 
      value: '২.৫ কোটি+', 
      icon: <TrendingUp size={20} className="text-blue-500" />,
      bg: 'bg-blue-50'
    },
    { 
      label: lang === 'BN' ? 'মোট প্রকল্প' : 'Total Projects', 
      value: '১৫+', 
      icon: <Sprout size={20} className="text-amber-500" />,
      bg: 'bg-amber-50'
    },
    { 
      label: lang === 'BN' ? 'শরিয়াহ স্কোর' : 'Shariah Score', 
      value: '১০০%', 
      icon: <ShieldCheck size={20} className="text-purple-500" />,
      bg: 'bg-purple-50'
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Hero Banner */}
      <div className="relative bg-[#022c22] rounded-[2.5rem] overflow-hidden p-8 md:p-14 text-white shadow-xl border-2 border-emerald-900">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 transform skew-x-12 translate-x-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-emerald-400">
                {lang === 'BN' ? 'অফিসিয়াল পোর্টাল' : 'Official Portal'}
              </span>
              <span className="px-4 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
                <CheckCircle size={10} />
                {lang === 'BN' ? 'শরিয়াহসম্মত' : 'Shariah Compliant'}
              </span>
            </div>
            
            <div className="space-y-3">
               <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                 AgroTrust <br />
                 <span className="text-emerald-400">Holdings Ltd.</span>
               </h1>
               <p className="text-lg md:text-2xl font-medium text-emerald-100/70 italic leading-relaxed font-serif pt-2">
                 {lang === 'BN' ? '“Growing Trust, Growing Value”' : '“Growing Trust, Growing Value”'}
               </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
                {lang === 'BN' ? 'বিনিয়োগ শুরু করুন' : 'Start Investing'}
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                {lang === 'BN' ? 'বিস্তারিত দেখুন' : 'Learn More'}
              </button>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center">
            {/* Logo Container Refined: Reduced size and switched to light variant on dark background */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl flex items-center justify-center border border-white/10 group hover:bg-white/10 transition-all duration-500">
               <Logo className="w-20 md:w-24 group-hover:scale-105 transition-transform duration-500" variant="light" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-[1.25rem] border border-slate-100 ${stat.bg} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
             <div className="flex items-center gap-3 mb-3">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                 {stat.icon}
               </div>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
             </div>
             <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Field Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{lang === 'BN' ? 'প্রকল্পের বাস্তব চিত্র' : 'Field Activity Feed'}</h3>
            <button className="text-xs font-bold text-emerald-600 hover:underline">View All Gallery</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="group overflow-hidden rounded-[2rem] h-56 relative shadow-md">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&h=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Activity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Cattle Farm</span>
                </div>
             </div>
             <div className="group overflow-hidden rounded-[2rem] h-56 relative shadow-md">
                <img src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=400&h=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Activity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Fish Pond</span>
                </div>
             </div>
             <div className="group overflow-hidden rounded-[2rem] h-56 relative shadow-md">
                <img src="https://images.unsplash.com/photo-1592919016327-5130ed8b47ed?q=80&w=400&h=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Activity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Vegetable Field</span>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] flex flex-col justify-center space-y-6 shadow-inner">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
            <ShieldCheck className="text-emerald-600" size={28} />
          </div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{lang === 'BN' ? 'নিরাপদ বিনিয়োগ' : 'Secure Investment'}</h4>
          <p className="text-slate-600 text-sm font-medium leading-relaxed">
            {lang === 'BN' ? 'আপনার বিনিয়োগের প্রতিটি ধাপ স্বচ্ছ এবং শরিয়াহ অনুমোদিত।' : 'Every step of your investment is transparent and Shariah-compliant.'}
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs font-black text-slate-700 bg-white/60 p-3 rounded-xl">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               {lang === 'BN' ? 'লাইভ প্রকল্প আপডেট' : 'Live Project Updates'}
            </div>
            <div className="flex items-center gap-3 text-xs font-black text-slate-700 bg-white/60 p-3 rounded-xl">
               <div className="w-2 h-2 rounded-full bg-amber-500"></div>
               {lang === 'BN' ? 'শরিয়াহ অডিট রিপোর্ট' : 'Shariah Audit Reports'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
