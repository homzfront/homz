import { z } from 'zod';

const quitNoticeSchema = z.object({
  propertyDesc: z.string().nonempty("Property description is required"),
  propAddress: z.string().nonempty("Property address is required"),
  noticePeriod: z.string().nonempty("Notice period is required"),
  noticeStartDate: z.string().nonempty("Notice start date is required"),
  landlordName: z.string().nonempty("Landlord’s name is required"),
  tenantName: z.string().nonempty("Tenant’s name is required"),
  tenantAddress: z.string().nonempty("Tenant’s address is required"),
  duration: z.string().nonempty("Tenancy duration is required"),
  propertyManagerName: z.string().nonempty("Property manager name is required"),
  propertyManagerCompanyName: z.string().nonempty("Property manager company name is required"),
  propertyManagerCompanyEmail: z.string().email("Invalid email address").nonempty("Property manager company email is required"),
  propertyManagerCompanyAddress: z.string().nonempty("Property manager company address is required"),
  propertyManagerCompanyWebsite: z.string().url("Invalid URL").nonempty("Property manager company website is required"),
  image: z
    .instanceof(File, { message: "Image file is required" })
    .nullable()
    .refine(file => file === null || file.size > 0, "Image file is required for quit notice")
});

export default quitNoticeSchema;
