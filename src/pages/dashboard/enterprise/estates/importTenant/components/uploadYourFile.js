"use client";
import React, { useCallback, useState, useRef } from "react";
import ExportSmall from '@/components/icons/exportSmall'
import UploadBulk from '@/components/icons/uploadBulk'
import { useDropzone } from "react-dropzone";

const UploadYourFile = () => {
    const [uploadedCsv, setUploadedCsv] = useState(null);
    const [csvData, setCsvData] = useState([]); // Parsed table data
    const inputRef = useRef(null);

    // Function to parse CSV content into an object
    const parseCsv = (csvString) => {
        const rows = csvString.trim().split("\n");
        const headers = rows[0].split(","); // First row is the header
        const data = rows.slice(1).map((row) => {
            const values = row.split(",");
            return headers.reduce((acc, header, index) => {
                acc[header.trim()] = values[index]?.trim(); // Map headers to row values
                return acc;
            }, {});
        });
        return data;
    };

    // Handle file drop
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvContent = event.target.result;
                const parsedData = parseCsv(csvContent); // Parse CSV into object format
                setCsvData(parsedData);
                console.log("Parsed CSV Data:", parsedData);
            };
            reader.readAsText(file); // Read file as text
            setUploadedCsv(file);
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
                setCsvData(parsedData);
                console.log("Parsed CSV Data:", parsedData);
            };
            reader.readAsText(file); // Read file as text
            setUploadedCsv(file);
        }
    };

    // Dropzone configuration
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "text/csv": [".csv"] },
        noClick: true, // Prevent file dialog from opening on click
        noKeyboard: true // Prevent file dialog from opening on keyboard events
    });

    console.log(uploadedCsv)
    console.log(csvData)
    return (
        <div className=''>
            <div className='flex flex-col md:flex-row gap-4 md:gap-0 items-center w-full justify-between'>
                <div className='w-full md:w-[60%] flex flex-col gap-2'>
                    <h1 className='text-BlackHomz font-[500px] text-[18px]'>
                        Bulk Import your Tenants to your Property
                    </h1>
                    <h3 className='text-GrayHomz font-[400px] text-[16px]'>
                        Each tenant's email address and full name must be included in the imported data to ensure a seamless experience.
                    </h3>
                </div>
                <div className='w-full md:w-[30%] flex md:justify-end'>
                    <button className='p-2 bg-BlueHomz text-white font-[400px] text-[16px] flex justify-center items-center gap-2 rounded-[4px]'>
                        <ExportSmall className='#ffffff' /> <span>Download sample .csv file</span>
                    </button>
                </div>
            </div>
            <div
                {...getRootProps()}
                className="cursor-pointer"
                onClick={() => inputRef.current.click()} // Trigger input dialog on click
            >
                <UploadBulk />
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
        </div>
    )
}

export default UploadYourFile