"use client"
import ArrowLeftSmall from '@/components/icons/arrowLeftSmall';
import Link from 'next/link';
import React, { useState } from 'react'
import Widget from './widget/widget';
import WidgetMobile from './widget/widgetMobile';

const Activities = () => {

    return (
        <div className='p-6'>
            <div className='flex gap-3 items-center'>
                <Link
                    href={"/dashboard/enterprise-property/payments?tab=wallet"}
                    className='flex gap-1 items-center'
                >
                    <ArrowLeftSmall />
                    <p className='text-[14px] font-[400] text-GrayHomz2'>
                        Go Back
                    </p>
                </Link>
                <p className='text-[20px] font-[500] text-BlackHomz'>
                    Activities
                </p>
            </div>

            <div className="hidden md:block">
                {(
                    <div>
                        <div>
                            <Widget />
                        </div>
                    </div>
                )}
            </div>
            <div className='md:hidden'>
                {(
                    <div>
                        <div>
                            <WidgetMobile />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Activities;