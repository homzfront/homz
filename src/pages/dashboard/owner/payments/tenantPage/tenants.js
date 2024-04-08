import React from 'react'
import Box from '../../components/box'
import TenantData from "../components/tenantData";

const Tenants = () => {
  return (
    <div>
        <div className="mt-2 flex gap-2">
        <Box
          bgColor={"Success"}
          textColor={"text-successBg"}
          textColor2={"text-successBg"}
          type={"Total Renenue"}
          money={"N19,000,000"}
        />
        <Box
          bgColor={"successBg"}
          border={"border-Success"}
          textColor={"text-Success"}
          textColor2={"text-BlackHomz"}
          type={"Total Rent Collected"}
          money={"N7,000,000"}
        />
        <Box
          bgColor={"warningBg"}
          border={"border-warning2"}
          textColor={"text-warning2"}
          textColor2={"text-BlackHomz"}
          type={"Pending Rent"}
          money={"N12,000,000"}
        />
        <Box
          bgColor={"white"}
          border={"border-BlueHomz"}
          textColor={"text-BlueHomz"}
          textColor2={"text-BlackHomz"}
          payDate={"January,2024"}
          textColor3={"text-BlueHomz"}
          type={"Expected Rent Next Month"}
          money={"N4,000,000"}
        />
      </div>
      <div className="mt-6">
        <TenantData />
      </div>
    </div>
  )
}

export default Tenants