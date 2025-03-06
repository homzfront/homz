import { useEffect } from 'react';

const QoreIDButton = ({customerReference, applicantData}) => {
    useEffect(() => {
        const button = document.getElementById('QoreIDButton');

        const handleSubmission = (event) => {
            console.log('Verification Submitted:', event.detail);
        };

        const handleError = (event) => {
            console.error('Verification Error:', event.detail);
        };

        const handleClose = (event) => {
            console.log('Verification Closed:', event.detail);
        };

        button.addEventListener('qoreid:verificationSubmitted', handleSubmission);
        button.addEventListener('qoreid:verificationError', handleError);
        button.addEventListener('qoreid:verificationClosed', handleClose);

        return () => {
            button.removeEventListener('qoreid:verificationSubmitted', handleSubmission);
            button.removeEventListener('qoreid:verificationError', handleError);
            button.removeEventListener('qoreid:verificationClosed', handleClose);
        };
    }, []);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `
            <qoreid-button
                id="QoreIDButton"
                clientId="K4NVZI2IKIECZ1TOOKTU"
                productCode="ocr"
                customerReference="${customerReference}"
                ocrAcceptedDocuments="PASSPORT_NGA"
                applicantData='${JSON.stringify(applicantData)}'
            ></qoreid-button>
            `,
            }}
        />
    );
};
export default QoreIDButton;