// validationSchema.js
import * as yup from 'yup';

const enterPriseTrialValidationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  businessName: yup.string().required('Business name is required'),
  phoneNumber: yup.number().required('Phone number is required'),
});

export default enterPriseTrialValidationSchema;
