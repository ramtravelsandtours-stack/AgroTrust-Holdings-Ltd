
import React, { useState, useRef } from 'react';
import { 
  X, CheckCircle2, CreditCard, Smartphone, Sprout, Beef, Milk, Fish, 
  ShoppingBag, User, Building2, UserPlus, ArrowLeft, ArrowRight, 
  Camera, Hash, Loader2, ShieldCheck, Upload, Trash2, 
  FileText, Download, Printer, ShieldAlert, Check, AlertCircle,
  FileBadge, Info
} from 'lucide-react';
import { Language } from '../types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState(1);
  const [shares, setShares] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [txId, setTxId] = useState('');
  
  const [isNomineeNidVerifying, setIsNomineeNidVerifying] = useState(false);
  const [isNomineeNidVerified, setIsNomineeNidVerified] = useState(false);
  const [isInvestorNidVerifying, setIsInvestorNidVerifying] = useState(false);
  const [isInvestorNidVerified, setIsInvestorNidVerified] = useState(false);
  
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const [investorPhoto, setInvestorPhoto] = useState<string | null>(null);
  
  const [showCertificate, setShowCertificate] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [hasDownloadedAgreement, setHasDownloadedAgreement] = useState(false);
  
  const investorPhotoInputRef = useRef<HTMLInputElement>(null);

  const sharePrice = 10000;
  const trackingId = useRef(`ATX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', motherName: '', dob: '', nid: '', phone: '', email: '', occupation: '', presentAddress: '', permanentAddress: '',
    nomineeName: '', nomineeRelation: '', nomineeNid: '', nomineeDob: '', nomineePhone: ''
  });

  const sectors = [
    { id: 'veg', bn: 'মৌসুমি সবজি ও ফসল চাষ', en: 'Vegetables & Crops', icon: <Sprout size={18} /> },
    { id: 'cattle', bn: 'গরু মোটাতাজাকরণ', en: 'Cattle Fattening', icon: <Beef size={18} /> },
    { id: 'poultry', bn: 'পোলট্রি ও ডেইরি ফার্ম', en: 'Poultry & Dairy', icon: <Milk size={18} /> },
    { id: 'fish', bn: 'মাছ চাষ ও মৎস্য প্রকল্প', en: 'Fish & Fisheries', icon: <Fish size={18} /> },
    { id: 'marketing', bn: 'কৃষিপণ্য সংগ্রহ ও বিপণন', en: 'Collection & Marketing', icon: <ShoppingBag size={18} /> },
  ];

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'nomineeNid') setIsNomineeNidVerified(false);
    if (name === 'nid') setIsInvestorNidVerified(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'investor' | 'nominee') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'investor') setInvestorPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateVerification = (type: 'investor' | 'nominee') => {
    const nidValue = type === 'investor' ? formData.nid : formData.nomineeNid;
    if (!nidValue || nidValue.length < 10) return;
    if (type === 'investor') setIsInvestorNidVerifying(true);
    else setIsNomineeNidVerifying(true);
    setTimeout(() => {
      if (type === 'investor') { setIsInvestorNidVerifying(false); setIsInvestorNidVerified(true); }
      else { setIsNomineeNidVerifying(false); setIsNomineeNidVerified(true); }
    }, 1200);
  };

  const handlePaymentSubmit = () => {
    if (!txId || txId.length < 6) return;
    setIsProcessingPayment(true);
    // Simulate API delay for payment verification
    setTimeout(() => {
      setIsProcessingPayment(false);
      nextStep();
    }, 2000);
  };

  const selectedSectorObj = sectors.find(s => s.id === selectedSector);
  const totalAmount = shares * sharePrice;

  const handleDownloadAgreement = () => {
    if (hasDownloadedAgreement) return;
    
    const content = `
AGROTRUST HOLDINGS LTD. - INVESTMENT AGREEMENT
-----------------------------------------------
Tracking ID: ${trackingId.current}
Date: ${new Date().toLocaleDateString()}

INVESTOR DETAILS:
Full Name: ${formData.fullName}
NID: ${formData.nid}
Phone: ${formData.phone}

INVESTMENT DETAILS:
Project Sector: ${selectedSectorObj?.en} (${selectedSectorObj?.bn})
Total Units: ${shares}
Total Capital: BDT ${totalAmount.toLocaleString()}
Method: ${paymentMethod.toUpperCase()} (TXID: ${txId})

SHARIAH COMPLIANCE:
This investment follows the Mudaraba/Musharakah principles as supervised 
by the AgroTrust Shariah Advisory Panel. Profits will be distributed 
based on actual quarterly audited earnings.

AUTHORIZED SIGNATORY
AgroTrust Holdings Ltd.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Investment_Agreement_${trackingId.current}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setHasDownloadedAgreement(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const resetAndClose = () => {
    setStep(1);
    setPaymentMethod('');
    setSelectedSector('');
    setShares(1);
    setIsNomineeNidVerified(false);
    setIsInvestorNidVerified(false);
    setInvestorPhoto(null);
    setHasDownloadedAgreement(false);
    setShowCertificate(false);
    setShowAgreement(false);
    setTxId('');
    setIsProcessingPayment(false);
    trackingId.current = `ATX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setFormData({
      fullName: '', fatherName: '', motherName: '', dob: '', nid: '', phone: '', email: '', occupation: '', presentAddress: '', permanentAddress: '',
      nomineeName: '', nomineeRelation: '', nomineeNid: '', nomineeDob: '', nomineePhone: ''
    });
    onClose();
  };

  const isProfileValid = () => {
    return (
      formData.fullName && 
      formData.phone && 
      formData.nid && 
      isInvestorNidVerified && 
      formData.nomineeName && 
      isNomineeNidVerified && 
      investorPhoto
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={resetAndClose} />
      
      <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300 border border-white/20">
        {!showCertificate && !showAgreement && (
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
             <div className="h-full bg-emerald-600 transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        )}

        <button onClick={resetAndClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-20">
          <X size={24} />
        </button>

        <div className="max-h-[90vh] overflow-y-auto no-scrollbar">
          {showCertificate ? (
             <div className="p-6 sm:p-12 text-center space-y-8 animate-in zoom-in duration-300">
                <div className="border-[12px] sm:border-[20px] border-double border-emerald-100 p-6 sm:p-12 relative bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                  <div className="relative z-10">
                    <img src="logo.png" alt="AgroTrust" className="w-48 h-auto mx-auto mb-8" />
                    <h2 className="text-2xl sm:text-4xl font-serif font-black text-emerald-900 mb-2 uppercase tracking-tighter">Investment Certificate</h2>
                    <p className="text-slate-400 font-serif italic mb-8">This confirms the shariah-compliant agricultural investment commitment.</p>
                    
                    <div className="space-y-2 mb-10">
                      <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest opacity-60">Presented to</p>
                      <h3 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 border-b-4 border-emerald-500 inline-block px-8 pb-2">{formData.fullName}</h3>
                    </div>

                    <p className="text-slate-700 text-sm sm:text-lg max-w-md mx-auto leading-relaxed mb-10 font-medium">
                      Has successfully committed capital for <strong className="text-emerald-700">{shares} Units</strong> in the <br />
                      <strong>{lang === 'BN' ? selectedSectorObj?.bn : selectedSectorObj?.en}</strong> project.
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 mt-4">
                      <div className="text-left">
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date of Issue</p>
                        <p className="font-bold text-slate-800">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Certificate ID</p>
                        <p className="font-mono font-bold text-emerald-700">{trackingId.current}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setShowCertificate(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl">Close</button>
                  <button onClick={() => window.print()} className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"><Printer size={20} />Print Certificate</button>
                </div>
             </div>
          ) : showAgreement ? (
            <div className="p-6 sm:p-12 space-y-6 animate-in slide-in-from-bottom duration-300">
               <div className="bg-slate-50 p-6 sm:p-12 rounded-[2.5rem] border-2 border-slate-100 shadow-inner max-h-[60vh] overflow-y-auto space-y-8 relative">
                 <img src="logo.png" className="w-32 absolute top-10 right-10 opacity-10 pointer-events-none" alt="" />
                 <h2 className="text-3xl font-black text-center text-slate-900 uppercase underline decoration-emerald-500 decoration-4 tracking-tighter">Investment Agreement</h2>
                 <div className="space-y-4 text-xs sm:text-sm font-serif leading-relaxed text-slate-700">
                   <p className="text-lg font-bold text-slate-800 mb-6">Mudaraba Agreement Particulars</p>
                   <p>This Agreement is executed between <strong>AgroTrust Holdings Ltd.</strong> (First Party/Mudarib) and <strong>{formData.fullName}</strong> (Second Party/Rabb-ul-Mal).</p>
                   <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
                     <p>1. <strong>Investment Portfolio:</strong> {selectedSectorObj?.en}</p>
                     <p>2. <strong>Capital Commitment:</strong> BDT {totalAmount.toLocaleString()}</p>
                     <p>3. <strong>Profit Distribution:</strong> Based on quarterly actual audited earnings.</p>
                     <p>4. <strong>Governance ID:</strong> {trackingId.current}</p>
                     <p>5. <strong>Transaction ID:</strong> {txId}</p>
                   </div>
                   <p className="font-bold">Conditions & Shariah Compliance:</p>
                   <ul className="list-disc pl-5 space-y-1">
                     <li>The First Party shall manage the business with due diligence and transparency.</li>
                     <li>Net profits shall be shared as per the agreed ratio after deducting operational costs.</li>
                     <li>The Second Party understands the risk-sharing nature of Shariah-compliant Mudaraba.</li>
                   </ul>
                   <p className="italic text-slate-500">Note: All operations are conducted under the supervision of the AgroTrust Shariah Advisory Panel.</p>
                 </div>
               </div>
               <button onClick={() => setShowAgreement(false)} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl">Back to Overview</button>
            </div>
          ) : (
            <div className="p-6 md:p-12">
              {/* Step 1: Selection */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <img src="logo.png" className="w-40 mx-auto mb-6" alt="AgroTrust" />
                    <h3 className="text-3xl font-black text-slate-900 leading-none">{lang === 'BN' ? 'বিনিয়োগ নির্বাচন' : 'Project Selection'}</h3>
                    <p className="text-slate-500 font-medium">{lang === 'BN' ? 'আপনার পছন্দের কৃষি খাত নির্বাচন করুন' : 'Pick a sector and set your share units'}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {sectors.map((sector) => (
                      <button key={sector.id} onClick={() => setSelectedSector(sector.id)} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${selectedSector === sector.id ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-200' : 'bg-white border-slate-100 hover:border-emerald-200'}`}>
                        <div className={`p-3 rounded-xl ${selectedSector === sector.id ? 'bg-white/20' : 'bg-emerald-100 text-emerald-600'}`}>{sector.icon}</div>
                        <span className="font-bold text-lg">{lang === 'BN' ? sector.bn : sector.en}</span>
                        {selectedSector === sector.id && <Check className="ml-auto" size={24} />}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-6 rounded-2xl flex items-center justify-between border border-slate-100">
                      <button onClick={() => setShares(Math.max(1, shares - 1))} className="w-12 h-12 bg-white border-2 rounded-xl font-bold text-xl active:scale-90 transition-transform">-</button>
                      <div className="text-center">
                        <span className="text-2xl font-black block leading-none">{shares}</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 block">Units</span>
                      </div>
                      <button onClick={() => setShares(shares + 1)} className="w-12 h-12 bg-white border-2 rounded-xl font-bold text-xl active:scale-90 transition-transform">+</button>
                    </div>
                    <div className="bg-emerald-600 p-6 rounded-2xl text-white text-center shadow-lg shadow-emerald-100 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{lang === 'BN' ? 'মোট বিনিয়োগ' : 'Total Capital'}</p>
                      <p className="text-2xl font-black leading-none">{totalAmount.toLocaleString()} ৳</p>
                    </div>
                  </div>
                  <button onClick={nextStep} disabled={!selectedSector} className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${selectedSector ? 'bg-emerald-600 text-white shadow-xl hover:bg-emerald-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    {lang === 'BN' ? 'প্রোফাইল পূরণ করুন' : 'Continue to Profile'}
                  </button>
                </div>
              )}

              {/* Step 2: Detailed Profile */}
              {step === 2 && (
                <div className="space-y-10">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-black tracking-tight leading-none">{lang === 'BN' ? 'বিনিয়োগকারী প্রোফাইল' : 'Investor Profile'}</h3>
                    <p className="text-slate-500 font-medium">নিচের সকল তথ্য প্রদান করলে পেমেন্ট অপশন চালু হবে</p>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <input type="file" ref={investorPhotoInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'investor')} />
                    <div onClick={() => investorPhotoInputRef.current?.click()} className={`w-32 h-32 rounded-[2.5rem] bg-slate-50 border-2 border-dashed ${investorPhoto ? 'border-emerald-500' : 'border-slate-300'} flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 cursor-pointer overflow-hidden transition-all shadow-inner group relative`}>
                      {investorPhoto ? (
                        <img src={investorPhoto} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={32} />
                          <span className="text-[8px] font-black mt-1 uppercase tracking-widest">আপনার ছবি</span>
                        </>
                      )}
                      {investorPhoto && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white" size={24} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <InputGroup label="পূর্ণ নাম (Name)" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                     <InputGroup label="মোবাইল নম্বর (Phone)" name="phone" value={formData.phone} onChange={handleInputChange} type="tel" />
                     <div className="space-y-1 relative">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">এনআইডি নম্বর (NID) *</label>
                        <div className="relative">
                          <input name="nid" value={formData.nid} onChange={handleInputChange} className={`w-full pr-24 pl-5 py-4 rounded-2xl border-2 ${isInvestorNidVerified ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-100 bg-slate-50'} outline-none text-sm font-black transition-all`} />
                          <button onClick={() => simulateVerification('investor')} disabled={!formData.nid || formData.nid.length < 10} className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-white text-[10px] font-black uppercase rounded-xl shadow-md transition-all ${isInvestorNidVerified ? 'bg-emerald-500' : 'bg-emerald-600 disabled:bg-slate-300'}`}>
                            {isInvestorNidVerifying ? <Loader2 size={12} className="animate-spin" /> : (isInvestorNidVerified ? 'Verified' : 'Verify')}
                          </button>
                        </div>
                     </div>
                     <InputGroup label="জন্ম তারিখ (DOB)" name="dob" value={formData.dob} onChange={handleInputChange} type="date" />
                  </div>

                  <div className="space-y-6 pt-8 border-t border-slate-100">
                    <h4 className="font-black text-sm uppercase text-emerald-600 flex items-center gap-2 tracking-widest"><UserPlus size={18} /> নমিনী তথ্য (Nominee)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <InputGroup label="নমিনীর নাম" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} />
                       <div className="space-y-1 relative">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">নমিনীর এনআইডি *</label>
                          <div className="relative">
                            <input name="nomineeNid" value={formData.nomineeNid} onChange={handleInputChange} className={`w-full pr-24 pl-5 py-4 rounded-2xl border-2 ${isNomineeNidVerified ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-100 bg-slate-50'} outline-none text-sm font-black transition-all`} />
                            <button onClick={() => simulateVerification('nominee')} disabled={!formData.nomineeNid || formData.nomineeNid.length < 10} className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-white text-[10px] font-black uppercase rounded-xl shadow-md transition-all ${isNomineeNidVerified ? 'bg-emerald-500' : 'bg-emerald-600 disabled:bg-slate-300'}`}>
                              {isNomineeNidVerifying ? <Loader2 size={12} className="animate-spin" /> : (isNomineeNidVerified ? 'Verified' : 'Verify')}
                            </button>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sticky bottom-0 bg-white py-4 border-t border-slate-50">
                    {!isProfileValid() && (
                      <div className="flex items-center gap-2 text-[10px] text-amber-600 font-black justify-center uppercase tracking-[0.2em] animate-pulse">
                        <AlertCircle size={14} />
                        {lang === 'BN' ? 'সকল তথ্য এবং ভেরিফিকেশন সম্পন্ন করুন' : 'Complete all fields and verification'}
                      </div>
                    )}
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="flex-1 py-4 rounded-2xl border-2 font-black text-slate-500 hover:bg-slate-50">পিছনে</button>
                      <button 
                        onClick={nextStep} 
                        disabled={!isProfileValid()} 
                        className={`flex-[2] py-4 rounded-2xl font-black text-xl shadow-xl transition-all ${isProfileValid() ? 'bg-emerald-600 text-white shadow-emerald-100 hover:scale-[1.02]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                      >
                        {lang === 'BN' ? 'পেমেন্ট অপশনে যান' : 'Proceed to Payment'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                   <div className="text-center space-y-2">
                    <img src="logo.png" className="w-24 mx-auto mb-4" alt="" />
                    <h3 className="text-3xl font-black leading-none">{lang === 'BN' ? 'পেমেন্ট সম্পন্ন করুন' : 'Final Step: Payment'}</h3>
                    <p className="text-slate-500 font-medium">নিচের পেমেন্ট মাধ্যম ব্যবহার করে ট্রানজেকশন আইডি দিন</p>
                  </div>

                  <div className="bg-emerald-950 text-white p-8 rounded-[2.5rem] shadow-2xl flex justify-between items-center overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Building2 size={120} /></div>
                    <div className="relative z-10">
                       <p className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.3em] mb-1">প্রদেয় পরিমাণ (Capital)</p>
                       <p className="text-4xl font-black tracking-tight">{totalAmount.toLocaleString()} ৳</p>
                    </div>
                    <div className="text-right relative z-10">
                       <p className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.3em] mb-1">রেফারেন্স আইডি</p>
                       <p className="font-mono text-2xl opacity-70 tracking-tighter">{trackingId.current}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['bkash', 'nagad', 'rocket', 'card'].map(id => (
                      <button key={id} onClick={() => setPaymentMethod(id)} className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${paymentMethod === id ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-100 hover:border-emerald-200'}`}>
                        {id === 'card' ? <CreditCard size={28} /> : <Smartphone size={28} />}
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{id}</span>
                        {paymentMethod === id && <Check size={16} className="text-emerald-400" />}
                      </button>
                    ))}
                  </div>

                  {paymentMethod && (
                    <div className="animate-in slide-in-from-top-4 duration-300 space-y-6">
                       <div className={`p-6 rounded-3xl border-2 flex items-start gap-4 shadow-sm ${paymentMethod === 'bkash' ? 'bg-pink-50 border-pink-100 text-pink-900' : paymentMethod === 'nagad' ? 'bg-orange-50 border-orange-100 text-orange-900' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
                          <ShieldAlert className="shrink-0 mt-1" size={28} />
                          <div className="space-y-2">
                            <h5 className="font-black text-sm uppercase tracking-tight">পেমেন্ট করার নিয়মাবলী ({paymentMethod})</h5>
                            <ol className="text-xs font-medium space-y-2 list-decimal list-inside opacity-80 leading-relaxed">
                              <li>আমাদের মার্চেন্ট নম্বর <strong>01700-000000</strong> এ টাকা পাঠান।</li>
                              <li>রেফারেন্স হিসেবে ট্র্যাকিং আইডি <strong>{trackingId.current}</strong> দিন।</li>
                              <li>পেমেন্ট শেষে আপনার ইনবক্সে পাওয়া 'Transaction ID' নিচে দিন।</li>
                            </ol>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Transaction ID (ট্রানজেকশন আইডি) *</label>
                          <input 
                            value={txId} 
                            onChange={(e) => setTxId(e.target.value.toUpperCase())} 
                            className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none font-mono text-3xl font-black tracking-[0.2em] placeholder:text-slate-200" 
                            placeholder="TXN00000" 
                          />
                       </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={prevStep} disabled={isProcessingPayment} className="flex-1 py-5 rounded-2xl border-2 font-black text-slate-500 hover:bg-slate-50 disabled:opacity-50">পিছনে</button>
                    <button 
                      onClick={handlePaymentSubmit} 
                      disabled={!txId || txId.length < 6 || isProcessingPayment} 
                      className={`flex-[2] py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${txId.length >= 6 ? 'bg-emerald-600 text-white shadow-emerald-200 hover:scale-[1.02]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 size={24} className="animate-spin" />
                          <span>যাচাই হচ্ছে...</span>
                        </>
                      ) : (
                        <span>বিনিয়োগ সম্পন্ন করুন</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Success & Documents */}
              {step === 4 && (
                <div className="text-center space-y-10 py-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="relative inline-block">
                    <div className="w-36 h-36 bg-emerald-100 text-emerald-600 rounded-[3rem] flex items-center justify-center mx-auto border-8 border-white shadow-2xl animate-pulse">
                      <CheckCircle2 size={80} strokeWidth={3} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <ShieldCheck size={28} />
                    </div>
                  </div>

                  <div className="space-y-3 px-4">
                    <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-none">ধন্যবাদ! বিনিয়োগ সফল।</h3>
                    <p className="text-slate-500 text-lg max-w-sm mx-auto font-medium leading-relaxed">আপনার সকল তথ্য এবং পেমেন্ট সফলভাবে যাচাই করা হয়েছে। নিচের ডকুমেন্টগুলো সংগ্রহ করুন।</p>
                  </div>
                  
                  {/* Document Center Section */}
                  <div className="space-y-4 max-w-md mx-auto text-left bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner">
                    <div className="flex items-center gap-2 mb-4 px-2">
                       <FileBadge className="text-emerald-600" size={20} />
                       <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500">{lang === 'BN' ? 'ডকুমেন্ট সেন্টার' : 'Document Center'}</h4>
                    </div>

                    <div className="space-y-3">
                      <button onClick={() => setShowCertificate(true)} className="w-full py-4 bg-white border-2 border-emerald-100 text-emerald-800 font-black rounded-2xl flex items-center justify-between px-6 hover:bg-emerald-50 transition-all shadow-sm group">
                        <div className="flex items-center gap-3">
                           <Printer size={20} className="text-emerald-600" />
                           <span className="text-[13px] uppercase tracking-tight">বিনিয়োগ সার্টিফিকেট</span>
                        </div>
                        <ArrowRight size={16} />
                      </button>
                      
                      <button onClick={() => setShowAgreement(true)} className="w-full py-4 bg-white border-2 border-slate-100 text-slate-700 font-black rounded-2xl flex items-center justify-between px-6 hover:bg-slate-50 transition-all shadow-sm group">
                        <div className="flex items-center gap-3">
                           <FileText size={20} className="text-slate-500" />
                           <span className="text-[13px] uppercase tracking-tight">চুক্তি পত্র প্রিভিউ</span>
                        </div>
                        <ArrowRight size={16} />
                      </button>

                      <div className="pt-4 space-y-3 border-t border-slate-200 mt-2">
                        <button 
                          onClick={handleDownloadAgreement} 
                          disabled={hasDownloadedAgreement}
                          className={`w-full py-5 font-black text-lg rounded-2xl flex items-center justify-center gap-4 shadow-xl transition-all transform hover:-translate-y-1 ${
                            hasDownloadedAgreement 
                            ? 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed' 
                            : 'bg-emerald-950 text-white'
                          }`}
                        >
                          <Download size={24} />
                          {hasDownloadedAgreement ? 'ডাউনলোড সম্পন্ন' : 'অফিসিয়াল কপি ডাউনলোড'}
                        </button>
                        
                        <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-xl border border-amber-100">
                           <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                           <p className={`text-[9px] font-bold ${hasDownloadedAgreement ? 'text-red-500' : 'text-amber-700'} leading-relaxed`}>
                             {hasDownloadedAgreement 
                               ? 'নিরাপত্তার স্বার্থে এই কপিটি পুনরায় ডাউনলোড করা যাবে না। আপনার সিস্টেমে এটি সংরক্ষণ করুন।' 
                               : 'বিনিয়োগ চুক্তিনামাটি (Investment Agreement) শুধুমাত্র একবার ডাউনলোডযোগ্য। ডাউনলোড বাটনে ক্লিক করে এটি সংগ্রহ করুন।'}
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button onClick={resetAndClose} className="w-full max-w-sm py-5 bg-emerald-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-colors">ড্যাশবোর্ডে ফিরে যান</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}> = ({ label, name, value, onChange, type = 'text' }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">{label}</label>
    <input 
      name={name} 
      value={value} 
      onChange={onChange} 
      type={type} 
      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none text-sm font-black transition-all shadow-sm" 
    />
  </div>
);

export default PurchaseModal;
