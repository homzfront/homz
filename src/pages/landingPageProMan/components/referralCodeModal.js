'use client';

import { useState } from 'react';
import Close from '@/components/icons/Close';
import ArrowLeftt from '@/components/icons/arrowLeftt';
import CheckCircle from '@/components/icons/checkCircle';
import useOpenPaymentType from '@/store/enterpriseStore/useOpenPaymentType';

const ReferralCodeModal = ({ setReferralModal }) => {
  const [code, setCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [error, setError] = useState('');
  const { setError: openWarning } = useOpenPaymentType();

  const handleApply = () => {
    if (code.trim().toUpperCase() !== 'VALID123') {
      setError('Invalid code');
      setIsApplied(false);
    } else {
      setError('');
      setIsApplied(true);
    }
  };

  const isApplyDisabled = code.trim() === '' || isApplied;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white mx-auto rounded-xl shadow-lg p-6 w-[520px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setReferralModal(false)}>
            <ArrowLeftt />
          </button>
          <button className='cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center' onClick={() => setReferralModal(false)}>
            <Close />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-[16px] font-bold text-BlackHomz mb-1">Referral Code</h2>
        <p className="mb-4 text-[13px] text-GrayHomz font-normal">
          Enter your code below to enjoy a special offer on your selected plan.
        </p>

        {/* Input & Apply */}
        <div className="flex items-start gap-2 mb-1 relative">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
              setIsApplied(false);
            }}
            placeholder="Enter discount code"
            className={`w-full px-3 h-[48px] border rounded-[4px] text-sm outline-none transition 
              ${error ? 'border-error' : isApplied ? 'border-Success' : 'border-GrayHomz2'}
            `}
            disabled={isApplied}
          />

          {!isApplied ? (
            <button
              onClick={handleApply}
              className={`px-4 rounded-[4px] flex justify-center items-center h-[48px] text-sm font-medium transition 
                ${isApplyDisabled
                  ? 'bg-GrayHomz6 cursor-not-allowed text-GrayHomz5'
                  : 'bg-[#EEF5FF] border border-BlueHomz hover:bg-BlueHomz4 text-BlueHomz'
                }`}
              disabled={isApplyDisabled}
            >
              Apply
            </button>
          ) : (
            <div className="bg-successBg px-3 rounded-[4px] flex justify-center items-center h-[48px] text-Success text-sm font-medium">
              <CheckCircle />
              Applied
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-error mb-3 mt-1">Invalid code</p>
        )}

        {/* Discount info (optional) */}
        {isApplied && (
          <p className="text-[13px] text-GrayHomz font-normal mt-2 mb-1"><span className='line-through'>₦19,000</span> [20]% off</p>
        )}

        {/* Pay Now Button */}
        <button
          onClick={() => openWarning(true)}
          className={`w-full mt-3 flex justify-center items-center h-[48px] rounded-[4px] text-sm font-medium transition 
            ${isApplied ? 'bg-BlueHomz hover:bg-blue-700 text-white' : 'bg-GrayHomz6 text-GrayHomz5 cursor-not-allowed'}
          `}
          disabled={!isApplied}
        >
          Pay Now (₦6,000)
        </button>
      </div>
    </div>
  );
};

export default ReferralCodeModal;
