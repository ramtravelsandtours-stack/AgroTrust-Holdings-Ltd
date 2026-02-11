
import React from 'react';
import { ProfilePageProps } from '../types';
import { Target, Eye, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';

const VisionMissionPage: React.FC<ProfilePageProps> = ({ lang }) => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">{lang === 'BN' ? 'আমাদের দৃষ্টিভঙ্গি ও লক্ষ্য' : 'Our Vision & Mission'}</h2>
        <p className="text-slate-500">{lang === 'BN' ? 'একটি টেকসই এবং হালাল কৃষি অর্থনীতি গড়ার লক্ষে আমরা প্রতিশ্রুতিবদ্ধ।' : 'We are committed to building a sustainable and halal agricultural economy.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="bg-emerald-900 text-white p-10 rounded-3xl relative overflow-hidden group">
          <Eye size={120} className="absolute -right-10 -bottom-10 text-white/10 group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
               <Eye size={24} />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wider">{lang === 'BN' ? 'ভিশন' : 'Vision'}</h3>
          </div>
          <p className="text-xl leading-relaxed font-medium">
            {lang === 'BN' 
              ? 'বাংলাদেশে কৃষি বিনিয়োগে বিশ্বস্ততা ও হালাল লাভ নিশ্চিত করা।' 
              : 'To establish trust and ensure halal profit in agricultural investment in Bangladesh.'}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-slate-100 p-10 rounded-3xl relative overflow-hidden group">
          <Target size={120} className="absolute -right-10 -bottom-10 text-slate-200 group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
               <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">{lang === 'BN' ? 'মিশন' : 'Mission'}</h3>
          </div>
          <ul className="space-y-6 relative z-10">
            {[
              { 
                bn: 'হালাল এবং স্বচ্ছ বিনিয়োগ সুযোগ তৈরি করা।', 
                en: 'Provide halal and transparent investment opportunities.',
                icon: <Handshake className="text-emerald-600" size={24} />
              },
              { 
                bn: 'কৃষিপণ্য উৎপাদন ও বিপণন উন্নত করা।', 
                en: 'Enhance agricultural production and marketing.',
                icon: <TrendingUp className="text-emerald-600" size={24} />
              },
              { 
                bn: 'বিনিয়োগকারীদের নিয়মিত মুনাফা প্রদান নিশ্চিত করা।', 
                en: 'Ensure regular profit distribution to investors.',
                icon: <ShieldCheck className="text-emerald-600" size={24} />
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="mt-1">{item.icon}</div>
                <p className="text-slate-700 font-medium">{lang === 'BN' ? item.bn : item.en}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionPage;
