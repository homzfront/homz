"use client"
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'


const TermsAndConditions = () => {
    const router = useRouter();
    const handleBackButtonClick = () => {
        router.back();
    };
    return (
        <div>
            <div className='px-8 md:px-[60px] pt-8'>
                <Image
                    src={"/Homz_Logo_Blue.png"}
                    alt="HOMZ"
                    height={28}
                    className="cursor-pointer "
                    width={131}
                    onClick={handleBackButtonClick}
                />
                <div className='px-2 md:pt-0 mt-6 rounded-[12px] bg-black h-[96px] w-full flex justify-center items-center'>
                    <h1 className='text-[20px] md:text-[23px] font-[700] text-white'>
                        Terms and Conditions
                    </h1>
                </div>
                <div className='flex flex-col gap-6 mt-6'>
                    <p className='text-[18px] font-[400] leading-loose'>
                        Homz.ng is operated by Homz Front Limited. By using this website and the services contained therein ('Services') you agree to comply with and be bound by the following terms and conditions ('Terms of Use'). If you do not agree to and accept these Terms of Use, you should not use this website. All references within these Terms of Use to 'we/us/our' refer to Homz.

                    </p>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Restrictions On Use
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>1. </span>    You agree not to transmit any material designed to interrupt, damage, destroy or limit the functionality of our website or the Services.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>2. </span>    You agree not to use any automated software to view the Services without consent and to only access our Services manually.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>3. </span>    You agree not to use the Services other than for your own personal use or as an agent listing properties for sale and to rent.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>4. </span>    You agree not to attempt to copy our data or reverse engineer our processes without our consent.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>5. </span>    You agree not to
                            use our Services in any manner that is illegal, immoral or harmful to us.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>6. </span>    You agree not to use our Services in breach of any policy or other notice on our website.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>7. </span>    You agree not to remove or alter any copyright notices that appear on our website.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>8. </span>    You agree not to publish any material that may encourage a breach of any relevant laws or regulations.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>9. </span>    You agree not to interfere with any other user's enjoyment of our website or the Services.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>10. </span>    You agree not to transmit materials protected by copyright without the permission of the owner.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>11. </span>    You agree not to conduct yourself in an offensive or abusive manner whilst using our website or the Services.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>12. </span>    You agree not to attempt to bypass restrictions on user accounts.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Registration And Security
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            You must be over eighteen years of age to register on our website and must ensure that the details provided by you on registration are true, accurate, current and complete. It is your responsibility to update and inform us of any changes to the details provided on registration. Although certain parts of our website may be used by anyone who visits without requiring registration, some of the Services require you to register in order to enable us to verify your identity.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            By registering with the service, you agree that we can send you emails about your account, other Homz services and occasional third party offers.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            When registering, you will be asked to create a password and will be responsible for maintaining the confidentiality of your password and restricting access to your computer, as you will be accountable for any activities conducted under your password. If you believe that someone has accessed your account without authorisation, please contact us immediately.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Materials You Provide
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            By submitting content on our website or otherwise providing content to us in connection with the Services ('Materials'), you grant us a royalty-free, perpetual, irrevocable and non-exclusive right and license to (a) use, reproduce, distribute, display, modify and edit these Materials in connection with the Services and (b) sublicense these rights. We will not pay you any fees for these Materials and reserve the right in our sole discretion to remove or edit them at any time. You also warrant and represent that you have all rights necessary to grant us these rights. We permit you to post Materials on our website in accordance with our procedures provided that the content is not illegal, obscene, abusive, threatening, defamatory or otherwise objectionable to us.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Advertising Property On Website
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Property adverts/listings placed on our website must contain details of only one property in Nigeria per advert/listing. We reserve the right to either split adverts/listings that breach this term into single property adverts/listings or disable such adverts/listings.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Charges And Payments
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            All charges and payments for services on Homz are non-refundable.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Your Responsibilities
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We are not an estate agency and we provide a service whereby agents may market and you may view property details ('Details') together with other content hosted and developed by us. Agents are responsible for preparing the Details and fielding enquiries directly from you. We do not get involved in any communications between you and agents and we do not participate in any part of the transaction.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Details are hosted by us in good faith but are produced directly by agents and have not been verified by us. You are responsible for making your own enquiries and we provide no guarantee and accept no responsibility for the accuracy or completeness of any information contained within the Details.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>1. </span>    You are responsible for checking, confirming and satisfying yourself as to the accuracy of any Details.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>2. </span>    You are responsible for instructing a surveyor and obtaining legal advice before committing to any purchase.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            <span className='mr-2'>3. </span>    You are responsible for ensuring that you act in good faith towards any other parties.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Availability Of Website
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We strive to ensure that our website and the Services are available to you at all times but cannot guarantee that either the website or the Services will operate continuously, without interruptions or be fault free. On occasion, necessary maintenance or upgrade work requires us to make the website and the Services unavailable without notice, but we aim to keep downtime to a minimum. We accept no liability for any interruption or loss of service. We reserve the absolute right to alter, suspend or discontinue any part of our website or the Services, including your access to it.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Third Parties
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Our website may contain links to third party products, services and/or websites that are not affiliated with us. We have no control over the products, services or websites of these third parties and we do not guarantee or take responsibility for them. Our website may also contain advertising from third parties and we are not responsible for any misleading or inaccurate advertisements which are the sole responsibility of the advertiser. Any links or advertisements on our website should not be taken as an endorsement by us of any kind. Furthermore, our website contains data provided by third parties and we accept no responsibility for any inaccuracies in this material. You agree to release us from any claims or disputes of any kind arising from or in any way connected to such disputes with third parties.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Disclaimer
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            The Services are provided on an 'as is' and 'as available' basis and we make no representations or warranties of any kind, either express or implied. You expressly agree that your use of our website and the Services is at your sole risk and we expressly disclaim any and all warranties, either express or implied, including without limitation warranties as to quality, suitability for any purpose, compatibility, reliability, accuracy, completeness, timeliness, access or use. We accept no responsibility and make no guarantee that the Services will be free from faults, errors and/or omissions. It is your sole responsibility to evaluate the quality, suitability, accuracy, completeness and reliability of the Services or any information provided.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            The value estimates provided on our website are intended for general interest and information purposes only and should not be relied upon for any commercial transaction or similar use. These estimates are based on a) publicly available information which may be inaccurate or incomplete and b) typical properties in certain locations. They will not take account of any factors which are unknown to us and should therefore only be used as a starting guide to help determine what a home might be worth. None of the Services are intended to be a substitute for independent professional advice and users are recommended to seek advice from suitably qualified professionals such as surveyors and solicitors if relevant to their particular circumstances. We shall not be liable for any losses suffered as a result of relying on our value estimates.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose'>
                            Property descriptions and other information provided on our website are intended for information and marketing purposes and, whilst displayed in good faith, we will not in any circumstances accept responsibility for their accuracy. It is the responsibility of buyers to satisfy themselves as to the accuracy of any property descriptions and the responsibility of agents to ensure the accuracy of any descriptions provided.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Limitation Of Liability
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            In no event shall we nor any of our officers, shareholders, directors, employees, agents or suppliers be liable for any loss or direct, indirect, consequential, incidental, special or any other damages arising from your use of the Services. Should you not agree with any part of these Terms of Use or have any dispute or claim against us or our suppliers with respect to these Terms of Use or the Services, your sole and exclusive remedy will be to discontinue using the Services.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Indemnification
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            You agree to indemnify, defend and hold us and our affiliated companies, shareholders, officers, directors, employees, agents or suppliers harmless from any and all claims or demands, made by any third party due to or arising out of your use of the Services, the violation of these Terms of Use by you, or the infringement by you of any intellectual property or other right of any other person or entity.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Changes To Terms Of Use
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            We reserve the right in our sole discretion to change these Terms of Use at any time without prior notice to you. Any changes will be posted on our website and become effective at the time of posting. Your continued use of the Services after the effective date of such changes will constitute acceptance of and agreement to any such changes. We reserve the right to modify, suspend or discontinue all or part of the Services at any time to you and/or others, with or without notice. We shall not be liable to you or any other party should we exercise our right to modify, suspend or discontinue all or part of the Services.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            Applicable Law
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            These Terms of Use shall be governed by and construed in accordance with Nigerian law and the parties agree that any disputes will be settled in Nigerian courts. Should any provision of these Terms of Use be determined to be invalid or unenforceable by any court having competent jurisdiction, then the invalid or unenforceable provision will be replaced with a provision that reflects the intent of the original provision, to the extent permitted by applicable law and all other provisions of these Terms of Use shall remain in full force and effect.
                        </p>
                    </div>
                    <div>
                        <label className='text-[20px] font-[700] text-BlueHomz2'>
                            General
                        </label>
                        <p className='text-[18px] font-[400] leading-loose'>
                            The headings in these Terms of Use are solely used for convenience and have no legal or contractual significance. We may assign this Agreement, in whole or in part, at any time without notice to you and upon such assignment will be relieved of any further obligation under these Terms of Use. You may not assign, transfer or sublicense your rights, if any, under these Terms of Use. Our delay or failure to exercise or enforce any right or provision of these Terms of Use with respect to a breach by you or others shall not constitute or be construed as a waiver of such right to act. We shall not be responsible for any breach of these Terms of Use caused by circumstances beyond our control.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose mt-2'>
                            These Terms of Use together with the Privacy Policy constitute the entire agreement between you and us with respect to the Services and supersede any and all prior agreements and understandings between you and us.
                        </p>
                        <p className='text-[18px] font-[400] leading-loose mt-2'>
                            If you have any questions or comments about our Terms of Use, please Contact us.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TermsAndConditions;