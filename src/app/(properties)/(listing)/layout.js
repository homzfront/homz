"use client";
import React, { Suspense } from 'react';
import Head from 'next/head';
import LoadingII from '@/components/mainmenu/loadingII';

const Layout = ({ children }) => {
    return (
        <div className="w-full max-w-[1440px] m-auto">
            <Head>
                <title>Listed Properties Page</title>
            </Head>
            <Suspense fallback={<LoadingII />}>
                {children}
            </Suspense>
        </div>
    );
};

export default Layout;