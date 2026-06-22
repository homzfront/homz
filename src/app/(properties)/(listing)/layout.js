"use client";
import React, { Suspense } from 'react';
import LoadingII from '@/components/mainmenu/loadingII';

const Layout = ({ children }) => {
    return (
        <div className="w-full max-w-[1440px] m-auto">
            <Suspense fallback={<LoadingII />}>
                {children}
            </Suspense>
        </div>
    );
};//commit

export default Layout;