import { z } from 'zod';

const receiptSchema = z.object({
    propertyManagerCompanyName: z.string().nonempty("Property manager company name is required"),
    propertyManagerCompanyEmail: z.string().email("Invalid email address").nonempty("Property manager company email is required"),
    propertyManagerCompanyAddress: z.string().nonempty("Property manager company address is required"),
    propertyManagerCompanyPhoneNumber: z.string().regex(/^\d+$/, "Invalid phone number").nonempty("Property manager company phone number is required"),
    receiptDate: z.string().nonempty("Receipt date is required"),
    tenantName: z.string().nonempty("Tenant’s name is required"),
    tenantPhoneNumber: z.string().regex(/^\d+$/, "Invalid phone number").nonempty("Tenant’s phone number is required"),
    propertyAddress: z.string().nonempty("Property address is required"),
    propertyDesc: z.string().nonempty("Property description is required"),
    rentPayment: z.string().nonempty("Rent payment (in figures) is required"),
    rentPaymentInWords: z.string().nonempty("Rent payment (in words) is required"),
    selectedCurrency: z.string().nonempty("Currency selection is required"),
    tenancy: z.string().nonempty("Tenancy type is required"),
    tenancyPeriod: z.string().nonempty("Tenancy period is required"),
    tenancyStartDate: z.string().nonempty("Tenancy start date is required"),
    tenancyEndDate: z.string().nonempty("Tenancy end date is required"),
    modOfPayment: z.string().nonempty("Mode of payment is required"),
    image: z
      .instanceof(File, { message: "Image file is required" })
      .nullable()
      .refine(file => file === null || file.size > 0, "Image file is required for receipt")
});

export default receiptSchema;
