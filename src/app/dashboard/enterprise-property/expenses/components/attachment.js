import DeleteIcon from '@/components/icons/deleteIcon'
import Drop from '@/components/icons/drop'
import UploadWhite from '@/components/icons/uploadWhite'
import ViewDocu from '@/components/icons/viewDocu'
import React from 'react'

const Attachment = ({
    triggerFileInput,
    handleFileChange,
    removeFile,
    files,
    fileInputRef
}) => {

    const handleViewFile = (file) => {
        // Create a URL for the file
        const fileUrl = URL.createObjectURL(file);

        // Open the file in a new tab if it's a PDF
        if (file.type === 'application/pdf') {
            window.open(fileUrl, '_blank');
        } else {
            // For images, open them in a new window or tab
            const imageWindow = window.open('', '_blank');
            imageWindow.document.write(`
                <html>
                    <head>
                        <title>${file.name}</title>
                        <style>
                            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }
                            img { max-width: 100%; max-height: 100%; object-fit: contain; }
                        </style>
                    </head>
                    <body>
                        <img src="${fileUrl}" alt="${file.name}" />
                    </body>
                </html>
            `);
            imageWindow.document.close();
        }
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
                <p className="block text-sm font-medium">
                    Attachment <span className="font-normal text-GrayHomz">(optional)</span>
                </p>
                <p className='text-GrayHomz text-[13px] font-normal'>
                    Upload up to 5 file attachments
                </p>
                {/* Hidden file input */}
                <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg"
                />

                {/* File upload area */}
                <div>
                    <div className='mt-4 w-full bg-[#F6F6F6] border border-dashed border-[#D5D5D5] rounded-[12px] px-4 py-8'
                    >
                        <label htmlFor="firstGuarantorUpload" className="cursor-pointer flex flex-col justify-center items-center gap-2">
                            <UploadWhite />
                            <p className='text-sm font-medium text-BlackHomz text-center'>
                                Drop your file or click to upload
                            </p>
                            <p className='text-[13px] font-normal text-GrayHomz'>
                                PDF, JPG up to 2MB
                            </p>
                            <button
                                onClick={triggerFileInput}
                                disabled={files.length >= 5}
                                className={`mt-1 text-sm font-medium w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz border border-BlueHomz rounded-[4px] px-4 py-2`}
                            >
                                Select file
                            </button>
                        </label>
                    </div>
                </div>

                {/* Uploaded files list */}
                {files.length > 0 && (
                    <div className="mt-4">
                        <ul className="space-y-2">
                            {files.map((file, index) => (
                                <li key={index} className="flex justify-between gap-4 items-start border p-2 rounded">
                                    <div className='flex items-start gap-1 w-[65%]'>
                                        <Drop />
                                        <div className='flex flex-col gap-1 truncate'>
                                            <span className="text-[16px] font-medium text-BlackHomz break-words truncate">{file.name}</span>
                                            <span className="text-sm font-normal truncate text-GrayHomz">{file.type}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 w-[30%]'>
                                        <button
                                            type="button"
                                            onClick={() => handleViewFile(file)}
                                            className="text-BlueHomz hover:text-BlueHomz4 text-sm flex gap-2 items-center"
                                        >
                                            <ViewDocu />
                                            View
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-error hover:text-red-700 text-sm flex gap-2 items-center"
                                        >
                                            <DeleteIcon />
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {files.length > 0 && (
                    <p className="text-sm text-GrayHomz mt-2">
                        {files.length} of 5 files selected
                    </p>
                )}
            </div>
        </div>
    )
}

export default Attachment