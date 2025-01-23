"use client";
import React, { useCallback, useState, useRef } from "react";
import ExportSmall from '@/components/icons/exportSmall'
import UploadBulk from '@/components/icons/uploadBulk'
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import useCSVFileStore from "@/store/document/useCSVFileStore";
import { transformKeys } from "@/utils/transformKeys";
import BulkUploadMobile from "@/components/icons/bulkUploadMobile";


const UploadYourFile = ({ handlePageChangeTwo, estateData, setShowNumberOfHouseModal }) => {
    const [uploadedCsv, setUploadedCsv] = useState(null);
    const [progress, setProgress] = useState(0); // Upload progress state
    const [uploading, setUploading] = useState(false); // Uploading state
    const inputRef = useRef(null);
    const { CSVFile, setCSVFile, setEstateId } = useCSVFileStore();


    // Parse CSV content using papaparse
    const parseCsv = (csvString) => {
        const result = Papa.parse(csvString, {
            header: true, // Treat the first row as headers
            skipEmptyLines: true, // Skip empty rows
        });
        return result.data; // Extract the parsed data
    };

    // Simulate progress for upload
    const simulateProgress = () => {
        setUploading(true);
        let progressValue = 0;

        const interval = setInterval(() => {
            progressValue += 10;
            setProgress(progressValue);

            if (progressValue >= 100) {
                clearInterval(interval);
                setUploading(false);
            }
        }, 100); // Adjust duration (300ms) to control total simulation time
    };

    // Handle file drop
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvContent = event.target.result;
                const parsedData = parseCsv(csvContent); // Parse CSV into object format
                setCSVFile(parsedData);
                setEstateId(estateData?._id)
                // console.log("Parsed CSV Data:", parsedData);
            };
            reader.readAsText(file); // Read file as text
            setUploadedCsv(file);
            simulateProgress(); // Simulate upload progress
        }
    }, []);

    // Handle manual file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvContent = event.target.result;
                const parsedData = parseCsv(csvContent); // Parse CSV into object format
                setCSVFile(parsedData);
                setEstateId(estateData?._id);
                // console.log("Parsed CSV Data:", parsedData);
            };
            reader.readAsText(file); // Read file as text
            setUploadedCsv(file);
            simulateProgress(); // Simulate upload progress
        }
    };

    // Dropzone configuration
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "text/csv": [".csv"] },
        noClick: true, // Prevent file dialog from opening on click
        noKeyboard: true // Prevent file dialog from opening on keyboard events
    });

    // cancelUpdate
    const cancelUpload = () => {
        setUploadedCsv(null)
        setCSVFile(null)
        setEstateId(null)
        setProgress(0)
        if (inputRef.current) {
            inputRef.current.value = ""; // Reset file input value
        }
    }

    // download sample csv
    const handleDownload = () => {
        const fileUrl = "/csv-sample/Sample(Bulk Tenant Invite).csv"; // Path to your CSV file in the public folder

        // Create a hidden <a> element
        const link = document.createElement("a");
        link.href = fileUrl; // Set the file URL

        // Append the link to the body and trigger the click
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link from the DOM
        document.body.removeChild(link);
    };


    const handlePageTwo = () => {
        if (CSVFile?.length > estateData?.numberOfHouses) {
            setShowNumberOfHouseModal(true);
        }
        handlePageChangeTwo()
    }

    console.log(CSVFile?.length)
    console.log(estateData?.numberOfHouses)
    return (
        <div className='overflow-y-auto'>
            <div className={`flex flex-col lg:flex-row gap-4 lg:gap-0 items-center w-full justify-between ${(uploading || uploadedCsv || CSVFile) && "hidden"}`}>
                <div className='w-full lg:w-[60%] flex flex-col gap-2'>
                    <h1 className='text-BlackHomz font-[500px] text-[16px] lg:text-[18px]'>
                        Bulk Import your Tenants to your Property
                    </h1>
                    <h3 className='text-GrayHomz font-[400px] text-[14px] lg:text-[18px]'>
                        Each tenant's email address and full name must be included in the imported data to ensure a seamless experience.
                    </h3>
                </div>
                <div className='w-full lg:w-[30%] flex lg:justify-end'>
                    <button onClick={handleDownload} className='p-2 bg-BlueHomz text-white font-[400px] text-[14px] lg:text-[16px] flex justify-center items-center gap-2 rounded-[4px] w-full lg:w-auto'>
                        <ExportSmall className='#ffffff' /> <span>Download sample .csv file</span>
                    </button>
                </div>
            </div>
            <div
                {...getRootProps()}
                className={`cursor-pointer ${(uploading || uploadedCsv || CSVFile) && "hidden"} mt-4 lg:mt-0`}
                onClick={() => inputRef.current.click()} // Trigger input dialog on click
            >
                <span className="hidden lg:block"><UploadBulk /></span>

                <span className="lg:hidden"><BulkUploadMobile width="w-100%" /> </span>
            </div>

            {/* Hidden File Input */}
            <input
                {...getInputProps()} // Dropzone props
                ref={inputRef} // Manual trigger reference
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange} // Handle file change manually
            />

            {/* Progress bar UI */}
            {uploading && (
                <div className="w-full mt-4 bg-[##EEF5FF] border border-[#559CFF] p-4 rounded-[12px]">
                    <div className="flex flex-col lg:flex-row lg:justify-between w-full items-start lg:items-center mb-2">
                        <div className="text-BlackHomz text-[16px] font-[500]">Uploading <span className="text-GrayHomz text-[13px] font-[400]">{uploadedCsv ? uploadedCsv?.name : "[File Name.csv]"}</span></div>
                        <span onClick={cancelUpload} className="cursor-pointer text-[13px] font-[400] text-[#D92D20] underline">Cancel upload</span>
                    </div>
                    <div className="text-start mt-2 text-GrayHomz text-[13px] font-[400]">{progress}%</div>
                    <div className="relative w-full h-2 bg-gray-200 rounded">
                        <div
                            className="absolute h-2 bg-BlueHomz rounded"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* CSV Data */}
            {CSVFile && !uploading && (
                <div className={``}>
                    <div className='w-full lg:w-[60%] flex flex-col gap-2'>
                        <h1 className='text-BlackHomz font-[500px] text-[18px]'>
                            Bulk Import your Tenants to your Property
                        </h1>
                        <h3 className='text-GrayHomz font-[400px] text-[16px]'>
                            Each tenant's email address and full name must be included in the imported data to ensure a seamless experience.
                        </h3>
                    </div>
                    <div className="w-full mt-4 border px-5 py-4 border-[#2DA971] bg-[#CDEADD] flex items-start justify-between rounded-[12px]">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[16px] font-[500] text-BlackHomz">
                                Your file has been uploaded!
                            </h2>
                            <h2 className="text-[13px] font-[400] text-GrayHomz">
                                {uploadedCsv ? uploadedCsv?.name : "[File Name.csv]"}
                            </h2>
                        </div>
                        <div onClick={cancelUpload} className="cursor-pointer text-[13px] font-[400] text-BlackHomz underline">
                            Cancel
                        </div>
                    </div>
                    {/* CSV Table */}
                    <div className="overflow-x-auto scrollbar-containerII mt-4 overflow-y-auto pr-1 pb-1">
                        <div className="w-[500%] lg:w-[180%] max-h-[calc(100vh-60vh)]">
                            <div className="w-full border rounded-t-[12px]">
                                <div className="bg-BlueHomz h-[50px] text-[13px] flex items-center justify-start gap-2 font-[500] text-[#ffffff]  px-2 rounded-t-[12px]">
                                    {Object.keys(CSVFile[0])
                                        .slice(0, 10) // Limit headers to the first 10 keys
                                        .map((key, index) => (
                                            <div
                                                key={index}
                                                className="w-[10%]"
                                            >
                                                {key}
                                            </div>
                                        ))}
                                </div>
                                <div className="">
                                    {CSVFile &&
                                        CSVFile.map((data, index) => {
                                            // Get the keys of the current row
                                            const keys = Object.keys(data).slice(0, 10); // Limit to first 10 keys
                                            return (
                                                <div
                                                    key={index}
                                                    className="border-b-[1px] items-center flex justify-start w-full gap-2 px-2 h-[60px]"
                                                >
                                                    {keys.map((key, keyIndex) => (
                                                        <div
                                                            key={keyIndex}
                                                            className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start"
                                                        >
                                                            <span className="break-words">{data[key]}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end mt-4">
                        <button
                            onClick={handlePageTwo}
                            className="bg-BlueHomz text-white rounded-[4px] px-3 py-2 hover:text-BlueHomz hover:border hover:border-BlueHomz hover:bg-white font-[500] text-[14px]">
                            Proceed
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};
export default UploadYourFile;