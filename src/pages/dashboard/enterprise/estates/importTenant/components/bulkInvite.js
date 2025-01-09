import React from 'react'
import WidgetBulk from './widgetBulk'
import Close from '@/components/icons/Close'

const BulkInvite = ({ setOpenBulkInvite, setImportData }) => {
    return (
        <div className="w-[360px] px-8 lg:w-[1000px] bg-white rounded-[12px] flex justify-between items-center">
            <div className='w-full flex justify-center items-center'>
                <WidgetBulk setOpenBulkInvite={setOpenBulkInvite} setImportData={setImportData} />
            </div>
        </div>
    )
}

export default BulkInvite