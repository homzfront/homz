import React from 'react'
import WalletBalance from '../components/walletBalance';
import TransferDetails from '../components/transferDetails';
import Withdraw from '../components/withdraw';
import TransferHis from '../components/transferHis';

const Wallet = () => {
  return (
    <div className='w-full flex gap-8'>
        <div>
            <WalletBalance/>
            <TransferDetails/>
        </div>
        <div>
            <Withdraw/>
            <TransferHis/>
        </div>
    </div>
  )
}

export default Wallet;