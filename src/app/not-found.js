import Link from 'next/link';
import React from 'react'

const NotFound = () => {
    return (
        <div className='w-full mt-20 md:mt-0 px-8 md:h-screen m-auto md:flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='mt-0 md:mt-[-60px] text-[64px] md:text-[235px] font-[800] text-BlueHomz'>
                    404
                </h1>
                <p className='text-[23px] md:text-[36px] font-[700] text-BlackHomz text-center'>
                    Something seems to be broken
                </p>
                <p className='text-[16px] md:text-[20px] font-[500] text-center'>
                    The page you’re searching for cannot be found
                </p>
                <Link 
                href={"/"}
                 className='mt-4 w-full flex justify-center items-center'>
                    <button className='h-[48px] md:h-[54px] w-full md:w-[110px] bg-BlueHomz text-[16px] md:text-[20x] font-[500] text-white rounded-[4px] hover:text-BlueHomz hover:border hover:border-BlueHomz hover:bg-transparent'>
                        Go home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound;