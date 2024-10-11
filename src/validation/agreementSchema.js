import { z } from 'zod';

const agreementSchema = z.object({
  propDesc: z.string().nonempty("Property description is required"),
  propAddress: z.string().nonempty("Property address is required"),
  landlordName: z.string().nonempty("Landlord’s name is required"),
  landlordAddress: z.string().nonempty("Landlord’s address is required"),
  tenantName: z.string().nonempty("Tenant’s name is required"),
  tenantAddress: z.string().nonempty("Tenant’s address is required"),
  tenancyStartDate: z.string().nonempty("Tenancy commencement date is required"),
  tenancyEndDate: z.string().nonempty("Tenancy ending date is required"),
  rentPaymentInWords: z.string().nonempty("Rent payment (in words) is required"),
  rentPayment: z.string().nonempty("Rent payment (in figures) is required"),
  selectedCurrency: z.string().nonempty("Currency selection is required"),
  agreementDate: z.string().nonempty("Agreement preparation date is required"),
});


export default agreementSchema;