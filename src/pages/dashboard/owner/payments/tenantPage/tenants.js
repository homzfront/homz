"use client"
import React, { useEffect } from 'react'
import Box from '../../components/box'
import TenantData from "../components/tenantData";
import usePropertyOwnerRevenueStore from '@/store/propertyOwnerStore/ownerRevenue';
import addCommasToNumber from '@/utils/addCommasToNumber';
import useRentPaymentOwnerStore from '@/store/propertyOwnerStore/rentPaymentOwnerInfo';

const Tenants = ({ rentData }) => {
  const { data, loading, fetchData } = usePropertyOwnerRevenueStore();


  useEffect(() => {
    fetchData()

  }, [])

  return (
    <div>
      <div className="mt-2 grid md:grid-cols-4 grid-cols-2 gap-2">
        <Box
          bgColor={"Success"}
          textColor={"text-successBg"}
          textColor2={"text-successBg"}
          type={"Total Renenue"}
          money={addCommasToNumber(data?.totalRevenue)}
        />
        <Box
          bgColor={"successBg"}
          border={"border-Success"}
          textColor={"text-Success"}
          textColor2={"text-BlackHomz"}
          type={"Total Rent Collected"}
          money={addCommasToNumber(data?.rentCollected)}
        />
        <Box
          bgColor={"warningBg"}
          border={"border-warning2"}
          textColor={"text-warning2"}
          textColor2={"text-BlackHomz"}
          type={"Pending Rent"}
          money={addCommasToNumber(data?.pendingRent)}
        />
        <Box
          bgColor={"white"}
          border={"border-BlueHomz"}
          textColor={"text-BlueHomz"}
          textColor2={"text-BlackHomz"}
          // payDate={"January,2024"}
          textColor3={"text-BlueHomz"}
          type={"Expected Rent Next Month"}
          money={addCommasToNumber(data?.rentExpectedNextMonth)}
        />
      </div>
      <div className="mt-6">
        <TenantData data={rentData} />
      </div>
    </div>
  )
}

export default Tenants