"use client"
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const PrivacyPolicy = () => {
    const router = useRouter();
    const handleBackButtonClick = () => {
        router.back();
    };
    return (
        <div>
            <div className='px-[60px] pt-8'>
                <Image
                    src={"/Homz_Logo_Blue.png"}
                    alt="HOMZ"
                    height={28}
                    className="cursor-pointer "
                    width={131}
                    onClick={handleBackButtonClick}
                />
                <div className='mt-6 rounded-[12px] bg-black h-[96px] w-full flex justify-center items-center'>
                    <h1 className='text-[23px] font-[700] text-white'>
                        Privacy Policy
                    </h1>
                </div>
                <div className='flex flex-col gap-6 mt-6'>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Our Commitment To You
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Homz respects your privacy and is committed to protecting personal information collected from you through our website. This privacy policy governs the way we collect and use information, and by using the services on our website ('Services') you agree to be bound by this policy. All references within this policy to 'we/us/our' refer to Homz.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Information We Collect
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            When you use the Services you will have the option to provide us with personal information, such as your email address, so that we may keep you informed. We use this information only in response to your requests and to provide the Services.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            When visiting our website, we may place one or more cookies (a small file that is stored by your browser to recognise you and store your preferences) on your computer. This helps us to improve our Services by personalising information you may want. You may adjust the settings on your browser to refuse cookies but some of the Services may not work if you do so. We may also log information from your computer including the existence of cookies, your IP address and information about your browser program in order to allow us to diagnose problems, administer and track your usage of the Services.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            How We Use Information
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We use the information we collect to provide the Services and to communicate with you. We do not rent or sell personal information and will only share your information in the following circumstances:
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>1. </span> When you have consented or directed us to share the information.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>2. </span> With service providers or affiliate companies who perform services on our behalf.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>3. </span> In order to satisfy any requirement under the law or to protect our rights or prevent any concerns relating to fraud or security.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>4. </span> In the event of a merger or sale of all or part of our business whereby personal information may be transferred as an asset of the business.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We may share with third parties aggregate information or information that does not personally identify individuals.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We may share your information for any of these purposes with the following individuals and entities:
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Vendors engaged by Homz to provide certain services to you, including, but not limited to, payment processing management, credit screening, and vacancy management. Homz maintains contracts with our vendors requiring them to only use your personal information as necessary to provide their services and requiring them to comply with the requirements of this Privacy Policy and applicable laws.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Services used by Homz to aid our ability to provide the best possible experience to you.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Homz may need to share your information for law enforcement or other legal purposes. This type of sharing may be necessary in connection with a lawsuit, claim or investigation, governmental inquiry, court order, enforcement of legal rights (e.g., contract terms, intellectual property rights, etc.), safety issue, or other similar legal or security matter. Sharing your information for these reasons is not a regular event, but could arise from time to time. We will strive to limit the types and amount of information we may need to share for legal purposes to that which is reasonably necessary.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We may share (or receive) information about you, including personal contact information, in the event of an acquisition, merger, sale, corporate restructuring, bankruptcy, or other similar event that involvesHomz. If such an event occurs, Homz will take reasonable steps to require that your information be handled in accordance with this Privacy Policy.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Communicating With You
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            If you prefer not to receive emails about our Services, you may opt out of such communications by following the instructions at the bottom of any of our emails, or by mailing us via support@homz.ng
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Third Parties
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We use third parties to serve advertisements on our website and these third parties may use cookies or other means to help measure the effectiveness of their advertisements. Our website may also include links to other unrelated websites and/or contact forms to other unrelated parties which may collect personal information. Our privacy policy does not extend to these third parties or other websites and we recommend that users refer directly to these parties regarding their privacy policies before supplying personal details to these companies.
                        </p>
                        <div>
                            <p className='text-[18px] font-[700] leading-loose'>
                                Name: Google Ads
                            </p>
                            <p className='text-[18px] font-[400] leading-loose'>
                                Purpose: Google Ads enables Homz to track the conversion of pay-per-click advertising conversion.
                            </p>
                            <div className='flex flex-col'>
                                <a href={"https://policies.google.com/technologies/partner-sites"} target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to privacy policy'>
                                    Privacy policy
                                </a>
                                <a href="https://adssettings.google.com/authenticated?hl=en" target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to Opt-out'>
                                    Opt-out
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className='text-[18px] font-[700] leading-loose'>
                                Name: Google Analytics Remarketing
                            </p>
                            <p className='text-[18px] font-[400] leading-loose'>
                                Purpose: Google Analytics Remarketing collects statistical data for the purpose of retargeting users with display and search ads.
                            </p>
                            <div className='flex flex-col'>
                                <a href={"https://policies.google.com/technologies/partner-sites"} target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to privacy policy'>
                                    Privacy policy
                                </a>
                                <a href="https://www.google.com/ads/preferences" target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to Opt-out'>
                                    Opt-out
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className='text-[18px] font-[700] leading-loose'>
                                Name: Google Analytics Demographics and Interest Reporting
                            </p>
                            <p className='text-[18px] font-[400] leading-loose'>
                                Purpose: Google Analytics Demographics and Interest Reporting captures anonymous demographic data and enables interest-based advertising to be served online.
                            </p>
                            <div className='flex flex-col'>
                                <a href={"http://www.google.com/policies/technologies/ads"} target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to privacy policy'>
                                    Privacy policy
                                </a>
                                <a href="https://www.google.com/ads/preferences" target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to Opt-out'>
                                    Opt-out
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className='text-[18px] font-[700] leading-loose'>
                                Name: DoubleClick
                            </p>
                            <p className='text-[18px] font-[400] leading-loose'>
                                Purpose: Homz collaborates with third-party technology providers such as Doubleclick to ensure the most efficient media procurement possible.
                            </p>
                            <div className='flex flex-col'>
                                <a href={"https://policies.google.com/privacy"} target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to privacy policy'>
                                    Privacy policy
                                </a>
                                <a href="https://www.google.com/ads/preferences" target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to Opt-out'>
                                    Opt-out
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className='text-[18px] font-[700] leading-loose'>
                                Name: Google Advertising
                            </p>
                            <p className='text-[18px] font-[400] leading-loose'>
                                Purpose: Google Advertising is one of our most trusted partners in the area of targeted advertising through the use of Google Doubleclick.
                            </p>
                            <div className='flex flex-col'>
                                <a href={"https://policies.google.com/privacy"} target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to privacy policy'>
                                    Privacy policy
                                </a>
                                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to Opt-out'>
                                    Opt-out
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className='text-[18px] font-[700] leading-loose'>
                                Name: Facebook
                            </p>
                            <p className='text-[18px] font-[400] leading-loose'>
                                Purpose: Facebook is one of the social media platforms with which we integrate. We collect data on pages viewed and actions taken in conjunction with Facebook in order to generate property suggestions via Facebook adverts.
                            </p>
                            <div className='flex flex-col'>
                                <a href={"https://www.facebook.com/about/privacy"} target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to privacy policy'>
                                    Privacy policy
                                </a>
                                <a href="https://www.facebook.com/help/contact/1994830130782319" target="_blank" rel="noopener noreferrer" className='text-[18px] font-[400] leading-loose' title='link to Opt-out'>
                                    Opt-out
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Safety And Security
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Personal information is processed and stored in our databases and we have taken reasonable steps to secure and protect the information under our control, including establishing processes to prevent unauthorized access or disclosure of this information. However, whilst we make every effort to ensure the security of your information, we are unable to guarantee the protection of the information from misuse, accidental disclosure or unauthorised acts by others. Information provided by you may be stored or processed outside Nigeria.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Changes To Privacy Policy
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We reserve the right to change this privacy policy at any time without prior notice to you. Any changes will be posted on our website and become effective at the time of posting. In the event that material changes are made that affect the use or disclosure of your personal information, we will make reasonable efforts to notify you of these changes.
                            If you have any questions or comments about our privacy policy, please Contact us.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default PrivacyPolicy; 