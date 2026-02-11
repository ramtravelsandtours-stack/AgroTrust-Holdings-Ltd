
import React from 'react';
import { ProfilePageProps } from '../types';

const OverviewPage: React.FC<ProfilePageProps> = ({ lang }) => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold tracking-wide uppercase">
            {lang === 'BN' ? 'পরিচিতি' : 'About Us'}
          </span>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight">
            {lang === 'BN' ? 'AgroTrust Holdings Ltd. কী?' : 'What is AgroTrust Holdings Ltd.?'}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {lang === 'BN' 
              ? 'AgroTrust Holdings Ltd. হলো একটি শরিয়াহসম্মত আগ্রো-ইনভেস্টমেন্ট কোম্পানি, যা অনলাইনে শেয়ার বিক্রির মাধ্যমে মূলধন সংগ্রহ করে বিভিন্ন কৃষিভিত্তিক ব্যবসা পরিচালনা করে।' 
              : 'AgroTrust Holdings Ltd. is a Shariah-compliant agro-investment company that raises capital through online share issuance to operate various agricultural businesses.'}
          </p>
          <p className="text-lg text-slate-800 font-semibold border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 rounded-r-lg">
            {lang === 'BN'
              ? 'আমাদের লক্ষ্য হলো ছোট এবং বড় বিনিয়োগকারীদের জন্য হালাল এবং লাভজনক সুযোগ তৈরি করা।'
              : 'Our goal is to provide halal and profitable investment opportunities for both small and large investors.'}
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img src="https://picsum.photos/seed/farm-ov/800/600" className="rounded-3xl shadow-2xl" alt="Overview" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg max-w-[200px] border border-emerald-100">
               <p className="text-emerald-600 font-bold text-3xl">100%</p>
               <p className="text-slate-500 text-sm font-medium">{lang === 'BN' ? 'শরিয়াহ সম্মত' : 'Shariah Compliant'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🌱', title: lang === 'BN' ? 'আধুনিক কৃষি' : 'Modern Agro', desc: lang === 'BN' ? 'সর্বাধুনিক কৃষি প্রযুক্তি ব্যবহার' : 'State-of-the-art tech' },
          { icon: '🤝', title: lang === 'BN' ? 'স্বচ্ছতা' : 'Transparency', desc: lang === 'BN' ? 'প্রতিটি বিনিয়োগের স্বচ্ছ হিসাব' : 'Audited financial reports' },
          { icon: '📈', title: lang === 'BN' ? 'লাভের ভাগ' : 'Profit Sharing', desc: lang === 'BN' ? 'বিনিয়োগকারীদের নিয়মিত মুনাফা' : 'Regular dividends' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewPage;
