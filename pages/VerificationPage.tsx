
import React, { useState } from 'react';
import { ProfilePageProps } from '../types';
import { Search, ShieldCheck, AlertCircle, FileText, User, Calendar, Sprout, Hash, CheckCircle } from 'lucide-react';

const VerificationPage: React.FC<ProfilePageProps> = ({ lang }) => {
  const [searchId, setSearchId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = () => {
    if (!searchId) return;
    setIsVerifying(true);
    setResult(null);

    // Simulated robust look-up
    setTimeout(() => {
      setIsVerifying(false);
      const cleanedId = searchId.toUpperCase().trim();
      if (cleanedId.startsWith('ATX-')) {
        setResult({
          status: 'verified',
          id: cleanedId,
          investor: 'Md. Jamal Uddin',
          sector: lang === 'BN' ? 'গরু মোটাতাজাকরণ' : 'Cattle Fattening',
          shares: 5,
          date: '15 March, 2024',
          paymentStatus: 'Paid & Verified',
          agreementSigned: true
        });
      } else {
        setResult({ status: 'not_found' });
      }
    }, 1200);
  };

  return (
    <div className="space-y-12 max-w-2xl mx-auto py-8">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-emerald-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200 rotate-3 transform hover:rotate-0 transition-transform">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{lang === 'BN' ? 'সার্টিফিকেট যাচাইকরণ' : 'Certificate Verification'}</h2>
        <p className="text-slate-500 font-medium">{lang === 'BN' ? 'আপনার ইনভেস্টমেন্ট আইডি ব্যবহার করে প্রকল্পের সত্যতা যাচাই করুন।' : 'Verify the authenticity of your investment project using your Unique ID.'}</p>
      </div>

      <div className="bg-white p-2 rounded-3xl border-2 border-slate-100 shadow-xl flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input 
            type="text" 
            placeholder="e.g. ATX-X72K9A1" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
            className="w-full pl-14 pr-4 py-5 rounded-2xl bg-slate-50 focus:bg-white outline-none font-mono text-xl font-black shadow-inner transition-all uppercase tracking-widest"
          />
        </div>
        <button 
          onClick={handleVerify}
          disabled={isVerifying || !searchId}
          className={`px-10 py-5 rounded-2xl font-black text-lg transition-all ${
            isVerifying || !searchId ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 active:scale-95'
          }`}
        >
          {isVerifying ? (lang === 'BN' ? 'যাচাই হচ্ছে...' : 'Searching...') : (lang === 'BN' ? 'সার্চ করুন' : 'Verify ID')}
        </button>
      </div>

      {result && result.status === 'verified' && (
        <div className="bg-white border-4 border-emerald-500 rounded-[2.5rem] p-8 sm:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={200} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-emerald-600">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{lang === 'BN' ? 'বৈধ বিনিয়োগকারী' : 'Verified Investor'}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">AgroTrust Holdings Ltd.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-4">
             <DataField icon={<User size={20} />} label={lang === 'BN' ? 'বিনিয়োগকারীর নাম' : 'Investor Name'} value={result.investor} />
             <DataField icon={<Sprout size={20} />} label={lang === 'BN' ? 'প্রকল্পের খাত' : 'Agro Sector'} value={result.sector} />
             <DataField icon={<FileText size={20} />} label={lang === 'BN' ? 'মোট শেয়ার' : 'Total Shares'} value={`${result.shares} Units`} />
             <DataField icon={<Calendar size={20} />} label={lang === 'BN' ? 'সার্টিফিকেট ইস্যু' : 'Issue Date'} value={result.date} />
          </div>
          
          <div className="mt-10 pt-10 border-t-2 border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
             <div className="bg-slate-100 px-6 py-3 rounded-2xl text-slate-900 font-mono font-black text-lg shadow-inner">
               ID: {result.id}
             </div>
             <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase">
                <ShieldCheck size={18} />
                <span>Digitally Sealed & Verified</span>
             </div>
          </div>
        </div>
      )}

      {result && result.status === 'not_found' && (
        <div className="bg-red-50 border-4 border-red-100 rounded-[2.5rem] p-12 text-center animate-in zoom-in duration-300 shadow-xl">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={48} />
          </div>
          <h3 className="text-2xl font-black text-red-900 mb-2">{lang === 'BN' ? 'কোনো তথ্য পাওয়া যায়নি' : 'Invalid Certificate ID'}</h3>
          <p className="text-red-700 font-medium max-w-xs mx-auto">{lang === 'BN' ? 'প্রদত্ত আইডিটি আমাদের সিস্টেমে খুঁজে পাওয়া যায়নি। দয়া করে সঠিক আইডি লিখুন।' : 'The ID provided does not match any record in our system. Please check for typos.'}</p>
        </div>
      )}
    </div>
  );
};

const DataField: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 transition-colors hover:bg-emerald-50 hover:text-emerald-500">{icon}</div>
    <div className="space-y-0.5">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
       <p className="font-black text-slate-800 text-xl tracking-tight leading-tight">{value}</p>
    </div>
  </div>
);

export default VerificationPage;
