import React from 'react'
import WidgetBulk from './widgetBulk'
import Close from '@/components/icons/Close'

const BulkInvite = ({ setOpenBulkInvite }) => {
    return (
        <div className="w-full px-8 md:w-[1000px] bg-white rounded-[12px] flex justify-between items-center">
            <div className='w-full flex justify-center items-center'>
                <WidgetBulk setOpenBulkInvite={setOpenBulkInvite} />
            </div>
        </div>
    )
}

export default BulkInvite