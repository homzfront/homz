import DocuDownload from '@/components/icons/docuDownload';
import DownloadDocuMini from '@/components/icons/downloadDocuMini';
import ViewDocu from '@/components/icons/viewDocu';
import React from 'react'

const TenantVerificationKYC = ({ data }) => {
    const documents = [
        { name: 'NIN', format: 'pdf' },
    ];
    
    return (
        <div className='mb-4 w-full text-[14px] font-normal text-GrayHomz'>
            <div className='mt-4 grid grid-cols-1 w-full gap-2 min-h-[30px]'>
                {/* {documents.map((doc, index) => ( */}
                <div className={`${!data?.ninId?.nin_data && "hidden"} flex gap-2 items-center p-3 rounded-[12px] bg-[#FCFCFC]`}>
                    <DocuDownload />
                    <div>
                        <p className='text-[11px]'>{data?.ninId?.nin_data ? "NIN" : "Passport"}.jpg</p>
                        <div className='flex justify-center gap-2'>
                            <button
                                onClick={() => {
                                    const base64Image = data?.ninId?.nin_data?.photo;

                                    if (base64Image) {
                                        // Convert Base64 to a Data URL
                                        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

                                        // Open the image in a new tab
                                        const newTab = window.open();
                                        newTab.document.write(`<img src="${imageUrl}" style="width:100%; height:auto;" />`);
                                        newTab.document.close();
                                    }
                                }}
                                className='text-BlueHomz text-[11px] flex items-center gap-1'><ViewDocu /> View Document</button>
                            <button
                                onClick={() => {
                                    const base64Image = data?.ninId?.nin_data?.photo;

                                    if (base64Image) {
                                        // Convert Base64 to a Data URL
                                        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

                                        // Create a temporary link to download the image
                                        const link = document.createElement("a");
                                        link.href = imageUrl;
                                        link.download = "nin_photo.jpg"; // Default filename
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                }}
                                className='text-BlueHomz text-[11px] flex items-center gap-1'><DownloadDocuMini /> Download</button>
                        </div>
                    </div>
                </div>
                {/* ))} */}
            </div>
        </div>
    );
};

export default TenantVerificationKYC;
