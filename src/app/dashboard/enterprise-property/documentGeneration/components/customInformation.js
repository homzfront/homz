import React, { useState } from 'react'
import FormSelection from '@/store/document/FormSelection';
import AgreementForm from './agreementForm';
import ReceiptForm from './receiptForm';
import QuickNoticeForm from './quitNoticeForm';

const CustomInformation = ({ handlePageChangeTwo, setShowPreview }) => {
  const { DocType } = FormSelection();
  let string = "> Custom Information";

  return (
    <div className='h-[70vh] overflow-y-auto scrollbar-container'>
      <p className='mt-2 text-[18px] font-[400] text-GrayHomz'>
        {DocType === "Invoice and Receipt" ? "Receipt" : DocType} <span className='text-BlackHomz font-[600]'>{string}</span>
      </p>
      <div className={`${DocType === "Tenancy Agreement" ? "" : "hidden"}`}>
        <AgreementForm handlePageChangeTwo={handlePageChangeTwo} setShowPreview={setShowPreview} />
      </div>
      <div className={`${DocType === "Quit Notice" ? "" : "hidden"}`}>          
        <QuickNoticeForm handlePageChangeTwo={handlePageChangeTwo} setShowPreview={setShowPreview} />
      </div>
      <div className={`${DocType === "Invoice and Receipt" ? "" : "hidden"}`}>          
        <ReceiptForm handlePageChangeTwo={handlePageChangeTwo} setShowPreview={setShowPreview} />
      </div>
    </div>
  )
}

export default CustomInformation