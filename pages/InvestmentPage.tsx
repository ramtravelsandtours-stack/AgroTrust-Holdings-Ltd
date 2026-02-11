
import React, { useState } from 'react';
import { ProfilePageProps } from '../types';
import { BadgeDollarSign, Wallet, CalendarClock, Gift, CheckCircle2, TrendingUp, ArrowRight, CheckCircle, Rocket } from 'lucide-react';
import PurchaseModal from '../components/PurchaseModal';

const InvestmentPage: React.FC<ProfilePageProps> = ({ lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const details = [
    { 
      icon: <BadgeDollarSign className="text-emerald-500" />, 
      label: lang === 'BN' ? 'প্রতি শেয়ারের মূল্য' : 'Price per share', 
      value: lang === 'BN' ? '১০,০০০ টাকা' : 'BDT 10,000' 
    },
    { 
      icon: <Wallet className="text-amber-500" />, 
      label: lang === 'BN' ? 'ন্যূনতম বিনিয়োগ' : 'Minimum investment', 
      value: lang === 'BN' ? '১০,০০০ টাকা (১ শেয়ার)' : 'BDT 10,000 (1 share)' 
    },
    { 
      icon: <CalendarClock className="text-blue-500" />, 
      label: lang === 'BN' ? 'মুনাফা বণ্টন' : 'Profit distribution', 
      value: lang === 'BN' ? '৩ মাস অন্তর (Quarterly)' : 'Quarterly' 
    },
  ];

  const profitProjection = {
    min: 800,
    max: 1800,
    label_bn: 'সম্ভাব্য ৩ মাসের মুনাফা (প্রতি শেয়ার)',
    label_en: 'Expected 3-Month Profit (Per Share)'
  };

  const benefits = [
    { bn: 'ডিজিটাল শেয়ার সার্টিফিকেট', en: 'Digital share certificate' },
    { bn: 'ইউনিক শেয়ার আইডি', en: 'Unique share ID' },
    { bn: 'রিপোর্ট ও ভিডিও আপডেট', en: 'Regular reports & video updates' },
    { bn: 'ফার্ম ভিজিট করার সুযোগ', en: 'Farm visit opportunities' },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 mb-2">
           <CheckCircle size={12} />
           {lang === 'BN' ? 'শরিয়াহসম্মত বিনিয়োগ' : 'Shariah Compliant Investment'}
        </div>
        <h2 className="text-4xl font-bold text-slate-900">{lang === 'BN' ? 'শেয়ার ও বিনিয়োগ বিবরণ' : 'Share & Investment Details'}</h2>
        <p className="text-slate-500">{lang === 'BN' ? 'সহজ বিনিয়োগ, নিরাপদ ভবিষ্যৎ।' : 'Simple investment, secure future.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {details.map((detail, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-emerald-500">
             <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
                {detail.icon}
             </div>
             <p className="text-slate-500 font-medium mb-1 uppercase text-xs tracking-widest">{detail.label}</p>
             <h4 className="text-2xl font-bold text-slate-900">{detail.value}</h4>
          </div>
        ))}
      </div>

      {/* Profit Projection Card */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <TrendingUp size={32} />
          </div>
          <div>
            <h4 className="text-slate-500 font-medium uppercase text-xs tracking-widest">
              {lang === 'BN' ? profitProjection.label_bn : profitProjection.label_en}
            </h4>
            <p className="text-3xl font-extrabold text-emerald-700">
              {lang === 'BN' ? `${profitProjection.min} - ${profitProjection.max} টাকা` : `BDT ${profitProjection.min} - ${profitProjection.max}`}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 transform hover:-translate-y-1"
        >
          <span>{lang === 'BN' ? 'এখনই শেয়ার কিনুন' : 'Buy Share Now'}</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/3 text-center md:text-left space-y-4">
           <div className="inline-flex p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl mb-2">
              <Gift size={40} />
           </div>
           <h3 className="text-3xl font-bold leading-tight">
             {lang === 'BN' ? 'শেয়ার হোল্ডারদের জন্য বিশেষ সুবিধা' : 'Special Shareholder Benefits'}
           </h3>
        </div>
        
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
           {benefits.map((benefit, i) => (
             <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={24} />
                <p className="font-medium">{lang === 'BN' ? benefit.bn : benefit.en}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Final Call to Action Section */}
      <div className="bg-emerald-950 rounded-[2.5rem] p-10 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl border-2 border-emerald-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
           <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-inner">
             <Rocket size={40} className="text-emerald-400 animate-bounce" />
           </div>
           <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
             {lang === 'BN' ? 'আপনার হালাল উপার্জনের যাত্রা শুরু হোক আজই!' : 'Start Your Halal Income Journey Today!'}
           </h3>
           <p className="text-emerald-100/60 text-lg md:text-xl font-medium leading-relaxed">
             {lang === 'BN' 
               ? 'অ্যাগ্রোট্রাস্টের সাথে বিনিয়োগ করে নিশ্চিত করুন একটি নিরাপদ এবং সমৃদ্ধ ভবিষ্যৎ।' 
               : 'Join thousands of satisfied investors and grow your wealth with Shariah compliance.'}
           </p>
           <div className="pt-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-12 py-6 bg-emerald-500 text-white font-black text-xl uppercase tracking-widest rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 mx-auto"
              >
                {lang === 'BN' ? 'শেয়ার কিনুন' : 'Invest Now'}
                <ArrowRight size={24} />
              </button>
           </div>
        </div>
      </div>
      
      {/* Subtly styled bilingual disclaimer */}
      <div className="text-center pt-8 border-t border-slate-100">
         <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed">
           বিনিয়োগের পূর্বে আমাদের শর্তাবলী ভালো করে পড়ে নিন।<br />
           Please read our terms and conditions before investing.
         </p>
      </div>

      <PurchaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lang={lang} 
      />
    </div>
  );
};

export default InvestmentPage;
