
import React from 'react';
import { ProfilePageProps } from '../types';
import { ShieldAlert, Scale, Video, FileBarChart } from 'lucide-react';

const GovernancePage: React.FC<ProfilePageProps> = ({ lang }) => {
  const points = [
    { 
      icon: <ShieldAlert className="text-emerald-600" />, 
      title: lang === 'BN' ? 'রেজিস্ট্রেশন' : 'Registration', 
      desc: lang === 'BN' ? 'স্থানীয় ব্যবসায়িক লাইসেন্স (Trade License) এবং প্রয়োজনীয় আইনি অনুমোদন।' : 'Local trade license and necessary legal approvals.' 
    },
    { 
      icon: <Scale className="text-emerald-600" />, 
      title: lang === 'BN' ? 'শরিয়াহ কমপ্লায়েন্স' : 'Shariah Compliance', 
      desc: lang === 'BN' ? 'শরিয়াহ পরামর্শক প্যানেল দ্বারা প্রতিটি ব্যবসায়িক লেনদেন পর্যালোচিত।' : 'Every business transaction reviewed by a Shariah advisory panel.' 
    },
    { 
      icon: <Video className="text-emerald-600" />, 
      title: lang === 'BN' ? 'লাইভ আপডেট' : 'Live Updates', 
      desc: lang === 'BN' ? 'বিনিয়োগকারীদের জন্য নিয়মিত লাইভ ভিডিও ও মাঠ পর্যায়ের ছবি প্রদান।' : 'Regular live videos and field-level photos provided to investors.' 
    },
    { 
      icon: <FileBarChart className="text-emerald-600" />, 
      title: lang === 'BN' ? 'অডিট ও রিপোর্ট' : 'Audit & Reporting', 
      desc: lang === 'BN' ? 'স্বচ্ছ হিসাবরক্ষণ এবং বার্ষিক অডিট রিপোর্ট নিশ্চিত করা হয়।' : 'Transparent accounting and annual audit reports are ensured.' 
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900">{lang === 'BN' ? 'প্রশাসন ও কমপ্লায়েন্স' : 'Governance & Compliance'}</h2>
        <p className="text-slate-500">{lang === 'BN' ? 'আমাদের প্রতিটি পদক্ষেপ স্বচ্ছ এবং নির্ভরযোগ্য।' : 'Every step of ours is transparent and reliable.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {points.map((point, i) => (
          <div key={i} className="flex gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
               {point.icon}
            </div>
            <div className="space-y-2">
               <h4 className="text-xl font-bold text-slate-900">{point.title}</h4>
               <p className="text-slate-600 leading-relaxed">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-600 text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <h4 className="text-xl font-bold">{lang === 'BN' ? 'শতভাগ হালাল পদ্ধতিতে ব্যবসায়িক পরিচালনা' : '100% Halal Business Operations'}</h4>
          <p className="text-emerald-100">{lang === 'BN' ? 'ইসলামী শরিয়াহর সকল নিয়ম অনুসরণ করা হয়।' : 'All rules of Islamic Shariah are strictly followed.'}</p>
        </div>
        <div className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-full">
           Shariah Certified
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;
