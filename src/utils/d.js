import { NextRequest, NextResponse } from 'next/server';
import keepThree from './keepThree';

const protectedRoutes = ['/dashboard/enterprise-property/dashboard'];

export default function middlesre(req) {
  // const session = typeof window !== 'undefined'
  //   ? localStorage.getItem('profile')
  //   : null; // Check for session in both client and server contexts

  // const pathname = keepThree(req.nextUrl.pathname);
  // const sessionStatus = Boolean(session); // Use Boolean for clear truthiness check

  // if (!sessionStatus && protectedRoutes.includes(pathname)) {
  //   const absoluteURL = new URL('/', req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  // // Allow access to non-protected routes and server-side requests
  // if (!protectedRoutes.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // // Handle protected routes on the server
  // // - Consider redirecting to a login page or appropriate route based on your application logic
  // // - Implement server-side authentication if applicable
  // const redirectURL = '/login'; // Replace with your desired redirect path
  // return NextResponse.redirect(redirectURL);
}
