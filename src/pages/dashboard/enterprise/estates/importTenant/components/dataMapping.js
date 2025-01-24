import React from 'react'
import useCSVFileStore from '@/store/document/useCSVFileStore';
import { transformKeys } from '@/utils/transformKeys';
import DropDown from './dropDown';
import ArrowLeft from '@/components/icons/arrowLeft';
import Import from '@/components/icons/import';

const DataMapping = ({ handlePageChange, setImportData, setShowMappingSummaryModal }) => {
    const { CSVFile, setOpenMapping } = useCSVFileStore();
    const [data, setData] = React.useState(null);
    const [selectedAttributes, setSelectedAttributes] = React.useState(null);
    const { mappedData, setMappedData } = useCSVFileStore();
    const [active, setActive] = React.useState(false);
    const [arrowColor, setArrowColor] = React.useState(false);
    const [expandedItems, setExpandedItems] = React.useState({}); // Manage expanded state for each item

    const toggleShowMore = (index) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle the expanded state for the current item
        }));
    };

    // map attribute
    const handleSelect = (selection) => {
        setSelectedAttributes((prev) => ({ ...prev, ...selection }));
    };

    //Re Arrange Data
    const rearrangeData = (data) => {
        // Extract all unique keys from the data
        const allKeys = Array.from(new Set(data?.flatMap(Object.keys)));

        // Map over the keys and collect all values for each key
        return allKeys.map((key) => ({
            "fileHeader": key,
            "data": data.map((item) => item[key] || null) // Collect all values for the key, use null if missing
        }));
    };

    React.useEffect(() => {
        if (CSVFile) {
            setData(rearrangeData(CSVFile))
        }
    }, [CSVFile])

    React.useEffect(() => {
        if (selectedAttributes) {
            const updatedData = CSVFile.map(item => {
                const newItem = {};
                Object.keys(item).forEach(key => {
                    const newKey = selectedAttributes[key];

                    // Only include the key if it's not set to "Do not import"
                    if (newKey && newKey !== "Do not import") {
                        newItem[newKey] = item[key];
                    }
                });
                return newItem;
            });
            setMappedData(updatedData);
        }
    }, [selectedAttributes])

    const attributes = [
        { id: 1, option: "Do not import" },
        { id: 2, option: "Tenant Name" },
        { id: 3, option: "Apartment No" },
        { id: 4, option: "Address" },
        { id: 5, option: "Email" },
        { id: 6, option: "Phone No" },
        { id: 7, option: "Rent Amount" },
        { id: 8, option: "Rent Duration" },
        { id: 9, option: "Start Date" },
        { id: 11, option: "Property Type" }
    ];


    const filteredAttributes = attributes.filter(attribute => {
        if (!selectedAttributes) {
            return attribute;
        }
        // Always include "Do not import" and exclude selected attributes
        return attribute.option === "Do not import" || !Object?.values(selectedAttributes).includes(attribute.option);
    });

    const isValid = !filteredAttributes?.some(item =>
        (item.id === 2 && item.option === "Tenant Name") ||
        (item.id === 5 && item.option === "Email")
    );

    return (
        <div className='w-full'>
            <div className='w-full lg:w-[60%] flex flex-col gap-2'>
                <h1 className='text-BlackHomz font-[500px] text-[18px]'>
                    Map your Data
                </h1>
                <h3 className='text-GrayHomz font-[400px] text-[16px]'>
                    Select the tenant attribute that corresponds to your data, you can also choose not to import some data.
                </h3>
            </div>
            <div className="mt-4 w-full border rounded-t-[12px] hidden lg:block">
                <div className="bg-BlueHomz h-[50px] text-[13px] flex items-center justify-center gap-2 font-[500] text-[#ffffff]  px-2 rounded-t-[12px]">
                    <div className="w-[30%]">File Header</div>
                    <div className="w-[40%]">Data</div>
                    <div className="w-[40%]">Tenant Attribute</div>
                </div>
                <div className="overflow-y-auto scrollbar-containerII max-h-[calc(100vh-60vh)] lg:max-h-[calc(100vh-50vh)]">
                    {data &&
                        data.map((data, index) => (
                            <div
                                key={index}
                                className={`border-b-[1px] items-start flex justify-center w-full gap-2 p-2`}
                            >
                                <div
                                    className="w-[30%] flex items-center"
                                >
                                    <div className="text-GrayHomz font-[500] text-[13px] text-start" >[{data?.fileHeader}]</div>
                                </div>
                                <div className="w-[40%]">
                                    {/* Display data with "Show More" functionality */}
                                    {(expandedItems[index]
                                        ? data?.data
                                        : data?.data.slice(0, 3)
                                    ).map((subItem, subIndex) => (
                                        <div
                                            className="text-GrayHomz font-[500] mt-1 text-[13px] text-start"
                                            key={subIndex}
                                        >
                                            {subItem}
                                        </div>
                                    ))}

                                    {/* Show "Show More" or "Show Less" */}
                                    {data?.data.length > 3 && (
                                        <button
                                            className="text-blue-500 font-semibold mt-2 text-[13px]"
                                            onClick={() => toggleShowMore(index)}
                                        >
                                            {expandedItems[index] ? "Show Less" : "Show More"}
                                        </button>
                                    )}
                                </div>
                                <div
                                    className=" px-2 h-[60px] w-[40%]"
                                >
                                    <DropDown
                                        options={attributes}
                                        fileheader={data?.fileHeader}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="overflow-y-auto scrollbar-containerII max-h-[calc(100vh-60vh)] lg:max-h-[calc(100vh-50vh)] mt-2">
                {data &&
                    data.map((data, index) => (
                        <div
                            key={index}
                            className={`lg:hidden items-start flex flex-col justify-center w-full gap-2 pb-2 bg-[#F6F6F6] mb-2`}
                        >
                            <div
                                className="w-full px-3 flex items-center h-[40px] bg-BlueHomz justify-start text-white"
                            >
                                <div className="font-[500] text-[13px] text-start" >[{data?.fileHeader}]</div>
                            </div>

                            <div
                                className="w-full px-3 bg-[#F6F6F6] flex flex-col gap-2"
                            >
                                {/* Display data with "Show More" functionality */}
                                {(expandedItems[index]
                                    ? data?.data
                                    : data?.data.slice(0, 3)
                                ).map((subItem, subIndex) => (
                                    <div className="text-GrayHomz font-[500] mt-1 text-[13px] text-start"
                                        key={subIndex}
                                    >
                                        {subItem}
                                    </div>
                                ))}
                                {/* Show "Show More" or "Show Less" */}
                                {data?.data.length > 3 && (
                                    <button
                                        className="text-blue-500 font-semibold mt-2 text-[13px]"
                                        onClick={() => toggleShowMore(index)}
                                    >
                                        {expandedItems[index] ? "Show Less" : "Show More"}
                                    </button>
                                )}
                                <div
                                    className="h-[60px] w-full"
                                >
                                    <DropDown
                                        options={attributes}
                                        fileheader={data?.fileHeader}
                                        onSelect={handleSelect}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='w-full mt-4 text-[16px] font-[500] text-GrayHomz flex flex-col lg:flex-row gap-2 lg:gap-0 lg:items-center justify-between'>
                <div className='hidden lg:block'>
                    {selectedAttributes ? Object.keys(selectedAttributes)?.length : 0} Columns
                    <span className='font-[400] pl-0.5 pr-1'>
                        to be imported
                    </span>
                    |
                    <span className='text-[#D92D20] pr-0.5 pl-1'>
                        {data ? data?.length - (selectedAttributes ? Object.keys(selectedAttributes)?.length : 0) : 0} Columns
                        <span className='text-[#DF5045] font-[400] pl-0.5'>
                            not mapped
                        </span>
                    </span>
                </div>
                <div className='lg:hidden'>
                    <span>
                        {selectedAttributes ? Object.keys(selectedAttributes)?.length : 0} Columns
                        <span className='font-[400] pl-0.5'>
                            to be imported
                        </span>
                    </span>
                    <br />
                    <span>
                        <span className='text-[#D92D20]'>
                            {data ? data?.length - (selectedAttributes ? Object.keys(selectedAttributes)?.length : 0) : 0} Columns
                            <span className='text-[#DF5045] font-[400] pl-0.5 mt-1'>
                                not mapped
                            </span>
                        </span>
                    </span>
                </div>
                <div className='flex flex-col-reverse lg:flex-row gap-2 lg:items-center '>
                    <button
                        onClick={handlePageChange}
                        onMouseEnter={() => setArrowColor(true)}
                        onMouseLeave={() => setArrowColor(false)}
                        className='p-1 lg:p-2 hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz'>
                        <span className="flex justify-center items-center gap-2">
                            {arrowColor ? <ArrowLeft className="#006AFF" /> : <ArrowLeft />}
                            Back </span>
                    </button>
                    <button
                        onClick={() => {
                            setShowMappingSummaryModal(true)
                            setOpenMapping(false)
                        }}
                        onMouseEnter={() => setActive(true)}
                        onMouseLeave={() => setActive(false)}
                        className={`${isValid ? " bg-BlueHomz text-white" : "bg-GrayHomz6 text-GrayHomz5 pointer-events-none"} rounded-[4px]  px-4 py-3 lg:px-3 lg:py-2 hover:text-BlueHomz hover:border hover:border-BlueHomz hover:bg-white font-[500] text-[14px] flex justify-center  items-center gap-1`}>
                        {active ?
                            isValid ?
                                <Import className='#006aff' /> :
                                <Import className='#d5d5d5' />
                            : isValid ?
                                <Import className='#ffffff' /> :
                                <Import className='#d5d5d5' />
                        }
                        Import data
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DataMapping