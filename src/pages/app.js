// // pages/_app.js
// import React from 'react';
// import { QueryClientProvider, QueryClient } from 'react-query';
// // import { ReactQueryDevtools } from 'react-query/devtools';
// import { Hydrate } from 'react-query/hydration';
// import '@/styles/globals.css'; // Your global styles
// import { queryClient } from '@/utils/queryClient'; // Adjust the path accordingly

// function MyApp({ Component, pageProps }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Hydrate state={pageProps.dehydratedState}>
//         <Component {...pageProps} />
//       </Hydrate>
//       {/* <ReactQueryDevtools /> Remove this line */}
//     </QueryClientProvider>
//   );
// }

// export default MyApp;


// pages/_app.js or pages/_app.tsx

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
