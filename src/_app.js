// In your app initialization file (e.g., _app.js or index.js)
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your component tree */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
