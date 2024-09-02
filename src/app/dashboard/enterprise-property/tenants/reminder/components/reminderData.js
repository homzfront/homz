// data/reminderData.js
const Data = [
  {
    id: 1,
    reminderDate: "6 Months Reminder",
    tenant: "Tenants will receive a reminder 6 months to their due dates",
    emailReminder: "Rent Reminder: Rent Due in 6 Months",
    emailText: `Dear [Tenant’s FirstName], I hope this message finds you well. This is a reminder that your rent payment will be due in six months on [due date]. We value your tenancy and want to ensure that you have ample time to prepare. Should you have any questions or need assistance, please feel free to reach out. Thank you for your attention to this matter. Best regards, [Property Manager Business Logo]   [Property Manager Business Name]     [Property Manager Business Contact Information]`,
    sms: "[[Tenant’s FirstName], Your rent is due in 6 months on [due date] . Please ensure timely payment to avoid any inconvenience. Thank you.",
    sms_label: "Rent Reminder",
    in_app: "Rent Reminder",
    in_app_text: "[Tenant’s FirstName], Your rent is due in 6 months on [due date] . Please ensure timely payment to avoid any inconvenience. Thank you."
  },
  {
    id: 2,
    reminderDate: "3 Months Reminder",
    tenant: "Tenants will receive a reminder 3 months to their due dates",
    emailReminder: "Rent Reminder: Rent Due in 3 Months",
    emailText: `[Tenant’s Full Name]
  [Tenant’s Address]
  
  Dear [Tenant’s First Name],
  
  RENT RENEWAL FOR [PROPERTY DESCRIPTION] AT [PROPERTY ADDRESS]
  
  We are writing to inform you that your current tenancy for the above-captioned property will expire on [Due Date]. As a new tenancy period begins forthwith, we would like to offer you a renewal under the following terms and conditions, subject to contract and the landlord's approval:
  
  Term: One year Certain, commencing on [Tenant’s Start Anniversary}
  
  Description: 2 Bedroom Flat with one (1) room boys’ quarters.{Property description]
  
  Rent:[Rent Due], covering the period from [Tenancy Anniversary]
  
  To pay: Kindly Visit the app for payment instruction.
  
  Thank you, and we look forward to your prompt cooperation.
  
  For and on behalf of;
  
  [Property Manager Business Logo]
  
  [Property Manager Business Name]
  
  [Property Manager Name]
  [Property Manager Business Contact Information]
  
  Cc; The Landlord`,
    sms: "[Tenant’s FirstName], Your rent is due in 3 months on [due date] . Please ensure timely payment to avoid any inconvenience. Thank you.",
    sms_label: "Rent Reminder",
    in_app: "Rent Reminder",
    in_app_text: "[Tenant’s FirstName], Your rent is due in 3 months on [due date] . Please ensure timely payment to avoid any inconvenience. Thank you."
  },
  {
    id: 3,
    reminderDate: "1 Month Reminder",
    tenant: "Tenants will receive a reminder 1 month to their due dates",
    emailReminder: "Rent Reminder: Rent Due in 1 Month",
    emailText: `[Tenant’s Full Name]
  [Tenant’s Address]
  
  Dear [Tenant’s First Name],
  
  RENT RENEWAL FOR [PROPERTY DESCRIPTION] AT [PROPERTY ADDRESS]
  
  We are writing to inform you that your current tenancy for the above-captioned property will expire on [Due Date]. As a new tenancy period begins forthwith, we would like to offer you a renewal under the following terms and conditions, subject to contract and the landlord's approval:

  Term: One year Certain, commencing on [Tenant’s Start Anniversary}
  
  Description: 2 Bedroom Flat with one (1) room boys’ quarters.{Property description]
  
  Rent:[Rent Due], covering the period from [Tenancy Anniversary]
  
  To pay: Kindly Visit the app for payment instruction.
  
  Thank you, and we look forward to your prompt cooperation.
  
  For and on behalf of;
  
  [Property Manager Business Logo]
  
  [Property Manager Business Name]
  
  [Property Manager Name]
  [Property Manager Business Contact Information]`,
    sms: "[Tenant’s FirstName], Your rent is due in 1 months on [due date] . Please ensure timely payment to avoid any inconvenience. Thank you.",
    sms_label: "Rent Reminder",
    in_app: "Rent Reminder",
    in_app_text: "[Tenant’s FirstName], Your rent is due in 1 months on [due date] . Please ensure timely payment to avoid any inconvenience. Thank you."
  },
  {
    id: 4,
    reminderDate: "7 Days Reminder",
    tenant: "Tenants will receive a reminder 7 days to their due dates",
    emailReminder: "Rent Reminder: Rent Due in 7 Days",
    emailText: `Dear [Tenant’s Name],
  
I hope this message finds you well. This is a reminder that your rent payment is due in 7 days on [due date]. Please ensure that your payment is made promptly to ensure a smooth continuation of your tenancy.

Should you have any questions or need assistance, please feel free to reach out.

Thank you for your attention to this matter.

Best regards,

[Property Manager Business Logo]

[Property Manager Business Name]

[Property Manager Business Contact Information]`,
    sms: "[Tenant's First Name], your rent is due in 7 days [Due date]. Please make your payment to avoid any inconvenience. Thank you.",
    sms_label: "Rent Reminder",
    in_app: "Rent Reminder",
    in_app_text: "[Tenant's First Name], your rent is due in 7 days [Due date]. Please make your payment to avoid any inconvenience. Thank you."
  },
  {
    id: 5,
    reminderDate: "Due Date",
    tenant: "Tenants will receive a reminder on their due date",
    emailReminder: "Reminder: Rent is Due Today",
    emailText: `Dear [Tenant’s Name],
  
I hope this message finds you well. This is a reminder that your rent payment is due today. Please ensure that your payment is made promptly to ensure a smooth continuation of your tenancy.

Should you have any questions or need assistance, please feel free to reach out.

Thank you for your attention to this matter.

Best regards,

[Property Manager Business Logo]

[Property Manager Business Name]

[Property Manager Business Contact Information]`,
    sms: "[Tenant's First Name], your rent is due today (Due date). You are advised to make your payment to avoid any inconvenience. Regards",
    sms_label: "Rent Reminder",
    in_app: "Rent Reminder",
    in_app_text: "[Tenant's First Name], your rent is due today (Due date). You are advised to make your payment to avoid any inconvenience. Regards"
  },
  {
    id: 6,
    reminderDate: "Post Due Date",
    tenant: "Tenants will frequently receive set reminder after their due date",
    emailReminder: "Rent Reminder: Rent Due after Due Date",
    emailText: `Dear [Tenant’s Name],

I hope this message finds you well. This is a reminder that your rent payment is past due today. Please ensure that your payment is made promptly to avoid discontinuance of service.

Should you have any questions or need assistance, please feel free to reach out.

Thank you for your attention to this matter.

Best regards,

[Property Manager Business Logo]

[Property Manager Business Name]

[Property Manager Business Contact Information]`,
    sms: "[Tenant's First Name], your rent has expired on (Due date). You are advised to make your payment to avoid further inconvenience.",
    sms_label: "Subject",
    in_app: "Subject",
    in_app_text: "[Tenant's First Name], your rent has expired on (Due date). You are advised to make your payment to avoid further inconvenience."
  }
];

export default Data;

