import DocuDownload from '@/components/icons/docuDownload'
import DownloadDocuMini from '@/components/icons/downloadDocuMini';
import ViewDocu from '@/components/icons/viewDocu';
import React from 'react'

const GuarantorsKYC = ({ data }) => {
    function transformGuarantorsData(data) {
        const result = [];
        Object.entries(data).forEach(([key, value]) => {
            result.push(
                {
                    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ' Form',
                    type: 'form',
                    // asset_id: value.form.asset_id,
                    // publicId: value.form.publicId,
                    url: value?.form?.url,
                    // folder: value.form.folder,
                    format: value?.form?.format,
                    // bytes: value.form.bytes,
                },
                {
                    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ' ID Card',
                    type: 'idCard',
                    // asset_id: value.idCard.asset_id,
                    // publicId: value.idCard.publicId,
                    url: value?.idCard?.url,
                    // folder: value.idCard.folder,
                    format: value?.idCard?.format,
                    // bytes: value.idCard.bytes,
                }
            );
        });

        return result;
    };

    return (
        <div className='mb-4 w-full text-[14px] font-normal text-GrayHomz'>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 w-full gap-2'>
                {data && transformGuarantorsData(data?.guarantors)?.filter((doc) => doc.url !== undefined).map((doc, index) => (
                    <div key={index} className='flex gap-2 items-center p-3 rounded-[12px] bg-[#FCFCFC]'>
                        <DocuDownload />
                        <div>
                            <p className='text-[11px]'>{doc.name}.{doc.format}</p>
                            <div className='flex justify-center gap-2'>
                                <button
                                    onClick={() => {
                                        if (doc.url) {
                                            window.open(doc.url, "_blank");
                                        } else {
                                            console.error("Document URL is missing");
                                        }
                                    }}
                                    className='text-BlueHomz text-[11px] flex items-center gap-1'><ViewDocu /> View Document</button>
                                <button
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(doc.url);
                                            if (!response.ok) {
                                                throw new Error(`Failed to fetch document: ${response.statusText}`);
                                            }
                                            const blob = await response.blob();
                                            const link = document.createElement("a");
                                            link.href = URL.createObjectURL(blob);
                                            link.download = doc.name;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            URL.revokeObjectURL(link.href);
                                        } catch (error) {
                                            console.error("Error downloading the document:", error);
                                        }
                                    }}
                                    className='text-BlueHomz text-[11px] flex items-center gap-1'><DownloadDocuMini /> Download</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-end w-full mt-4'>
                <button className='h-[48px] rounded-[4px] text-BlueHomz hover:bg-whiteblue border border-BlueHomz text-[16px] font-medium w-full md:w-[170px] flex gap-2 items-center justify-center'>
                    <DownloadDocuMini /> Download
                </button>
            </div>
        </div>
    );
};

export default GuarantorsKYC;
