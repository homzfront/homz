import { Document, Packer, Paragraph, TextRun } from "docx";
import formatDate from "@/utils/formatDate";

const Word = (formData) => {
  if (!formData) {
    throw new Error("Missing required data for quit notice generation.");
  }
  // Create the document content
  const doc = new Document({
    sections: [
      {
        children: [
          // Logo and Property Manager Company Name
          new Paragraph({
            children: [  new TextRun({
                text: `${formData?.propertyManagerCompanyName || ""}`,
                font: "Times New Roman",
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
          }),
          // Date
          new Paragraph({
            children: [
              new TextRun({
                text: formData?.noticeStartDate ? formatDate(formData?.noticeStartDate) : "",
                font: "Times New Roman",
                size: 20,
                bold: true,
              })
            ],
          }),
          new Paragraph({
          }),
          // Tenant Name and Address
          new Paragraph({
            children: [
              new TextRun({
                text: formData?.tenantName || "",
                font: "Times New Roman",
                bold: true,
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${formData?.tenantAddress || ""}`,
                font: "Times New Roman",
                bold: true
              })
            ]
          }),
          new Paragraph({
          }),
          // Salutation
          new Paragraph({
            children: [
              new TextRun({
                text: `Dear `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.tenantName || ""},`,
                font: "Times New Roman",
                bold: true,
              })
            ]
          }),
          new Paragraph({
          }),
          // Notice Header
          new Paragraph({
            children: [
              new TextRun({
                text: "NOTICE TO QUIT ",
                font: "Times New Roman",
              }),
              new TextRun({
                text: `- ${formData?.noticePeriod
                  ? `${formData?.noticePeriod} ${formData?.noticePeriod === 1 ? "month" : "months"}`
                  : ""
                  }`,
                font: "Times New Roman",
                bold: true,
              }),
            ]
          }),
          new Paragraph({
          }),
          // Notice Content
          new Paragraph({
            children: [
              new TextRun({
                text: `I, `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.propertyManagerName || ""
                  }, `,
                font: "Times New Roman",
                bold: true
              }),
              new TextRun({
                text: `the Property Manager to the Estate of`,
                font: "Times New Roman",
              }),
              new TextRun({
                text: ` ${formData?.landlordName || ""
                  } `,
                font: "Times New Roman",
                bold: true,
              }),
              new TextRun({
                text: `(hereinafter referred to as “Our Client”), your landlord on whose instruction we write.`,
                font: "Times New Roman",
              }),
            ]

          }),
          new Paragraph({
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `You are by this notice required to deliver up possession of the `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.propertyDesc || ""
                  }, `,
                font: "Times New Roman",
                bold: true,
              }),
              new TextRun({
                text: `situated at `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.propertyManagerCompanyAddress || ""
                  }`,
                font: "Times New Roman",
                bold: true,
              }),
              new TextRun({
                text: `, which you hold as a yearly tenant be given to us on the expiration of your current tenancy period; `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.noticePeriod
                  ? `${formData?.noticePeriod} ${formData?.noticePeriod === 1 ? "month" : "months"
                  }`
                  : ""
                  }`,
                font: "Times New Roman",
                bold: true,
              }),
              new TextRun({
                text: ` from the date of your receipt or service of this notice.`,
                font: "Times New Roman",
              }),
            ]
          }),
          new Paragraph({
          }),
          // Final Instructions
          new Paragraph({
            text: "Furthermore, you are requested to settle all your outstanding rent, rates, electricity bills, levies, and keep the apartment in tenantable condition before your departure.",
            font: "Times New Roman",
          }),
          new Paragraph({
          }),
          new Paragraph({
            text: "Take notice that in the event of your refusal to comply with the notice, we have the instruction of our client to apply to court for issuance of a warrant directing an appropriate person to enter and take possession of the said premises and to eject any person therefrom. Thanks.",
            font: "Times New Roman",
          }),
          new Paragraph({
          }),
          // Date of Notice
          new Paragraph({
            children: [
              new TextRun({
                text: `Dated this `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.noticeStartDate ? formatDate(formData?.noticeStartDate) : ""
                  }`,
                font: "Times New Roman",
                bold: true
              }),
            ]
          }),
          new Paragraph({
          }),
          // Signature Section
          new Paragraph({
            text: "Yours faithfully,",
            font: "Times New Roman",
          }),
          new Paragraph({
            text: "For and On Behalf Of;",
            font: "Times New Roman",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${formData?.propertyManagerCompanyName || ""}`,
                font: "Times New Roman",
                bold: true,
              })
            ]
          }),
          new Paragraph({
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Signed: `,
                font: "Times New Roman",
              }),
              new TextRun({
                text: `${formData?.propertyManagerName || ""}`,
                font: "Times New Roman",
                bold: true,
              }),
            ]
          }),
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
          // Footer with Contact Information
          new Paragraph({
            children: [
              new TextRun({
                text:  `${formData?.propertyManagerCompanyAddress ? `Address: `: ""}`,
                font: "Times New Roman",
                size: 16,
                bold: true
              }),
              new TextRun({
                text: `${formData?.propertyManagerCompanyAddress ? `${formData?.propertyManagerCompanyAddress}, ` : ""}`,
                font: "Times New Roman",
                size: 16,
              }),
              new TextRun({
                text:  `${formData?.propertyManagerCompanyEmail ? `Email: `: "" }`,
                font: "Times New Roman",
                size: 16,
                bold: true
              }),
              new TextRun({
                text: `${formData?.propertyManagerCompanyEmail ? `${formData?.propertyManagerCompanyEmail}, ` : ""}`,
                font: "Times New Roman",
                size: 16,
              }),
              new TextRun({
                text:  `${formData?.propertyManagerCompanyWebsite ? `Website: ` : ""}`,
                font: "Times New Roman",
                size: 16,
                bold: true
              }),
              new TextRun({
                text: `${formData?.propertyManagerCompanyWebsite ? `${formData?.propertyManagerCompanyWebsite}` : ""}`,
                font: "Times New Roman",
                size: 16,
              }),
            ],
          })
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


export default Word;
