import React from 'react'
import WalletBalance from './components/walletBalance/walletBalance';
import TransferHis from './components/transferHis/transferHis';
import Withdraw from './components/withdraw/withdraw';
import Activities from './components/activities/ativities';

const Wallet = ({activeTwo}) => {
  return (
    <div className='w-full flex gap-4 py-8'>
        <div className='flex flex-col w-[550px] h-[700px] justify-between mx-8'>
            <WalletBalance activeTwo={activeTwo}/>
            <Withdraw/>
            <Activities />
        </div>
        <div className='w-[500px]'>
          <TransferHis/>    
        </div>
    </div>
  )
}

export default Wallet;