
import React from 'react';
import { ProfilePageProps } from '../types';
import { Sprout, Milk, Beef, Fish, ShoppingBag, Layers, TrendingUp } from 'lucide-react';

const BusinessModelPage: React.FC<ProfilePageProps> = ({ lang }) => {
  const sectors = [
    { bn: 'মৌসুমি সবজি ও ফসল চাষ', en: 'Seasonal Vegetables & Crops', icon: <Sprout size={28} /> },
    { bn: 'গরু মোটাতাজাকরণ', en: 'Cattle Fattening', icon: <Beef size={28} /> },
    { bn: 'পোলট্রি ও ডেইরি ফার্ম', en: 'Poultry & Dairy Farm', icon: <Milk size={28} /> },
    { bn: 'মাছ চাষ ও মৎস্য প্রকল্প', en: 'Fish Farming & Fisheries', icon: <Fish size={28} /> },
    { bn: 'কৃষিপণ্য সংগ্রহ ও বিপণন', en: 'Agro-product Collection & Marketing', icon: <ShoppingBag size={28} /> },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-end">
        <div className="space-y-2">
          <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">{lang === 'BN' ? 'কিভাবে আমরা কাজ করি' : 'How it works'}</span>
          <h2 className="text-4xl font-bold text-slate-900">{lang === 'BN' ? 'ব্যবসার কাঠামো' : 'Business Model'}</h2>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold">Mudaraba</div>
           <div className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold">Musharakah</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex gap-5">
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shrink-0">
               <Layers size={24} />
            </div>
            <div className="space-y-2">
               <h4 className="text-lg font-bold text-slate-900">{lang === 'BN' ? 'মূলধন সংগ্রহ' : 'Capital Raising'}</h4>
               <p className="text-slate-600">{lang === 'BN' ? 'ডিজিটাল শেয়ার বিক্রয় (Unit/Share Certificate)' : 'Digital share issuance (Unit/Share Certificate)'}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-5">
            <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white shrink-0">
               <TrendingUp size={24} />
            </div>
            <div className="space-y-2">
               <h4 className="text-lg font-bold text-slate-900">{lang === 'BN' ? 'লাভ বণ্টন' : 'Profit Sharing'}</h4>
               <p className="text-slate-600">{lang === 'BN' ? 'Mudaraba / Musharakah ভিত্তিক; প্রকৃত লাভের উপর ভাগ' : 'Mudaraba / Musharakah-based; profit distributed on actual earnings'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectors.map((sector, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 bg-slate-50 text-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {sector.icon}
              </div>
              <p className="text-sm font-bold text-slate-800">{lang === 'BN' ? sector.bn : sector.en}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-3xl overflow-hidden h-48 relative">
        <img src="https://picsum.photos/seed/agri-wide/1200/400" className="w-full h-full object-cover" alt="Agro Business" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-8">
           <p className="text-white text-xl font-medium max-w-lg">
             {lang === 'BN' ? 'প্রান্তিক চাষীদের ক্ষমতায়ন ও নিরাপদ খাদ্যের প্রতিশ্রুতি।' : 'Promising food safety and empowering marginal farmers.'}
           </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelPage;
