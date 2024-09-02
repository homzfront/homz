import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define the styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: '48px',
  },
  section: {
    margin: '48px 0',
    padding: '10px',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    padding: 10,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: '#202020',
    // #F6F6F6
    borderRadius: 4,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '600',
    color: '#FCF3EB',
  },
  error: {
    fontWeight: '600',
    color: '#D92D20',
  },
  blue: {
    fontWeight: '600',
    color: '#006AFF',
  },
});

// Define the PDF document component
const SavedPreviewedData = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Tenancy Agreement</Text>
        <Text style={styles.subtitle}>Between</Text>
        <View style={styles.textInput}>
          <Text>{formData.landlordName || "[Landlord’s Name]"}</Text>
        </View>
        <Text style={styles.subtitle}>And</Text>
        <View style={styles.textInput}>
          <Text>{formData.tenantName || "[Tenant’s Name]"}</Text>
        </View>
        <Text style={styles.text}>In Respect Of All That</Text>
        <View style={styles.textInput}>
          <Text>{formData.propDesc || "[Property Description]"}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          This Tenancy Agreement is made on <Text style={styles.bold}>{formData.agreementDate || "[Document Preparation Date]"}</Text>
        </Text>
        <Text style={styles.bold}>BETWEEN</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.error}>{formData.landlordName || "[Landlord’s Name]"}</Text>, of <Text style={styles.error}>{formData.landlordAddress || "[Landlord’s Address]"}</Text>, (Hereinafter referred to as "THE LANDLORD" which expression shall where the context so admits include his heir(s), executors, administrators and assigns) of the one part.
        </Text>
        <Text style={styles.bold}>AND</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.blue}>{formData.tenantName || "[Tenant’s Name]"}</Text>, of <Text style={styles.blue}>{formData.tenantAddress || "[Tenant’s Address]"}</Text>, (Hereinafter referred to as "THE TENANT" which expression shall where the context so admits include his heirs and successor in title) of the other part.
        </Text>
        <Text style={styles.paragraph}>
          The Landlord and the tenant are together hereinafter referred to as the "Parties" and individually as a <Text style={styles.bold}>"Party”</Text>.
        </Text>
        <Text style={styles.bold}>WHEREAS</Text>
        <Text style={styles.paragraph}>
          1. The Landlord is a beneficial owner of the property situate at <Text style={styles.highlight}>{formData.propAddress || "[Property Address]"}</Text>, herein regarded as <Text style={styles.bold}>“The Demised Premises”</Text>.
        </Text>
        <Text style={styles.paragraph}>
          2. The Landlord has agreed to rent out all the <Text style={styles.highlight}>{formData.propDesc || "[Property Description]"}</Text> with all appurtenances to the Tenant and the tenant has agreed to take same.
        </Text>
        <Text style={styles.paragraph}>
          3. The Parties have agreed to enter into this Tenancy Agreement on the foregoing basis and subject to the terms and conditions hereinafter set out.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>IN CONSIDERATION</Text> of their mutual promises, assurances, guarantees and undertakings, the Parties agree as follows:
        </Text>
        <Text style={styles.bold}>1. TERM</Text>
        <Text style={styles.paragraph}>
          1.1 In pursuance of the agreement recited above and in consideration of the rent herein reserved and of the covenants stated herein to be observed by the <Text style={styles.bold}>tenant</Text>, the <Text style={styles.bold}>Landlord</Text> hereby grants unto the tenant,
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>all of the</Text> Demised Premises together with all rights of way and easements necessary for the full enjoyment of the Demised Premises and together with all fittings, fixtures, and appurtenances attached and or appropriated thereto, <Text style={styles.bold}>to hold</Text> the same unto the <Text style={styles.bold}>tenant</Text> for a term of One (1) year certain. Hence, the tenancy hereby commences on the <Text style={styles.highlight}>{formData.tenancyStartDate || "[Tenancy Commencement Date]"}</Text> and would terminate on the <Text style={styles.error}>{formData.tenancyEndDate || "[Tenancy Ending Date]"}</Text>.
        </Text>
        <Text style={styles.paragraph}>
          1.2 Where the <Text style={styles.bold}>tenant</Text> has not breached any of its covenants and obligations herein specified or any other term of this Agreement the <Text style={styles.bold}>Landlord</Text> may, upon the written request of the tenant made at least three (3) months before the expiration of the term hereby created, grant to the <Text style={styles.bold}>tenant</Text> a further term on such terms and conditions and at such rent as the Parties may at the time agree. In the absence of such request, and subject to Clauses 1.3 and 3.3 below, the tenancy hereby created shall determine at the expiration of the term indicated in Clause 1.1 above, without any obligation on the <Text style={styles.bold}>Landlord</Text> to issue a Notice to Quit or causing same to be issued.
        </Text>
        <Text style={styles.paragraph}>
          1.3 Notwithstanding the term indicated in Clause 1.1 above, either Party may, at any time during the term hereby granted, terminate this Agreement upon giving three (3) months notice in writing to the other Party of its intention to terminate same, but such termination shall be without prejudice to the accrued rights and obligations of the Parties up to the date of the termination.
        </Text>
        <Text style={styles.bold}>2. CONSIDERATION</Text>
        <Text style={styles.paragraph}>
          2.1 In consideration for the grant by the <Text style={styles.bold}>Landlord</Text>, of a tenancy in respect of the <Text style={styles.bold}>Demised Premises</Text> for the term reserved herein, the <Text style={styles.bold}>tenant</Text> shall pay to the <Text style={styles.bold}>Landlord</Text>, upon execution of this agreement the sum of <Text style={styles.highlight}>{formData.rentPaymentInWords || "[Rent Paid(in words)]"}, ({formData.rentPayment || "[Rent Paid (₦)]"} {formData.selectedCurrency || ""})</Text> per annum net of all taxes, levies, all fully paid in advance, the receipt whereof the Landlord hereby acknowledges.
        </Text>
        <Text style={styles.paragraph}>
          In addition to the rent reserved in 2.1 above, the lessee shall pay other fees as applicable and speculated in the preceding offer letter as duly acknowledged.
        </Text>
        <Text style={styles.bold}>3. TENANT’S COVENANTS</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          3.1 The <Text style={styles.bold}>tenant</Text>, for itself and its heirs and successor-in-title, covenants with the Landlord as follows:
        </Text>
        <Text style={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp; 3.1.1 To pay the rent reserved in Clause 2.1 of this Agreement on the due date and in the manner herein provided;</Text>
        <Text style={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp; 3.1.2 To use the <Text style={styles.bold}>Demised Premises</Text> only for residential purposes;</Text>
        <Text style={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp; 3.1.3 Not to assign, underlet, sublet, or part with possession of the Demised Premises or any part thereof without the previous consent in writing of the <Text style={styles.bold}>Landlord</Text>;</Text>
        <Text style={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp; 3.1.4 To keep the interior of the Demised Premises including all floors, ceilings, windows, and doors, in good and tenantable repair and condition, to repaint the premises from time to time and to yield up the same at the expiration or determination of this tenancy in such good and tenantable repair and condition.</Text>
        <Text style={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp; 3.1.5 To permit the Landlord and its agents to enter upon the Demised Premises to view the state of repair and condition thereof upon prior notice given to the tenant in writing; and</Text>
        <Text style={styles.paragraph}>&nbsp;&nbsp;&nbsp;&nbsp; 3.1.6 Not to do or permit any act, deed or thing on the Demised Premises which may constitute a nuisance to other adjoining or neighboring premises.</Text>
      </View>
    </Page>
  </Document>
);

export default SavedPreviewedData;
