import React from 'react'

const Payment = () => {
  return (
    <div>
    
    <div className="profiles flex  flex-col space-y-7 w-[313px]">
          <div className=" space-y-1">
            <label for="EnterprisePlan" className="">
            Enterprise Plan
            </label>
            <br />
            <input
              type="text"
              id="EnterprisePlan"
              className={`paymentField pl-3`}
              name="EnterprisePlan"
              placeholder="[Property Manager’s Name] is currently on the [enterprise plan]"
            />
          </div>

          <div className=" space-y-6">
          <h3 className=''>
          Payment Method
          </h3>


          <div className=' space-y-2 w-[677px] h-[120px] py-[16px] px-[20px] gap-[32px] bg-[#FCFCFC]'>

            <label for="CurrentCard">Current Card</label>
            <br />
            <input
              type="text"
              id="CurrentCard"
              className={`adminCellBorders w-[524px] h-[45px] gap-[4px] p-[12px] rounded-[4px] border-[1px] text-[#A9A9A9]`}
              name="CurrentCard"
              placeholder="[Mastercard : **** **** **** 2345 / Exp: **/26]"
            />
          </div>
          </div>
  

        </div>
    
    
    </div>
  )
}

export default Payment