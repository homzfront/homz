'use client';

import { useState, useEffect, useRef } from 'react';
import Close from '@/components/icons/Close';
import ArrowLeftt from '@/components/icons/arrowLeftt';
import CheckCircle from '@/components/icons/checkCircle';
import useOpenPaymentType from '@/store/enterpriseStore/useOpenPaymentType';
import useEnterprisePlans from '@/store/enterpriseStore/enterprisePlans';
import api from '@/utils/api';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const ReferralCodeModal = ({ setReferralModal, fromSIgnUp }) => {
  const [code, setCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountDetails, setDiscountDetails] = useState(null);
  const { data: enterprisePlans } = useEnterprisePlans();
  const { isMonthlyData, isAnnaullyData, isBiAnnaullyData } = useOpenPaymentType();
  const debounceTimer = useRef(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const router = useRouter();
  const [data, setData] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('enterData');
      setData(JSON.parse(storedData));
    }
    // fetchData()
  }, []);


  const findMatchingPlan = () => {
    const selectedPlan =
      isMonthlyData || isAnnaullyData || isBiAnnaullyData;

    if (!selectedPlan) return null;

    return enterprisePlans?.find(
      (plan) =>
        plan.plan_name === selectedPlan.planName &&
        plan.interval === selectedPlan.planInterval
    );
  };

  const validateDiscountCode = async () => {
    if (!code.trim()) {
      setIsApplied(false);
      setDiscountDetails(null);
      return;
    }

    setIsLoading(true);
    setError('');
    setIsApplied(false);

    try {
      const matchingPlan = findMatchingPlan();
      if (!matchingPlan) {
        setError('Could not find matching plan');
        return;
      }

      const payload = {
        code: code.trim().toUpperCase(),
        planId: matchingPlan._id
      };

      const response = await api.post('/discount/confirm-code', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsApplied(true);
      setDiscountDetails({
        originalPrice: matchingPlan.amount,
        discountPercentage: response.data.data.discountCode.percentageOff || "",
        finalPrice: response.data.data.discountFinalPrice || ""
      });
    } catch (err) {
      const response = err.response ? await JSON.parse(err.request.response) : null;
      setError(response?.message || 'Invalid discount code');
    } finally {
      setIsLoading(false);
    }
  };
  const handlePayNow = async () => {
    if (!isApplied || !discountDetails) return;

    setIsProcessingPayment(true);
    setError('');

    try {
      const matchingPlan = findMatchingPlan();
      if (!matchingPlan) {
        throw new Error('Could not find matching plan');
      }

      // Corrected payload structure
      let payload = {
        planName: (matchingPlan?.planName ?? matchingPlan?.plan_name) || "", // Use from state or default
        interval: (matchingPlan?.planInterval ?? matchingPlan?.interval) || "", // Use from state or default
        subscriptionType: "one-time", // Hardcoded as per requirement
        discountCode: code.trim().toUpperCase(), // From input field
        planId: matchingPlan._id // From matching plan
      };
      let response = null;
      if (fromSIgnUp && data) {
        payload = {
          ...payload,
          fullName: data?.fullName,
          businessName: data?.businessName,
          phoneNumber: String(data?.phoneNumber),
        };

        response = await api.post(
          '/enterprisePlan/create/subscription/one-time-with-discount/signup',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        response = await api.post(
          '/enterprisePlan/update/subscription/one-time-with-discount',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      const responseData = response.data;
      if (responseData) {
        const successMessage = responseData?.message ? responseData?.message :
          fromSIgnUp ? 'Enterprise Plan account created successfully. Please proceed to payment.' : 'Enterprise Plan subscription updated successfully. Please proceed to payment.';

        // Show success toast
        toast.success(successMessage);
        // Handle redirection to payment URL
        const authorizationUrl = responseData?.data?.paystackResponse?.data?.authorization_url;
        // const paystackAuthorizationUrl = responseData?.data?.paystackResponse?.data?.authorization_url;
        // console.log(authorizationUrl)
        if (authorizationUrl) {
          router.push(authorizationUrl);
          // } else if (isValidUrl(paystackAuthorizationUrl)) {
          //   router.push(paystackAuthorizationUrl);
          // }
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Payment failed');
      setError(error.response?.data?.message || error.response?.data?.error || 'Payment failed');
    } finally {
      setIsProcessingPayment(false);
    }
  };


  // Debounce the validation
  useEffect(() => {
    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Only validate if there's input
    if (code.trim()) {
      debounceTimer.current = setTimeout(() => {
        validateDiscountCode();
      }, 500); // 500ms debounce time
    } else {
      // Clear state if input is empty
      setIsApplied(false);
      setDiscountDetails(null);
      setError('');
    }

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [code]);

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white mx-auto rounded-xl shadow-lg p-6 w-[520px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setReferralModal(false)}>
            <ArrowLeftt />
          </button>
          <button
            className='cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center'
            onClick={() => setReferralModal(false)}
          >
            <Close />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-[16px] font-bold text-BlackHomz mb-1">Referral Code</h2>
        <p className="mb-4 text-[13px] text-GrayHomz font-normal">
          Enter your code below to enjoy a special offer on your selected plan.
        </p>

        {/* Input & Status */}
        <div className="flex items-start gap-2 mb-1 relative">
          <input
            type="text"
            value={code}
            onChange={handleInputChange}
            placeholder="Enter discount code"
            className={`w-full px-3 h-[48px] border rounded-[4px] text-sm outline-none transition 
              ${error ? 'border-error' :
                isApplied ? 'border-Success' :
                  isLoading ? 'border-BlueHomz' : 'border-GrayHomz2'}
            `}
          // disabled={isApplied || isLoading}
          />

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {isApplied && <CheckCircle className="text-Success" />}
          </div>
        </div>

        {/* Status Messages */}
        <div className="">
          {error && (
            <p className="text-sm text-error mt-1">{error}</p>
          )}
          {isLoading && (
            <p className="text-sm text-GrayHomz mt-1">Checking code...</p>
          )}
        </div>

        {/* Discount info */}
        {isApplied && discountDetails && (
          <div className="mt-2 mb-1">
            <p className="text-[13px] text-GrayHomz font-normal">
              <span className='line-through'>₦{discountDetails.originalPrice}</span>
              {' '}[{discountDetails.discountPercentage}%] off
            </p>
            <p className="text-[14px] font-medium text-Success">
              New Price: ₦{discountDetails.finalPrice.toLocaleString()}
            </p>
          </div>
        )}

        {/* Pay Now Button */}
        <button
          onClick={handlePayNow}
          className={`w-full mt-3 flex justify-center items-center h-[48px] rounded-[4px] text-sm font-medium transition 
            ${isApplied ? 'bg-BlueHomz hover:bg-blue-700 text-white' : 'bg-GrayHomz6 text-GrayHomz5 cursor-not-allowed'}
            ${isProcessingPayment ? 'flex justify-center items-center cursor-not-allowed' : ''}
          `}
          disabled={!isApplied || isLoading || isProcessingPayment}
        >
          {isProcessingPayment ? <LoadingFormII /> : isLoading ? 'Processing...' : `Pay Now ${isApplied && discountDetails ? `(₦${discountDetails.finalPrice})` : ''}`}
        </button>
      </div>
    </div>
  );
};

export default ReferralCodeModal;