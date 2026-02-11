
import React from 'react';
import { ProfilePageProps } from '../types';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, MessageCircle, ChevronDown } from 'lucide-react';

const ContactPage: React.FC<ProfilePageProps> = ({ lang }) => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">{lang === 'BN' ? 'যোগাযোগ করুন' : 'Get in Touch'}</h2>
        <p className="text-slate-500">{lang === 'BN' ? 'আপনার যেকোনো জিজ্ঞাসায় আমরা আছি আপনার পাশে।' : 'We are here for any of your queries.'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-emerald-600">
                  <MapPin size={20} />
               </div>
               <h5 className="font-bold text-slate-900 mb-2">{lang === 'BN' ? 'ঠিকানা' : 'Address'}</h5>
               <p className="text-slate-500 text-sm">{lang === 'BN' ? 'ডলার প্লাজা, মুজিব সড়ক, সিরাজগঞ্জ, বাংলাদেশ' : 'Dollar Plaza, Mujib Road, Sirajganj, Bangladesh'}</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-emerald-600">
                  <Phone size={20} />
               </div>
               <h5 className="font-bold text-slate-900 mb-2">{lang === 'BN' ? 'ফোন' : 'Phone'}</h5>
               <p className="text-slate-500 text-sm">+880 1700 000000</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-emerald-600">
                  <Mail size={20} />
               </div>
               <h5 className="font-bold text-slate-900 mb-2">{lang === 'BN' ? 'ইমেল' : 'Email'}</h5>
               <p className="text-slate-500 text-sm underline">info@agrotrustbd.com</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-emerald-600">
                  <Globe size={20} />
               </div>
               <h5 className="font-bold text-slate-900 mb-2">{lang === 'BN' ? 'ওয়েবসাইট' : 'Website'}</h5>
               <p className="text-slate-500 text-sm underline">www.agrotrustbd.com</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
             <a href="#" className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook size={24} /></a>
             <a href="#" className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"><Instagram size={24} /></a>
             <a href="#" className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all"><Twitter size={24} /></a>
             <a href="#" className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><MessageCircle size={24} /></a>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-inner">
           <h4 className="text-xl font-bold text-slate-900 mb-6">{lang === 'BN' ? 'সরাসরি মেসেজ করুন' : 'Send Message'}</h4>
           <div className="space-y-4">
             <input type="text" placeholder={lang === 'BN' ? 'আপনার নাম' : 'Your Name'} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50/50" />
             <input type="email" placeholder={lang === 'BN' ? 'আপনার ইমেল' : 'Your Email'} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50/50" />
             
             {/* Inquiry Type Dropdown */}
             <div className="relative group">
               <select 
                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 appearance-none cursor-pointer text-slate-600 font-medium"
                 defaultValue=""
               >
                 <option value="" disabled>{lang === 'BN' ? 'জিজ্ঞাসার ধরন নির্বাচন করুন' : 'Select Inquiry Type'}</option>
                 <option value="investment">{lang === 'BN' ? 'বিনিয়োগ সংক্রান্ত (Investment)' : 'Investment'}</option>
                 <option value="support">{lang === 'BN' ? 'সহায়তা (Support)' : 'Support'}</option>
                 <option value="general">{lang === 'BN' ? 'সাধারণ জিজ্ঞাসা (General)' : 'General'}</option>
               </select>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
                 <ChevronDown size={18} />
               </div>
             </div>

             <textarea placeholder={lang === 'BN' ? 'আপনার মেসেজ' : 'Your Message'} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50/50" />
             
             <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 active:scale-[0.98]">
               {lang === 'BN' ? 'মেসেজ পাঠান' : 'Send Message'}
             </button>
           </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden h-40 bg-slate-200 relative grayscale hover:grayscale-0 transition-all duration-500">
         <img src="https://picsum.photos/seed/map/1000/300" className="w-full h-full object-cover" alt="Map Placeholder" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-6 py-2 rounded-full shadow-lg font-bold text-slate-800 border border-slate-100">Dollar Plaza, Sirajganj</div>
         </div>
      </div>
    </div>
  );
};

export default ContactPage;
