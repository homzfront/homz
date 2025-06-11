import usePaymentFilterStore from '@/store/enterpriseStore/usePaymentFilterStore';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  
  // Format day with ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
  const day = date.getDate();
  let dayWithSuffix;
  if (day > 3 && day < 21) dayWithSuffix = `${day}th`;
  else {
    switch (day % 10) {
      case 1: dayWithSuffix = `${day}st`; break;
      case 2: dayWithSuffix = `${day}nd`; break;
      case 3: dayWithSuffix = `${day}rd`; break;
      default: dayWithSuffix = `${day}th`;
    }
  }

  // Format month
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format time
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `[${dayWithSuffix} ${month}, ${year}] - [${hours}:${minutes} ${ampm}]`;
};

const FeeList = () => {
  const {
    feeData,
    loadingFee,
    fetchFeeList,
    error,
  } = usePaymentFilterStore();

  React.useEffect(() => {
    fetchFeeList();
  }, []);

  return (
    <div className="border border-[#E6E6E6] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-whiteblue text-[13px] font-[500] text-BlackHomz px-4 py-[14px]">
        Date & Time
      </div>

      {/* Loading State */}
      {loadingFee && (
        <div className="px-4 py-[14px] flex flex-col gap-3">
          {Array(4).fill(0).map((_, index) => (
            <Skeleton key={index} height={20} width={20} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loadingFee && (
        <div className="px-4 py-[14px] text-red-500">
          Error loading fee data. Please try again.
        </div>
      )}

      {/* Empty State */}
      {!loadingFee && !error && (!feeData || feeData?.data?.results?.length === 0) && (
        <div className="px-4 py-[14px] text-GrayHomz">
          No fee records found
        </div>
      )}

      {/* Data State */}
      {!loadingFee && !error && feeData?.data?.results?.length > 0 && (
        <div className='text-[13px] font-[500] text-GrayHomz px-4 py-[14px] flex flex-col gap-3'>
          {feeData.data.results.map((fee) => (
            <div key={fee._id}>
              {formatDate(fee.date)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeeList;