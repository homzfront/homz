import UploadWhite from '@/components/icons/uploadWhite'
import React, { useState, useRef, ChangeEvent } from 'react'

const Attachment = () => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = e.target.files[0];
            if (files.length < 3) {
                setFiles([...files, newFile]);
            }
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    const handleSubmit = () => {
        if (files.length === 0) {
            alert('Please upload at least one file');
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });

        // Here you would typically send the formData to your API
        console.log('Submitting files:', files);
        // Example: axios.post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

        alert(`Submitted ${files.length} file(s)`);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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
                <div className='mt-4 w-full bg-[#F6F6F6] border border-dashed border-[#D5D5D5] rounded-[12px] px-4 py-8'>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <UploadWhite />
                        <p className='text-sm font-medium text-BlackHomz text-center'>
                            Drop your file or click to upload
                        </p>
                        <p className='text-[13px] font-normal text-GrayHomz'>
                            PDF, JPG up to 2MB
                        </p>
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            disabled={files.length >= 3}
                            className={`mt-1 text-sm font-medium w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz border border-BlueHomz rounded-[4px] px-4 py-2 ${files.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Select file
                        </button>
                    </div>
                </div>
                
                {/* Uploaded files list */}
                {files.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                        <ul className="space-y-2">
                            {files.map((file, index) => (
                                <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                                    <button 
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {/* Submit button */}
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-BlueHomz text-white rounded-[4px] px-6 py-2 hover:bg-[#4bb2e5] transition-colors"
                    >
                        Submit Attachments
                    </button>
                    {files.length > 0 && (
                        <p className="text-sm text-GrayHomz mt-2">
                            {files.length} of 3 files selected
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Attachment