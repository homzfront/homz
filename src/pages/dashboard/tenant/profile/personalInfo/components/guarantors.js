import DocDocu from '@/components/icons/docDocu';
import DoneUpload from '@/components/icons/doneUpload';
import Upload from '@/components/icons/upload';
import React from 'react';
import { toast } from 'react-toastify';
import UpdateButton from '../../components/updateButton';

const Guarantors = ({ register, setFormData, formData }) => {
    const [active, setActive] = React.useState(false);
    const [firstGuarantorFile, setFirstGuarantorFile] = React.useState(null);
    const [secondGuarantorFile, setSecondGuarantorFile] = React.useState(null);
    const [firstFile, setFirstFile] = React.useState(null);
    const [secondFile, setSecondFile] = React.useState(null);

    const handleFileUpload = (file, setFile) => {
        if (!file) return;

        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            toast.warning('Invalid file type. Please upload a PDF, JPG, or PNG file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.warning('File size exceeds 5MB. Please upload a smaller file.');
            return;
        }

        setFile(file);
        toast.success('File uploaded successfully!');
    };

    const handleDrop = (event, setFile) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFileUpload(file, setFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    React.useEffect(() => {
        if (firstGuarantorFile) {
            const fileData = {
                name: firstGuarantorFile.name,
                size: (firstGuarantorFile.size / 1024).toFixed(2) + ' KB',
                type: firstGuarantorFile.type
            };
            setFirstFile(fileData)
        }
        if (secondGuarantorFile) {
            const secondFileData = {
                name: secondGuarantorFile.name,
                size: (secondGuarantorFile.size / 1024).toFixed(2) + ' KB',
                type: secondGuarantorFile.type
            }
            setSecondFile(secondFileData)
        }
    }, [firstGuarantorFile, secondGuarantorFile])
    console.log(firstGuarantorFile)
    console.log(secondGuarantorFile)
    console.log(firstFile)
    console.log(secondFile)

    return (
        <div className=''>
            <div className='md:bg-[#FCFCFC] rounded-[12px] md:p-4'>
                <div className='flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between md:items-center'>
                    <div>
                        <h1 className='font-medium text-[16px] text-BlackHomz'>
                            Guarantors
                        </h1>
                        <p className='text-sm font-normal text-GrayHomz'>
                            Upload two guarantor forms
                        </p>
                    </div>
                    <button className='w-full md:w-auto border border-BlueHomz rounded-[4px] px-4 py-2 hover:bg-whiteblue font-medium text-sm text-BlueHomz flex items-center justify-center gap-2'>
                        <DocDocu /> Download Guarantor’s Form
                    </button>
                </div>
                <div className='flex flex-col md:flex-row gap-2 items-center mt-8'>
                    <div
                        className='md:min-h-[200px] md:flex md:justify-center md:items-center w-full bg-[#F6F6F6] md:bg-transparent md:border md:border-[#D5D5D5] rounded-[12px] px-4 py-8'
                        onDrop={(e) => handleDrop(e, setFirstGuarantorFile)}
                        onDragOver={handleDragOver}
                    >
                        {firstGuarantorFile
                            ?
                            <div>
                                <label htmlFor="firstGuarantorUploaded" className="cursor-pointer flex flex-col justify-center items-center gap-2">
                                    <DoneUpload />
                                    <p className='text-sm font-normal text-GrayHomz flex items-center gap-1'>
                                        <span>
                                            {firstFile?.name}
                                        </span>
                                        <span>
                                            {firstFile?.type}
                                        </span>
                                        <span>
                                            {firstFile?.size}
                                        </span>
                                    </p>
                                    <div className='text-[14px] font-normal flex justify-center gap-2 items-center'>
                                        <button
                                            onClick={() => document.getElementById('firstGuarantorUpload').click()}
                                            className='text-BlueHomz hover:text-blue-400'>
                                            Click to change
                                        </button>
                                        <button onClick={() => setFirstGuarantorFile(null)} className='text-[#D92D20] hover:text-red-400'>
                                            Delete
                                        </button>
                                    </div>
                                </label>
                            </div>
                            :
                            <div>
                                <label htmlFor="firstGuarantorUpload" className="cursor-pointer flex flex-col justify-center items-center gap-2">
                                    <Upload />
                                    <p className='text-sm font-normal text-BlueHomz text-center'>
                                        Click to upload first guarantor’s form <span className='text-GrayHomz'>or drag and drop</span>
                                    </p>
                                    <p className='text-[11px] font-normal text-GrayHomz'>
                                        PDF, JPG or PNG (max. 5mb)
                                    </p>
                                </label>
                            </div>
                        }
                        <input
                            id="firstGuarantorUpload"
                            type="file"
                            accept=".pdf,.jpg,.png"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e.target.files[0], setFirstGuarantorFile)}
                        />
                    </div>
                    <div
                        className='md:min-h-[200px] md:flex md:justify-center md:items-center w-full bg-[#F6F6F6] md:bg-transparent md:border md:border-[#D5D5D5] rounded-[12px] px-4 py-8'
                        onDrop={(e) => handleDrop(e, setSecondGuarantorFile)}
                        onDragOver={handleDragOver}
                    >
                        {secondGuarantorFile
                            ?
                            <div>
                                <label htmlFor="secondGuarantorUploaded" className="cursor-pointer flex flex-col justify-center items-center gap-2">
                                    <DoneUpload />
                                    <p className='text-sm font-normal text-GrayHomz flex items-center gap-1'>
                                        <span>
                                            {secondFile?.name}
                                        </span>
                                        <span>
                                            {secondFile?.type}
                                        </span>
                                        <span>
                                            {secondFile?.size}
                                        </span>
                                    </p>
                                    <div className='text-[14px] font-normal flex justify-center gap-2 items-center'>
                                        <button
                                            onClick={() => document.getElementById('secondGuarantorUpload').click()}
                                            className='text-BlueHomz hover:text-blue-400'>
                                            Click to change
                                        </button>
                                        <button onClick={() => setSecondGuarantorFile(null)} className='text-[#D92D20] hover:text-red-400'>
                                            Delete
                                        </button>
                                    </div>
                                </label>
                            </div>
                            :
                            <div>
                                <label htmlFor="secondGuarantorUpload" className="cursor-pointer flex flex-col justify-center items-center gap-2">
                                    <Upload />
                                    <p className='text-sm font-normal text-BlueHomz text-center'>
                                        Click to upload second guarantor’s form <span className='text-GrayHomz'>or drag and drop</span>
                                    </p>
                                    <p className='text-[11px] font-normal text-GrayHomz'>
                                        PDF, JPG or PNG (max. 5mb)
                                    </p>
                                </label>
                            </div>
                        }
                        <input
                            id="secondGuarantorUpload"
                            type="file"
                            accept=".pdf,.jpg,.png"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e.target.files[0], setSecondGuarantorFile)}
                        />
                    </div>
                </div>
            </div>
            <UpdateButton />
        </div>
    );
};

export default Guarantors;