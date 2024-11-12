import React, { useState } from 'react'
import FormSelection from '@/store/document/FormSelection';
import AgreementForm from './agreementForm';
import ReceiptForm from './receiptForm';
import QuickNoticeForm from './quitNoticeForm';
import ArrowLeft from '@/components/icons/arrowLeft';

const CustomInformation = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
  const { DocType } = FormSelection();
  let string = "> Custom Information";

  return (
    <div className='h-[70vh] overflow-y-auto scrollbar-container'>
      <div
        onClick={handlePageChangeTwo}
        className='flex md:hidden items-center gap-1 cursor-pointer'
      >
        <ArrowLeft />
        <p className='text-[11px] font-[400] text-GrayHomz2'>
          Go Back
        </p>
      </div>
      <p className='mt-2 text-[16px] md:text-[18px] font-[400] text-GrayHomz'>
        {DocType === "Invoice and Receipt" ? "Receipt" : DocType} <span className='text-BlackHomz font-[600]'>{string}</span>
      </p>
      <div className={`${DocType === "Tenancy Agreement" ? "" : "hidden"}`}>
        <AgreementForm setDocumentCreation={setDocumentCreation} handlePageChangeTwo={handlePageChangeTwo} setShowPreview={setShowPreview} />
      </div>
      <div className={`${DocType === "Quit Notice" ? "" : "hidden"}`}>
        <QuickNoticeForm setDocumentCreation={setDocumentCreation} handlePageChangeTwo={handlePageChangeTwo} setShowPreview={setShowPreview} />
      </div>
      <div className={`${DocType === "Invoice and Receipt" ? "" : "hidden"}`}>
        <ReceiptForm setDocumentCreation={setDocumentCreation} handlePageChangeTwo={handlePageChangeTwo} setShowPreview={setShowPreview} />
      </div>
    </div>
  )
}

export default CustomInformation