"use client"
import React from 'react'
import { Plus_Jakarta_Sans } from "next/font/google";
import WithAuth from '@/components/auth/withAuth';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
  });
const protectedRoutes =  ({children}) => {
    return (
        <body className={plus_Jakarta_Sans.className}>{children}
            {/* <ReactQueryProvider>{children}</ReactQueryProvider> */}
        </body>
    )
}

export default WithAuth(protectedRoutes, ["/", "/about"]);

