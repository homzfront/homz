import Image from 'next/image'
import React from 'react'
import DateFooter from './dateFooter'

const ListingAuth = () => {
    return (
        <div className='w-full h-full max-h-[1024px] relative overflow-hidden'
            style={{
                background: `linear-gradient(180deg, #0058d4 0%, #000000 100%)`
            }}>

            {/* Background Image */}
            <div className='hidden sm:block absolute inset-0 w-full h-full'>
                <Image
                    src="/phone-in-hand.png"
                    alt="background-phone"
                    width={644}
                    height={757}
                    className='object-cover w-full h-full'
                    style={{
                        top: '0px',
                        position: 'absolute'
                    }}
                />
                {/* Gradient overlay - lighter at top, darker at bottom */}
                <div className='absolute inset-0' style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)'
                }}></div>
            </div>

            {/* Content for desktop (lg and above) */}
            <div className='hidden lg:flex w-full h-full flex-col justify-between px-8 py-[6%] relative z-10'>
                {/* Logo at top */}
                <div className='flex justify-start'>
                    <Image src="/Homz_colorless.png" alt="homz-logo" width={120} height={40} className='text-white' />
                </div>

                {/* Main content */}
                <div className='flex flex-col gap-8 '>
                    <h1 className='text-[44px] font-bold text-white leading-tight'>
                        Reach over<br />
                        25k daily visitors
                    </h1>
                    <ul className='text-[14px] font-normal text-white space-y-3 max-w-[350px]'>
                        <li className='flex items-center gap-3'>
                            <span className='w-2 h-2 bg-white rounded-full flex-shrink-0'></span>
                            20 Free property listings
                        </li>
                        <li className='flex items-center gap-3'>
                            <span className='w-2 h-2 bg-white rounded-full flex-shrink-0'></span>
                            Get seen on Google, Facebook, and Instagram
                        </li>
                        <li className='flex items-center gap-3'>
                            <span className='w-2 h-2 bg-white rounded-full flex-shrink-0'></span>
                            Maximum exposure to targeted buyers and renters
                        </li>
                        <li className='flex items-center gap-3'>
                            <span className='w-2 h-2 bg-white rounded-full flex-shrink-0'></span>
                            Easy and convenient listing process
                        </li>
                        <li className='flex items-center gap-3'>
                            <span className='w-2 h-2 bg-white rounded-full flex-shrink-0'></span>
                            Competitive pricing and flexible packages
                        </li>
                    </ul>
                </div>

                {/* Footer */}
                <div className='flex flex-col gap-4'>
                    <p className='text-[#A9A9A9] font-medium text-[13px]'>
                        <DateFooter />
                    </p>
                </div>
            </div>

            {/* Content for mobile/tablet (below lg) - shows at top */}
            <div className='relative flex flex-col justify-between px-6 py-10 z-10 h-[200px]'>
                {/* Logo */}
                <div className='flex justify-start'>
                    <Image src="/Homz_colorless.png" alt="homz-logo" width={100} height={32} className='text-white' />
                </div>

                {/* Mobile phone image positioned on the right */}
                <div className='absolute lg:hidden' style={{
                    top: '26px',
                    left: '176px',
                    width: '198px',
                    height: '233px'
                }}>
                    <Image
                        src="/phone-in-hand.png"
                        alt="phone-mobile"
                        width={198}
                        height={233}
                        className='object-contain sm:hidden'
                    />
                </div>

                {/* Mobile content - only the specified text */}
                <div className='flex flex-col'>
                    <h1 className='text-white leading-[100%]' style={{
                        fontFamily: 'Plus Jakarta Sans',
                        fontWeight: 500,
                        fontSize: '23px',
                        letterSpacing: '0%'
                    }}>
                        Reach over
                    </h1>
                    <h2 className='text-white leading-[100%]' style={{
                        fontFamily: 'Plus Jakarta Sans',
                        fontWeight: 700,
                        fontSize: '23px',
                        letterSpacing: '0%'
                    }}>
                        25k daily visitors
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ListingAuth