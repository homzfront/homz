import useAgreementFormStore from '@/store/document/useAgreementFormStore';
import React from 'react'
import PrintablePreviewedData from './printablePreviewedData';
import formatDate from '@/utils/formatDate';
import extractCurrencySymbol from '@/utils/extractCurrencySymbol';
import addCommasToNumberWithoutN from '@/utils/addCommasToNumberWithoutN';

const PreviewedData = ({ printableRef }) => {
    const { formData } = useAgreementFormStore();
    return (
        <div className='flex flex-col gap-2 mb-[60px]'>
            <div className='h-[600px] md:h-[750px] bg-white flex justify-center items-center'>
                <div className='flex flex-col gap-4 items-center justify-center w-full md:w-auto px-4 md:px-0'>
                    <h1 className='text-[20px] font-[700] text-black'>
                        Tenancy Agreement
                    </h1>
                    <p className='text-[18px] font-[500] text-black'>
                        Between
                    </p>
                    <div className='h-[50px] bg-inputBg w-full md:w-[480px] text-[18px] font-[500] text-BlackHomz flex justify-center items-center rounded-[4px]'>
                        {formData?.landlordName ? formData?.landlordName : ""}
                    </div>
                    <p className='text-[18px] font-[500] text-black'>
                        And
                    </p>
                    <div className='h-[50px] bg-inputBg w-full md:w-[480px] text-[18px] font-[500] text-BlackHomz flex justify-center items-center rounded-[4px]'>
                        {formData?.tenantName ? formData?.tenantName : ""}
                    </div>
                    <div className='w-full md:w-auto'>
                        <p className='text-[14px] font-[500] text-BlackHomz'>
                            In Respect Of All That
                        </p>
                        <div className='h-[65px] rounded-[4px] border w-full md:w-[480px] text-[13px] font-[400] text-GrayHomz p-2'>
                            {formData?.propDesc ? formData?.propDesc : ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[1300px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify justify-between p-4'>
                <p>This Tenancy Agreement is made on <span className='font-[600]'>{formData?.agreementDate ? formatDate(formData?.agreementDate) : ""}</span></p>

                <span>BETWEEN</span>

                <p><span className='text-BlueHomz font-[600]'>{formData?.landlordName ? formData?.landlordName : ""}</span>, of <span className='text-BlueHomz font-[600]'>{formData?.landlordAddress ? formData?.landlordAddress : ""}</span>, (Hereinafter referred to as "THE LANDLORD" which expression shall where the context so admits include his heir(s), executors, administrators and assigns) of the one part.</p>

                <p>AND</p>

                <p><span className='text-BlueHomz font-[600]'>{formData?.tenantName ? formData?.tenantName : ""}</span>, of <span className='text-BlueHomz font-[600]'>{formData?.tenantAddress ? formData?.tenantAddress : ""} </span>, (Hereinafter referred to as "THE TENANT" which expression shall where the context so admits include his heirs and successor in title) of the other part.</p>

                <p>The Landlord and the tenant are together hereinafter referred to as the "Parties" and individually as a <span className='font-[600]'>"Party”</span>.</p>
                <p>WHEREAS</p>
                <div>
                    <p>1. The Landlord is a beneficial owner of the property situate at  <span className='font-[600] text-BlueHomz'>{formData?.propAddress ? formData?.propAddress : ""} </span>, herein regarded as  <span className='font-[600]'>“The Demised Premises”</span>.</p>
                    <p>2. The Landlord has agreed to rent out all the  <span className='font-[600] text-BlueHomz'> {formData?.propDesc ? formData?.propDesc : ""}</span> with all appurtenances to the Tenant and the tenant has agreed to take same.</p>
                    <p>3. The Parties have agreed to enter into this Tenancy Agreement on(a) the foregoing basis and subject to the terms and conditions hereinafter set out.</p>
                </div>
                <p><span className='font-[600]'>IN CONSIDERATION</span> of their mutual promises, assurances, guarantees and undertakings, the Parties agree as follows:</p>

                <span className='font-[600]'>1. TERM</span>
                <p> 1.1	In pursuance of the agreement recited above and in consideration of the rent herein reserved and of the covenants stated herein to be observed by the <span className='font-[600]'>tenant</span>, the <span className='font-[600]'>Landlord</span> hereby grants unto the tenant,</p>
            </div>
            <div className='h-[1300px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify justify-between p-4'>
                <p><span className='font-[600]'>all of the</span> Demised Premises  <span className='font-[600]'>together with</span> all rights of way and easements necessary for the full enjoyment of the Demised Premises and together with all fittings, fixtures and appurtenances attached and or appropriated thereto, <span className='font-[600]'>to hold</span> the same unto the <span className='font-[600]'>tenant</span> for a term of One (1) year certain. Hence, the tenancy hereby commences on the <span className='text-BlueHomz font-[600]'>{formData?.tenancyStartDate ? formatDate(formData?.tenancyStartDate) : ""} </span > and would terminate on the <span className='text-BlueHomz font-[600]'>{formData?.tenancyEndDate ? formatDate(formData?.tenancyEndDate) : ""} </span>.</p>

                <p>1.2 Where the <span className='font-[600]'>tenant</span> has not breached any of its covenants and obligations herein specified or any other term of this Agreement the <span className='font-[600]'>Landlord</span> may, upon the written request of the tenant made at least three (3) months before the expiration of the term hereby created, grant to the <span className='font-[600]'>tenant</span> a further term on such terms and conditions and at such rent as the Parties may at the time agree.  In the absence of such request, and subject to Clauses 1.3 and 3.3 below, the tenancy hereby created shall determine at the expiration of the term indicated in Clause 1.1 above, without any obligation on the <span className='font-[600]'>Landlord</span> to issue a Notice to Quit or causing same to be issued.</p>

                <p>1.3	Notwithstanding the term indicated in Clause 1.1 above, either Party may, at any time during the term hereby granted, terminate this Agreement upon giving three (3) months notice in writing to the other Party of its intention to terminate same, but such termination shall be without prejudice to the accrued rights and obligations of the Parties up to the date of the termination.</p>

                <p className='font-[600]'>2.	CONSIDERATION</p>

                <p>2.1	In consideration for the grant by the <span className='font-[600]'>Landlord</span>, of a tenancy in respect of the <span className='font-[600]'>Demised Premises</span> for the term reserved herein, the <span className='font-[600]'>tenant</span> shall pay to the <span className='font-[600]'>Landlord</span>, upon execution of this agreement the sum of <span className='font-[600] text-BlueHomz'>{formData?.rentPaymentInWords ? formData?.rentPaymentInWords : "[Rent Paid(in words)]"}, ( {formData?.selectedCurrency ? extractCurrencySymbol(formData?.selectedCurrency) : ""} {formData?.rentPayment ? addCommasToNumberWithoutN(formData?.rentPayment) : ""})</span> per annum (g) net of all taxes, levies, all fully paid in advance, the receipt whereof the Landlord hereby acknowledges.</p>

                <p>In addition to the rent reserved in 2.1 above, the lessee shall pay other fees as applicable and speculated in the preceding offer letter as dully acknowledged.</p>

                <p className='font-[600]'>3. 	TENANT’S COVENANTS</p>

            </div>
            <div className='h-[1300px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify justify-between p-4'>
                <p>3.1 The <span className='font-[600]'>tenant</span>, for itself and its heirs and successor-in-title, covenants with the Landlord as follows: </p>
                <p>(a) To pay the rent, Fees and other charges reserved herein at the time and in manner provided in Clause 2. </p>
                <p>(b) To pay all electricity, water, and other utility bills as well as the service Charge as apportioned by the
                    Estates/neighbourhood  association/committee in respect of power, water, utilities and security charges consumed within the Demised
                    Premises during the subsistence of the tenancy, as well as any other rates charged in respect of its occupation of the Demised Premises. </p>
                <p>(c) To keep the interior of the Demised Premises and all the fixtures and fittings thereon in good and tenantable repair and condition as
                    they were at the commencement of this tenancy. </p>
                <p>(d) To put the Demised Premises in a state suitable for its use which shall be “Residential Purpose Only” and not to make or permit to be made
                    any structural alteration or addition to the Demised Premises or any part thereof without the prior written consent of the landlord (such consent
                    not to be unreasonably withheld or delayed).  </p>
                <p>(e) To permit the tenant and its agents, servants or workmen and or any person duly authorised by it, at all reasonable times of the day,
                    to enter upon and inspect the state and condition of the Demised Premises and forthwith, to execute and effect any repairs or work for which the
                    Landlord is liable under the Landlord’s covenants herein; provided that the Landlord shall give the <span className='font-[600]'>tenant</span> at least 48 hours notice in writing in this regard,
                    except in a case of an emergency. </p>
                <p>(f) Not to assign, sublet or part with the possession of the Demised Premises or any part thereof, without the prior written
                    consent of the Landlord (such consent not to be unreasonably withheld or delayed in the case of a responsible person).</p>
            </div>
            <div className='h-[1300px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify justify-between p-4'>
                <p>(g) Not to do or permit to be done in the Demised Premises, any act or thing which may constitute a nuisance or disturbance to the
                    Landlord or any adjoining or neighbouring premises. </p>
                <p>(h) Not to install on the Demised Premises, any part thereof or any other part of the Property
                    any masts or other similar gadgets or equipment without the Landlord’s consent in writing (such consent not to be unreasonably withheld or delayed).</p>
                <p>(i) Not to use the Demised Premises or any part thereof for any illegal, immoral or unauthorised purpose.</p>
                <p>(j) Not to store or bring upon the Demised Premises, any part thereof and or upon any other part of the Property, any article of a combustible material,
                    car parts, mechanical instrument or machinery or inflammable dangerous substance or material.</p>
                <p>(k) To indemnify the Landlord in full for losses, claims and or damages suffered by the Landlord which are attributable to the tenant’s non-performance or non-compliance with its covenants herein.</p>
                <p>(l) At the expiration or sooner determination of the term hereby created, the tenant shall yield up to the Landlord, the Demised Premises with all the Landlord’s original fixtures
                    and fittings and any additions thereto (except the tenant’s fixtures and fittings) in such repair and tenantable condition as shall be in accordance with the due observance
                    of the covenants hereinabove contained, fair wear and tear to the Demised Premises being exempted.</p>
                <p>(m) If the tenant shall fail to pay the rent, bills or any other sum due under the lease within twenty-one (21) days of the date due whether formally demanded or not the tenant
                    shall pay to the Landlord interest at the prevailing commercial rate on any due rents or other sums, from the date when the payments were due to the date on which they are paid. For the avoidance of doubt,
                    the accrual of interests on any sums due under the tenancy shall not in any way prevent the Landlord from</p>
            </div>
            <div className='h-[1300px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify justify-between p-4'>
                <p className='ml-6'>terminating the tenancy for breach of express or implied covenants.</p>
                <p>3.2 The covenants and obligations contained herein shall subsist throughout the term hereby created.</p>
                <p>3.3 If any covenant on the part of the tenant herein contained is not performed or observed and the tenant has continued to neglect and or refuse to perform and observe same fourteen (14) days after
                    receiving a written notice from the Landlord requesting that such covenant be performed or observed, the Landlord shall have the right to, at any time thereafter,
                    re-enter the Demised Premises and thereupon this tenancy shall absolutely determine but without prejudice to the right of action of the Landlord in respect of any antecedent breach of any of the covenants by the tenancy.</p>
                <p className='font-[600] mt-2'>4 LANDLORD’S COVENANTS</p>
                <p><span className='font-[600]'>4.1</span> The Landlord hereby covenants with the tenant as follows:</p>
                <p>4.1.1 That upon the tenant paying the rent, Fees and other charges reserved herein for the account of the tenant, and performing its covenants stipulated herein, the tenant shall upon
                    commencement of the tenancy peaceably hold and exclusively enjoy the Demised Premises during the term hereby granted without any interruption by the Landlord or any person rightfully claiming through the Landlord.</p>
                <p>4.1.2 That subject as otherwise provided in this Agreement, the tenant may affix its own fittings upon the Demised Premises and remove same at the determination of the term hereby created, provided that upon such removal
                    the tenant will restore the Premises to its original state prior to the installation of such fittings.</p>
                <p><span className='font-[600]'>4.2</span> If the Landlord fails or neglects to perform or observe its covenant to promptly effect structural repairs to the Demised Premises, the tenant shall be at liberty to effect such structural repairs thirty (30) days after
                    the tenant has given to the Landlord, a notice to perform or observe</p>
            </div>
            <div className='h-[1300px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify justify-between p-4'>
                <p>that covenant. The Landlord shall reimburse the tenant for the actual and verifiable costs of effecting such repairs; provided that the tenant shall furnish receipts or invoices evidencing the costs incurred. </p>
                <p className='font-[600] pt-1'>5. NOTICES </p>
                <p>All notices required to be given pursuant to this Agreement shall be in writing and will be hand-delivered (a) if to the landlord, at the address of its home residence
                    indicated herein, or the office of the managing agent of the Demised Premises; and (b) if to the tenant, at the Demised Premises or its registered office address.  </p>
                <p className='font-[600] pt-1'>6. VARIATION </p>
                <p>It is expressly and unequivocally agreed that the terms of this Agreement shall not be varied, altered and or modified, except with the mutual written consent of the Parties. </p>
                <p className='font-[600] pt-1'>7. SEVERABILITY </p>
                <p>It is agreed and understood that if any provision of this Agreement becomes illegal, invalid or unenforceable in any respect, the legality, validity and enforceability of the
                    other provisions of this Agreement shall not in any way be affected or impaired. </p>
                <p className='font-[600] pt-1'>8. ENTIRE AGREEMENT  </p>
                <p>It is further expressly agreed and understood that this Agreement constitutes the entire agreement between the Parties regarding the tenancy relationship hereby created.
                    It supersedes all prior agreements between the Parties in respect of the terms herein contained. </p>
                <p className='font-[600] pt-1'>9. GOVERNING </p>
                <p>LAW This Agreement shall be governed and construed in all respects in accordance with the laws of Lagos State of Nigeria, and the Magistrate Court of Lagos State shall have exclusive
                    jurisdiction over all disputes arising between the Parties, in connection with this Agreement.</p>
            </div>
            <div className='h-[600px] md:h-[750px] bg-white flex flex-col text-[13px] font-[400] text-BlackHomz text-justify gap-6 p-4'>
                <p><span className='font-[600]'>IN WITNESS WHEREOF</span> the Parties hereto have caused their respective common seals to be affixed hereunto the day and year first above written.</p>
                <div>
                    <p className='font-[600]'>SIGNED SEALED AND DELIVERED</p>
                    <p className='font-[600]'>BY THE SAID LANDLORD</p>
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-[600]'>{formData?.landlordName ? formData?.landlordName : ""}</p>
                    <p> In the presence of:</p>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>NAME:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>ADDRESS:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>OCCUPATION:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>SIGNATURE:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                </div>
                <div>
                    <p className='font-[600]'>SIGNED SEALED AND DELIVERED</p>
                    <p className='font-[600]'>BY THE SAID TENANT</p>
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-[600]'>{formData?.tenantName ? formData?.tenantName : ""}</p>
                    <p>In the presence of:</p>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>NAME:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>ADDRESS:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>OCCUPATION:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                    <div className='flex gap-2 md:gap-4'><span className='w-[50%] md:w-[20%]'>SIGNATURE:</span> <span className='md:hidden'>_________________</span><span className='hidden md:block'>_____________________________________</span></div>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <PrintablePreviewedData
                    printableRef={printableRef}
                    formData={formData}
                />
            </div>
        </div>
    )
}

export default PreviewedData