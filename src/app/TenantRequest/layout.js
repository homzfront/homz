import '../globals.css';
import { Inter } from 'next/font/google';
import Header from '../../pages/SecondRelease/components/header';
import HeaderMobile from '../../pages/SecondRelease/components/mobile_header';
import MarginWidthWrapper from '../../pages/SecondRelease/components/margin-width-wrapper';
import PageWrapper from '../../pages/SecondRelease/components/page-wrapper';
import SideNav from '../../pages/SecondRelease/components/SideNav';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
  return (
   
        <div className="flex gap-3 md:gap-0">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>
              {children}
              </PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
    
  );
}
