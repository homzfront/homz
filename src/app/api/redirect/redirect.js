import { NextResponse } from 'next/server';

export const config = {
  
  // This middleware will run for every request
  async rewrites() {
    const url = await this.nextUrl.clone();
    if (url.pathname === '/api/redirect') {
      try {
        const res = await fetch(url.searchParams.get('url')); // Fetch the external URL
        const contentType = res.headers.get('content-type');
        return NextResponse.rewrite(url.searchParams.get('url'))
          .header('Content-Type', contentType); // Set the correct content type
      } catch (error) {
        console.error('Error fetching external URL:', error);
        // Handle errors as needed, e.g., redirect to an error page
      }
    }
  },
};
