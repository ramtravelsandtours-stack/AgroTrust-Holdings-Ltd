
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import CoverPage from './pages/CoverPage';
import OverviewPage from './pages/OverviewPage';
import VisionMissionPage from './pages/VisionMissionPage';
import BusinessModelPage from './pages/BusinessModelPage';
import InvestmentPage from './pages/InvestmentPage';
import GovernancePage from './pages/GovernancePage';
import ContactPage from './pages/ContactPage';
import VerificationPage from './pages/VerificationPage';
import Logo from './components/Logo';
import { 
  Languages, Menu, X, ChevronRight, Facebook, Instagram, Twitter, MessageCircle
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [lang, setLang] = useState<Language>('BN');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = [
    { component: CoverPage, title: { bn: "হোম", en: "Home" } },
    { component: OverviewPage, title: { bn: "পরিচিতি", en: "About Us" } },
    { component: VisionMissionPage, title: { bn: "ভিশন ও মিশন", en: "Vision" } },
    { component: BusinessModelPage, title: { bn: "ব্যবসার কাঠামো", en: "Model" } },
    { component: InvestmentPage, title: { bn: "বিনিয়োগ", en: "Investment" } },
    { component: GovernancePage, title: { bn: "কমপ্লায়েন্স", en: "Compliance" } },
    { component: VerificationPage, title: { bn: "যাচাইকরণ", en: "Verify" } },
    { component: ContactPage, title: { bn: "যোগাযোগ", en: "Contact" } },
  ];

  const ActivePage = pages[activeTab].component;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Inter']">
      {/* Top Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(0)}>
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100">
               <Logo className="w-12" />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === idx 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-800 hover:bg-white/20'
                } font-['Hind_Siliguri']`}
              >
                {lang === 'BN' ? page.title.bn : page.title.en}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'BN' ? 'EN' : 'BN')}
              className={`p-2 rounded-xl transition-colors flex items-center gap-2 border ${
                scrolled ? 'border-slate-200 text-slate-600' : 'border-white/30 text-slate-800'
              } hover:bg-emerald-50`}
            >
              <Languages size={18} />
              <span className="text-[10px] font-black uppercase">{lang === 'BN' ? 'EN' : 'BN'}</span>
            </button>
            
            <button 
              className="lg:hidden p-2 text-slate-800"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <button 
              onClick={() => setActiveTab(4)}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-400/20 hover:bg-emerald-700 hover:shadow-emerald-400/40 transition-all active:scale-95"
            >
              {lang === 'BN' ? 'শেয়ার কিনুন' : 'Buy Share'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-emerald-950/95 backdrop-blur-xl transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <Logo className="w-16" variant="light" />
            <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-white/10 rounded-full text-white">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-center">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx);
                  setIsMenuOpen(false);
                }}
                className={`text-2xl font-black py-2 transition-colors ${
                  activeTab === idx ? 'text-emerald-400' : 'text-white'
                } font-['Hind_Siliguri']`}
              >
                {lang === 'BN' ? page.title.bn : page.title.en}
              </button>
            ))}
          </nav>
          <div className="mt-auto pb-10 flex flex-col items-center gap-6">
             <button 
                onClick={() => setActiveTab(4)}
                className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl uppercase tracking-tighter shadow-xl shadow-emerald-500/20"
              >
                {lang === 'BN' ? 'বিনিয়োগ শুরু করুন' : 'Start Investing'}
              </button>
              <div className="flex gap-6 text-emerald-200/50">
                <Facebook size={24} />
                <Instagram size={24} />
                <Twitter size={24} />
              </div>
          </div>
        </div>
      </div>

      {/* Hero / Main Content */}
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/50 overflow-hidden min-h-[70vh]">
             <div className="p-4 md:p-12">
               <ActivePage lang={lang} />
             </div>
           </div>
        </div>
      </main>

      {/* Website Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
             <div className="flex items-start">
               <Logo className="w-24 -ml-2" variant="light" />
             </div>
             <p className="text-slate-400 max-w-md text-sm leading-relaxed font-medium">
               {lang === 'BN' 
                 ? 'AgroTrust Holdings Ltd. বাংলাদেশের কৃষি খাতে শরিয়াহসম্মত বিনিয়োগের একটি নির্ভরযোগ্য প্ল্যাটফর্ম। আমরা বিশ্বাস করি হালাল বিনিয়োগেই প্রকৃত সমৃদ্ধি।'
                 : 'AgroTrust Holdings Ltd. is a reliable platform for Shariah-compliant agricultural investment in Bangladesh. We believe true prosperity lies in halal investment.'}
             </p>
             <div className="flex gap-4">
                <a href="#" className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300"><Facebook size={20} /></a>
                <a href="#" className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300"><Instagram size={20} /></a>
                <a href="#" className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300"><MessageCircle size={20} /></a>
             </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">{lang === 'BN' ? 'দ্রুত লিঙ্ক' : 'Navigation'}</h4>
            <ul className="space-y-4 text-slate-300 text-sm font-semibold">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setActiveTab(1)}>
                <ChevronRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                {lang === 'BN' ? 'আমাদের সম্পর্কে' : 'About Us'}
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setActiveTab(4)}>
                <ChevronRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                {lang === 'BN' ? 'বিনিয়োগ পদ্ধতি' : 'Investment'}
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setActiveTab(6)}>
                <ChevronRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                {lang === 'BN' ? 'সার্টিফিকেট যাচাই' : 'Verify Certificate'}
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setActiveTab(7)}>
                <ChevronRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                {lang === 'BN' ? 'যোগাযোগ' : 'Support'}
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">{lang === 'BN' ? 'অফিস' : 'Contact'}</h4>
            <div className="space-y-6 text-slate-300 text-sm">
               <div className="flex items-start gap-3">
                 <div className="mt-1 p-1 bg-white/5 rounded-lg"><ChevronRight size={12} className="text-emerald-500" /></div>
                 <p className="leading-relaxed">{lang === 'BN' ? 'ডলার প্লাজা, সিরাজগঞ্জ' : 'Dollar Plaza, Mujib Road, Sirajganj'}</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1 p-1 bg-white/5 rounded-lg"><ChevronRight size={12} className="text-emerald-500" /></div>
                 <p>+880 1700 000000</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1 p-1 bg-white/5 rounded-lg"><ChevronRight size={12} className="text-emerald-500" /></div>
                 <p className="text-emerald-400">info@agrotrustbd.com</p>
               </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 uppercase font-black tracking-widest">
           <p>© {new Date().getFullYear()} AgroTrust Holdings Ltd. Crafted with Trust.</p>
           <div className="flex gap-8">
             <span className="hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</span>
             <span className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
