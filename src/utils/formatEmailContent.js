export default function formatEmailContent (emailContent) {
    // Define the HTML for placeholders
    const placeholders = {
      logo: '<tr><td align="center"><img src="https://example.com/logo.png" alt="Business Logo" style="max-width: 100px;"/></td></tr>',
      name: '<tr><td align="left" style="font-weight: bold;">XYZ Property Management</td></tr>',
      email: `
        <tr>
          <td align="left" valign="top" style="display: flex; align-items: center; justify-content: start; margin-top: 5px;">
            <img src="https://example.com/email-icon.png" alt="email" style="height: 20px; width: 20px; margin-right: 8px;" />
            contact@xyzproperty.com
          </td>
        </tr>`,
      phone: `
        <tr>
          <td align="left" valign="top" style="display: flex; align-items: center; justify-content: start; margin-top: 5px;">
            <img src="https://example.com/phone-icon.png" alt="phone" style="height: 20px; width: 20px; margin-right: 8px;" />
            +1234567890
          </td>
        </tr>`,
      address: `
        <tr>
          <td align="left" valign="top" style="display: flex; align-items: center; justify-content: start; margin-top: 5px;">
            <img src="https://example.com/address-icon.png" alt="address" style="height: 20px; width: 20px; margin-right: 8px;" />
            123 Main Street, City
          </td>
        </tr>`
    };
  
    // Replace placeholders with corresponding HTML
    let formattedContent = emailContent
      .replace(/\[Property Manager’s Business Logo\]/g, placeholders.logo)
      .replace(/\[Property Manager’s Business Name\]/g, placeholders.name)
      .replace(/\[Property Manager’s Business Email\]/g, placeholders.email)
      .replace(/\[Property Manager’s Business Phone Number\]/g, placeholders.phone)
      .replace(/\[Property Manager’s Business Address\]/g, placeholders.address);
  
    // Ensure <p> tags are properly placed
    formattedContent = formattedContent.replace(/(?:<p>)([\s\S]*?)(?:<\/p>)/g, '<p>$1</p>');
  
    // Wrap the entire content inside a table structure for email formatting
    const finalContent = `
      <p style="font-size: 16px">Dear [Tenant’s First Name],</p>
      <p>Your rent is due soon.</p>
      <p>Best regards,</p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              ${formattedContent}
            </table>
          </td>
        </tr>
      </table>
    `;
  
    return finalContent;
  }
  
  // Example usage
  const emailContent = `
    <p>Your rent is due soon.</p>
    [Property Manager’s Business Logo]
    [Property Manager’s Business Name]
    [Property Manager’s Business Email]
    [Property Manager’s Business Phone Number]
    [Property Manager’s Business Address]
  `;
  
  const formattedEmail = formatEmailContent(emailContent);
  console.log(formattedEmail);
  