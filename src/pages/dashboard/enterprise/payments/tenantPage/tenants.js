"use client"
import React, { useEffect } from 'react'
import Box from '../../components/box'
import Widget from "./widget";
import useEnterpriseRevenueStore from '@/store/enterpriseStore/enterpriseRevenue';
import addCommasToNumber from '@/utils/addCommasToNumber';
import usePaymentFilterStore from '@/store/enterpriseStore/usePaymentFilterStore';
import { formatDateRange } from '@/utils/formatDateRange';

const Tenants = ({ property }) => {
  const { data, fetchData } = useEnterpriseRevenueStore();
  const {
    fromDate,
    toDate,
    allData,
    walletData,
    offlineData,
    activeState,
  } = usePaymentFilterStore();

  useEffect(() => {
    fetchData()
  }, []);

  const currentSummary =
  activeState === 'one'
    ? allData?.summary
    : activeState === 'two'
    ? walletData?.summary
    : offlineData?.summary;


  return (
    <div className='w-full'>

      {property &&
        <p className="text-GrayHomz font-normal text-sm md:hidden">
          {formatDateRange(toDate, fromDate)}
        </p>
      }
      <div className='mt-2 hidden md:flex items-center justify-between w-full'>
        <Box
          bgColor={"Success"}
          textColor={"text-successBg"}
          textColor2={"text-successBg"}
          type={"Total Expected Renenue"}
          money={addCommasToNumber(currentSummary?.totalPayment)}
          width='md:w-[200px]'
        />
        <div className="flex items-center justify-between w-[78.5%]">
          <Box
            bgColor={"successBg"}
            border={"border-Success"}
            textColor={"text-Success"}
            textColor2={"text-BlackHomz"}
            type={"Total Rent Collected"}
            money={addCommasToNumber(currentSummary?.amountPaid)}
            width='md:w-[261.5px]'
          />
          <Box
            bgColor={"warningBg"}
            border={"border-warning2"}
            textColor={"text-warning2"}
            textColor2={"text-BlackHomz"}
            type={"Pending Rent"}
            money={addCommasToNumber(currentSummary?.pendingPayment)}
            width='md:w-[261.5px]'
          />
          <Box
            bgColor={"white"}
            border={"border-BlueHomz"}
            textColor={"text-BlueHomz"}
            textColor2={"text-BlackHomz"}
            // payDate={"January,2024"}
            textColor3={"text-BlueHomz"}
            type={"Number of Transactions"}
            money={currentSummary?.totalTranscation}
            width='md:w-[261.5px]'
            fromMaintain={true}
          />
        </div>
      </div>
      <div className="mt-2 md:hidden grid grid-cols-2 gap-2">
        <div className="inline-block min-w-[75%]">
          <Box
            bgColor={"Success"}
            textColor={"text-successBg"}
            textColor2={"text-successBg"}
            type={"Total Expected Renenue"}
            money={addCommasToNumber(currentSummary?.totalPayment)}
          />
        </div>
        <div className="inline-block min-w-[75%]">
          <Box
            bgColor={"successBg"}
            border={"border-Success"}
            textColor={"text-Success"}
            textColor2={"text-BlackHomz"}
            type={"Total Rent Collected"}
            money={addCommasToNumber(currentSummary?.amountPaid)}
          />
        </div>
        <div className="inline-block min-w-[75%]">
          <Box
            bgColor={"warningBg"}
            border={"border-warning2"}
            textColor={"text-warning2"}
            textColor2={"text-BlackHomz"}
            type={"Pending Rent"}
            money={addCommasToNumber(currentSummary?.pendingPayment)}
          />
        </div>
        <div className="inline-block min-w-[75%]">
          <Box
            bgColor={"white"}
            border={"border-BlueHomz"}
            textColor={"text-BlueHomz"}
            textColor2={"text-BlackHomz"}
            // payDate={"January,2024"}
            textColor3={"text-BlueHomz"}
            type={"Number of Transactions"}
            money={currentSummary?.totalTranscation}
            fromMaintain={true}
          />
        </div>
      </div>
      <div className={`md:mt-6`}>
        <Widget 
        property={property} 
        // summary={data}
         />
      </div>
    </div>
  )
}

export default Tenants