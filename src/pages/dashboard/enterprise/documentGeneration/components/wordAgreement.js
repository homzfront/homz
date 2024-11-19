import { AlignmentType, Document, Paragraph, TextRun, Packer } from "docx";
import formatDate from "@/utils/formatDate";
import addCommasToNumberWithoutN from "@/utils/addCommasToNumberWithoutN";
import extractCurrencySymbol from "@/utils/extractCurrencySymbol";

export const handleDownloadAgreementDocx = (formData) => {
    const doc = new Document({
        sections: [
            {
                children: [
                    // Tenancy Agreement Title
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Tenancy Agreement",
                                font: "Times New Roman",
                                size: 36,
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    // Between Landlord and Tenant
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Between",
                                font: "Times New Roman",
                                size: 36,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: formData?.landlordName || "",
                                font: "Times New Roman",
                                size: 36,
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "And",
                                font: "Times New Roman",
                                size: 36,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: formData?.tenantName || "",
                                font: "Times New Roman",
                                size: 36,
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    // Property Description
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "In Respect Of All That",
                                font: "Times New Roman",
                                size: 20,
                            }),
                        ],
                    }),

                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${formData?.propDesc ? [formData?.propDesc] : ""}`,
                                font: "Times New Roman",
                                size: 20,
                            }),
                        ],
                    }),
                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({}),
                    // Agreement Details
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "This Tenancy Agreement is made on ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.agreementDate ? formatDate(formData?.agreementDate) : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "BETWEEN",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${formData?.landlordName ? formData?.landlordName : ""}, `,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: "of ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.landlordAddress ? formData?.landlordAddress : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", (Hereinafter referred to as \"THE LANDLORD\" which expression shall where the context so admits include his heir(s), executors, administrators and assigns) of the one part.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "AND",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${formData?.tenantName ? formData?.tenantName : ""}, `,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: "of ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.tenantAddress ? formData?.tenantAddress : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", (Hereinafter referred to as \"THE TENANT\" which expression shall where the context so admits include his heirs and successor in title) of the other part.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "The Landlord and the tenant are together hereinafter referred to as the \"Parties\" and individually as a ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "\"Party\"",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ".",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "WHEREAS",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "1. The Landlord is a beneficial owner of the property situate at ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.propAddress ? formData?.propAddress : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", herein regarded as ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "\"The Demised Premises\".",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "2. The Landlord has agreed to rent out all the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.propDesc ? formData?.propDesc : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " with all appurtenances to the Tenant and the tenant has agreed to take same.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "3. The Parties have agreed to enter into this Tenancy Agreement on (a) the foregoing basis and subject to the terms and conditions hereinafter set out.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "IN CONSIDERATION",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " of their mutual promises, assurances, guarantees and undertakings, the Parties agree as follows:",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "1. TERM",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "1.1. In pursuance of the agreement recited above and in consideration of the rent herein reserved and of the covenants stated herein to be observed by the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "Landlord",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " hereby grants unto the tenant,",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "all of the",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " Demised Premises ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "together with",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " all rights of way and easements necessary for the full enjoyment of the Demised Premises and together with all fittings, fixtures and appurtenances attached and or appropriated thereto, ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "to hold",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " the same unto the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " for a term of One (1) year certain. Hence, the tenancy hereby commences on the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.tenancyStartDate ? formatDate(formData?.tenancyStartDate) : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " and would terminate on the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.tenancyEndDate ? formatDate(formData?.tenancyEndDate) : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "1.2 Where the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " has not breached any of its covenants and obligations herein specified or any other term of this Agreement the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "Landlord",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " may, upon the written request of the tenant made at least three (3) months before the expiration of the term hereby created, grant to the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " a further term on such terms and conditions and at such rent as the Parties may at the time agree. In the absence of such request, and subject to Clauses 1.3 and 3.3 below, the tenancy hereby created shall determine at the expiration of the term indicated in Clause 1.1 above, without any obligation on the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "Landlord",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " to issue a Notice to Quit or causing same to be issued.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "1.3 Notwithstanding the term indicated in Clause 1.1 above, either Party may, at any time during the term hereby granted, terminate this Agreement upon giving three (3) months notice in writing to the other Party of its intention to terminate same, but such termination shall be without prejudice to the accrued rights and obligations of the Parties up to the date of the termination.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "2. CONSIDERATION",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "2.1 In consideration for the grant by the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "Landlord",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", of a tenancy in respect of the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "Demised Premises",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " for the term reserved herein, the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " shall pay to the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "Landlord",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", upon execution of this agreement the sum of ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: `${formData?.rentPaymentInWords ? formData?.rentPaymentInWords : ""}, `,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: `(${extractCurrencySymbol(formData?.selectedCurrency) !== null ? extractCurrencySymbol(formData?.selectedCurrency) : ""} ${formData?.rentPayment ? addCommasToNumberWithoutN(formData?.rentPayment) : ""})`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " per annum (g) net of all taxes, levies, all fully paid in advance, the receipt whereof the Landlord hereby acknowledges.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "In addition to the rent reserved in 2.1 above, the lessee shall pay other fees as applicable and speculated in the preceding offer letter as duly acknowledged.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "3. TENANT’S COVENANTS",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "3.1 The ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: ", for itself and its heirs and successor-in-title, covenants with the Landlord as follows: ",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(a) To pay the rent, Fees and other charges reserved herein at the time and in manner provided in Clause 2.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(b) To pay all electricity, water, and other utility bills as well as the service Charge as apportioned by the Estates/neighbourhood association/committee in respect of power, water, utilities and security charges consumed within the Demised Premises during the subsistence of the tenancy, as well as any other rates charged in respect of its occupation of the Demised Premises.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(c) To keep the interior of the Demised Premises and all the fixtures and fittings thereon in good and tenantable repair and condition as they were at the commencement of this tenancy.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(d) To put the Demised Premises in a state suitable for its use which shall be “Residential Purpose Only” and not to make or permit to be made any structural alteration or addition to the Demised Premises or any part thereof without the prior written consent of the landlord (such consent not to be unreasonably withheld or delayed).",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(e) To permit the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " and its agents, servants or workmen and or any person duly authorised by it, at all reasonable times of the day, to enter upon and inspect the state and condition of the Demised Premises and forthwith, to execute and effect any repairs or work for which the Landlord is liable under the Landlord’s covenants herein; provided that the Landlord shall give the ",
                                font: "Times New Roman",
                            }),
                            new TextRun({
                                text: "tenant",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " at least 48 hours notice in writing in this regard, except in a case of an emergency.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(f) Not to assign, sublet or part with the possession of the Demised Premises or any part thereof, without the prior written consent of the Landlord (such consent not to be unreasonably withheld or delayed in the case of a responsible person).",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(g) Not to do or permit to be done in the Demised Premises, any act or thing which may constitute a nuisance or disturbance to the Landlord or any adjoining or neighbouring premises.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(h) Not to install on the Demised Premises, any part thereof or any other part of the Property any masts or other similar gadgets or equipment without the Landlord’s consent in writing (such consent not to be unreasonably withheld or delayed).",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(i) Not to use the Demised Premises or any part thereof for any illegal, immoral or unauthorised purpose.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(j) Not to store or bring upon the Demised Premises, any part thereof and or upon any other part of the Property, any article of a combustible material, car parts, mechanical instrument or machinery or inflammable dangerous substance or material.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(k) To indemnify the Landlord in full for losses, claims and or damages suffered by the Landlord which are attributable to the tenant’s non-performance or non-compliance with its covenants herein.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(l) At the expiration or sooner determination of the term hereby created, the tenant shall yield up to the Landlord, the Demised Premises with all the Landlord’s original fixtures and fittings and any additions thereto (except the tenant’s fixtures and fittings) in such repair and tenantable condition as shall be in accordance with the due observance of the covenants hereinabove contained, fair wear and tear to the Demised Premises being exempted.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(m) If the tenant shall fail to pay the rent, bills or any other sum due under the lease within twenty-one (21) days of the date due whether formally demanded or not the tenant shall pay to the Landlord interest at the prevailing commercial rate on any due rents or other sums, from the date when the payments were due to the date on which they are paid. For the avoidance of doubt, the accrual of interests on any sums due under the tenancy shall not in any way prevent the Landlord from",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "terminating the tenancy for breach of express or implied covenants.",
                                font: "Times New Roman",
                                indent: {
                                    firstLine: 360, // 0.5 inches
                                },
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "3.2 The covenants and obligations contained herein shall subsist throughout the term hereby created.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "3.3 If any covenant on the part of the tenant herein contained is not performed or observed and the tenant has continued to neglect and or refuse to perform and observe same fourteen (14) days after receiving a written notice from the Landlord requesting that such covenant be performed or observed, the Landlord shall have the right to, at any time thereafter, re-enter the Demised Premises and thereupon this tenancy shall absolutely determine but without prejudice to the right of action of the Landlord in respect of any antecedent breach of any of the covenants by the tenancy.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "4 LANDLORD’S COVENANTS",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "4.1 The Landlord hereby covenants with the tenant as follows:",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "4.1.1 That upon the tenant paying the rent, Fees and other charges reserved herein for the account of the tenant, and performing its covenants stipulated herein, the tenant shall upon commencement of the tenancy peaceably hold and exclusively enjoy the Demised Premises during the term hereby granted without any interruption by the Landlord or any person rightfully claiming through the Landlord.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "4.1.2 That subject as otherwise provided in this Agreement, the tenant may affix its own fittings upon the Demised Premises and remove same at the determination of the term hereby created, provided that upon such removal the tenant will restore the Premises to its original state prior to the installation of such fittings.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "4.2",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " If the Landlord fails or neglects to perform or observe its covenant to promptly effect structural repairs to the Demised Premises, the tenant shall be at liberty to effect such structural repairs thirty (30) days after the tenant has given to the Landlord, a notice to perform or observe",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "that covenant. The Landlord shall reimburse the tenant for the actual and verifiable costs of effecting such repairs; provided that the tenant shall furnish receipts or invoices evidencing the costs incurred.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "5. NOTICES",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "All notices required to be given pursuant to this Agreement shall be in writing and will be hand-delivered (a) if to the landlord, at the address of its home residence indicated herein, or the office of the managing agent of the Demised Premises; and (b) if to the tenant, at the Demised Premises or its registered office address.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "6. VARIATION",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),


                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "It is expressly and unequivocally agreed that the terms of this Agreement shall not be varied, altered and or modified, except with the mutual written consent of the Parties.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "7. SEVERABILITY",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "It is agreed and understood that if any provision of this Agreement becomes illegal, invalid or unenforceable in any respect, the legality, validity and enforceability of the other provisions of this Agreement shall not in any way be affected or impaired.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "8. ENTIRE AGREEMENT",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "It is further expressly agreed and understood that this Agreement constitutes the entire agreement between the Parties regarding the tenancy relationship hereby created. It supersedes all prior agreements between the Parties in respect of the terms herein contained.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "9. GOVERNING LAW",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "This Agreement shall be governed and construed in all respects in accordance with the laws of Lagos State of Nigeria, and the Magistrate Court of Lagos State shall have exclusive jurisdiction over all disputes arising between the Parties, in connection with this Agreement.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "IN WITNESS WHEREOF",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " the Parties hereto have caused their respective common seals to be affixed hereunto the day and year first above written.",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "SIGNED SEALED AND DELIVERED",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "BY THE SAID LANDLORD",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${formData?.landlordName ? formData?.landlordName : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "In the presence of:",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "NAME:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ADDRESS:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "OCCUPATION:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "SIGNATURE:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "SIGNED SEALED AND DELIVERED",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "BY THE SAID TENANT",
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${formData?.tenantName ? formData?.tenantName : ""}`,
                                font: "Times New Roman",
                                bold: true,
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "In the presence of:",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "NAME:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ADDRESS:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "OCCUPATION:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),

                    // Add vertical spacing
                    new Paragraph({}),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "SIGNATURE:",
                                font: "Times New Roman",
                                bold: true,
                            }),
                            new TextRun({
                                text: " _____________________________________",
                                font: "Times New Roman",
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
    // Generate the document as a Blob
    Packer.toBlob(doc).then((blob) => {
        // Create a download link and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "QuitNotice.docx";
        link.click();
        window.URL.revokeObjectURL(url);
    });
};
