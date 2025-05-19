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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
                <p className="block text-sm font-medium">
                    Attachment <span className="font-normal text-GrayHomz">(optional)</span>
                </p>
                <p className='text-GrayHomz text-[13px] font-normal'>
                    Upload up to 3 file attachments
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
                                disabled={files.length >= 3}
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
                                    <div className='flex items-start gap-1 max-w-[65%]'>
                                        <Drop />
                                        <div className='flex flex-col gap-1 truncate'>
                                            <span className="text-[16px] font-medium text-BlackHomz break-words truncate">{file.name}</span>
                                            <span className="text-sm font-normal truncate text-GrayHomz">{file.type}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 w-[30%]'>
                                        <button
                                            type="button"
                                            onClick={() => { }}
                                            className="text-BlueHomz hover:text-BlueHomz4 text-sm flex gap-2 items-center"
                                        >
                                            <ViewDocu />
                                            View
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-error hover:text-red-700 text-sm flex gap-2 items-center"
                                    >
                                        <DeleteIcon />
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {files.length > 0 && (
                    <p className="text-sm text-GrayHomz mt-2">
                        {files.length} of 3 files selected
                    </p>
                )}
            </div>
        </div>
    )
}

export default Attachment