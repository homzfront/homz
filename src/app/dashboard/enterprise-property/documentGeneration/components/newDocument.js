import ArrowLeft from '@/components/icons/arrowLeft';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall'
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall'
import FormSelection from '@/store/document/FormSelection';
import React, { useState } from 'react'

const NewDocument = ({ handlePageChangeThree, handlePageChange, setDocumentCreation }) => {
  const { DocType, setFormName, FormName } = FormSelection();
  const [hover, setHover] = useState(false);
  const [hoverII, setHoverII] = useState(false);
  let string = "> Name Your Document"

  return (
    <div>
      <div
        onClick={handlePageChange}
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
      <div className='mt-4'>
        <input
          type='text'
          value={FormName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder='e.g Tenant Agreement'
          className='pl-2 py-2 placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 border w-full border-GrayHomz2 rounded-[4px] outline-none'
        />
      </div>
      <div className='flex items-center justify-between gap-4 md:gap-0 mt-4 text-[16px] font-[500]'>
        <div
          onClick={() => setDocumentCreation(false)}
          className='h-[48px] border border-BlueHomz w-full md:w-[20%] rounded-[4px] text-BlueHomz hover:text-white flex justify-center items-center cursor-pointer hover:bg-BlueHomz'
        >
          <p>
            Close
          </p>
        </div>
        <div className='flex justify-between w-full md:w-[45%]'>
          <div
            onClick={handlePageChange}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='hidden h-[48px] border border-BlueHomz w-[45%] rounded-[4px] text-BlueHomz hover:text-white md:flex gap-1 justify-center items-center cursor-pointer hover:bg-BlueHomz2'>
            {hover ? <ArrowLeftBlueSmall className='#ffffff' /> : <ArrowLeftBlueSmall />}  Go Back
          </div>
          <div
            onClick={handlePageChangeThree}
            onMouseEnter={() => setHoverII(true)}
            onMouseLeave={() => setHoverII(false)}
            className='h-[48px] hover:border hover:border-BlueHomz w-full md:w-[45%] rounded-[4px] flex gap-1 justify-center items-center cursor-pointer text-white hover:text-BlueHomz bg-BlueHomz hover:bg-whiteblue'>
            Next {hoverII ? <ArrowRightWhiteSmall /> : <ArrowRightWhiteSmall className='#ffffff' />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewDocument