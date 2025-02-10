import VideoModal from '@/components/general/videoModal'
import DocDocu from '@/components/icons/docDocu'
import DocReceipt from '@/components/icons/docReceipt'
import QuickNotice from '@/components/icons/quickNotice'
import FormSelection from '@/store/document/FormSelection'
import React from 'react'

const SelectDocument = ({ handlePageChangeTwo }) => {
  const videoUrl = "https://youtu.be/biBbcYaJboQ?si=KVIXlliYFGPHpdap"
  const videoUrl2 = "https://youtu.be/bITV-yk-l1M?si=q2KPHzw-3GN9Kugs"
  const videoUrl3 = "https://youtu.be/ZiELgNXtz4Y?si=9n5wEQpNmMxjfoxJ"
  const data = [
    {
      id: 1,
      image: <DocDocu />,
      text: "Tenancy Agreement",
      video: <VideoModal videoUrl={videoUrl} />
    },
    {
      id: 2,
      image: <DocReceipt />,
      text: "Invoice and Receipt",
      video: <VideoModal videoUrl={videoUrl2} />
    },
    {
      id: 3,
      image: <QuickNotice />,
      text: "Quit Notice",
      video: <VideoModal videoUrl={videoUrl3} />
    }
  ]

  const { setDocType } = FormSelection();

  const handleSelectDocument = (docType) => {
    setDocType(docType);
    handlePageChangeTwo();
  };


  return (
    <div>
      <p className='mt-2 text-[14px] md:text-[18px] font-[500] text-BlackHomz'>
        Select document type
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {
          data.map((data) => (
            <div>
            <div className='w-full bg-whiteblue rounded-[8px] h-[80px] flex items-center px-8 text-BlackHomz hover:text-white hover:bg-BlueHomz cursor-pointer'
              onClick={() => handleSelectDocument(data.text)}
              key={data.id}
            >
              <div className='flex justify-start gap-2 items-center text-[16px] font-[400]'>
                <div className='h-[45px] w-[45px] bg-white flex justify-center items-center rounded-full'>{data.image}</div>
                {data.text === "Invoice and Receipt" ? "Receipt" : data.text}
              </div>
            </div>
            <div className='bg-[#F6F6F6] rounded-[4px] mt-2 py-2 px-8'>
              {
                <VideoModal videoUrl={data.video} />
              }
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default SelectDocument