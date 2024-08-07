import DocDocu from '@/components/icons/docDocu'
import DocReceipt from '@/components/icons/docReceipt'
import QuickNotice from '@/components/icons/quickNotice'
import FormSelection from '@/store/document/FormSelection'
import React from 'react'

const SelectDocument = ({ handlePageChangeTwo }) => {
  const data = [
    {
      id: 1,
      image: <DocDocu />,
      text: "Tenancy Agreement"
    },
    {
      id: 2,
      image: <DocReceipt />,
      text: "Invoice and Receipt"
    },
    {
      id: 3,
      image: <QuickNotice />,
      text: "Quit Notice"
    }
  ]

  const { setDocType, DocType } = FormSelection();

  const handleSelectDocument = (docType) => {
    setDocType(docType);
    handlePageChangeTwo();
  };


  return (
    <div>
      <p className='mt-2 text-[18px] font-[500] text-BlackHomz'>
        Select document type
      </p>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {
          data.map((data) => (
            <div className='w-full bg-whiteblue rounded-[8px] h-[80px] flex items-center px-8 text-BlackHomz hover:text-white hover:bg-BlueHomz cursor-pointer' onClick={() => handleSelectDocument(data.text)} key={data.id}>
              <div className='flex justify-start gap-2 items-center text-[16px] font-[400]'>
                <div className='h-[45px] w-[45px] bg-white flex justify-center items-center rounded-full'>{data.image}</div>
                {data.text}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SelectDocument