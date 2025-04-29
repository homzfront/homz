import React from 'react'
import Pagination from "@/components/general/pagination";
import Image from 'next/image';
import Verified from '@/components/icons/verified';
import EmptyAvatar from '@/components/icons/emptyAvatar';
import StatusDropdown from "../../components/statusDropDown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addCommasToNumber from "@/utils/addCommasToNumber";
import { updatePaymentStatusTenant } from "@/api/tenantSevice";
import lowerCaseData from "@/utils/lowerCaseData";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useClickOutside from "@/utils/clickOutside";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import truncateText from "@/utils/truncateText";
import PrintableTenantdData from "./printableTenantdData";
import PopUpMenuTwo from '../components/popUpMenuTwo';
import ModalTwo from '../components/modalTwo';
import useTenantOfAnEstate from '@/store/enterpriseStore/useTenantOfAnEstate';
import api from '@/utils/api';


const Table = ({
    widthRa,
    tenantData,
    loading,
    totalPages,
    setCurrentPage,
    currentPage,
    printableRef,
    fetchDataAgain,
    visibleColumns,
    mainTenantData,
    singleEstate
}) => {
    const [selectedDataId, setSelectedDataId] = React.useState(null);
    const { estateData } = useTenantOfAnEstate()
    const [selectedData, setSelectedData] = React.useState(null);
    const [popUpMenuTwo, setPopUpMenuTwo] = React.useState(false);
    const [successful, setSuccessful] = React.useState(false);
    const [openDropdowns, setOpenDropdowns] = React.useState({});
    const [selectedStatus, setSelectedStatus] = React.useState({});
    const [loadingRows, setLoadingRows] = React.useState({});
    const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
    const dropdownRefII = useClickOutside(() => setOpenDropdowns({}));
    const [hoveredRow, setHoveredRow] = React.useState(null);
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [openInvite, setOpenInvite] = React.useState(false);
    // const [activeFour, setActiveFour] = useState(false);
    const dropdownRefYan = useClickOutside(() => setOpenInvite(false));

    const handleMouseEnter = (id) => {
        setHoveredRow(id);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const firstThreePages = [1, 2, 3];
    const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

    const handleStatusChange = async (status, dataId, id, duration, row) => {
        setLoadingRows((prev) => ({ ...prev, [dataId]: true }));
        const mainValue = mainTenantData?.[0]?.data?.filter((data) => data._id === row?._id)
        try {
            const data = await updatePaymentStatusTenant({
                id,
                status: lowerCaseData(status),
                duration: row?.rentInfo?.duration,
                periods: mainValue?.[0]?.rentInfo?.periods
            });
            toast.success("status updated successfully");
            // Close the corresponding dropdown
            setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
            fetchDataAgain();
        } catch (error) {
            toast.error(error?.response?.data?.error?.message)
        }
        finally {
            setLoadingRows((prev) => ({ ...prev, [dataId]: false }));
        }
    };

    const toggleDropdown = (dataId) => {
        setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
    };

    const handleToggleMenu = (id, data) => {
        setPopUpMenuTwo(!popUpMenuTwo);
        setSelectedData(data)
        setSelectedDataId(id);
    };

    const handleInvite = async () => {
        // e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await api.post(
                `/tenants/invitation/estate/${estateData?._id}/send-email-tenant-upload/${selectedData?._id}`,
                {
                    estateName: selectedData?.estateId?.name,
                    tenantName: selectedData?.fullName,
                    tenantEmail: selectedData?.user?.email ? selectedData?.user?.email : email
                }
            );

            if (response.data.statuscode === 201 || 200) {
                // toast.success("update successful");
                setSuccessful(true);
            } else {
                const error = response.data.message;
                toast.error("update falied");
            }
        } catch (error) {
            // console.log(error?.response?.data?.message)
            if (error && error?.response?.data?.error?.errors) {
                // Assign backend errors to state
                const error = error?.response?.data?.error?.errors
                toast.error(error);
            } else if (error && error?.response?.data?.message) {
                // If there's a general message
                const error = error?.response?.data?.message
                toast.error(error);
            } else {
                // If the error is not in the expected format, rethrow it
                throw error;
            }
        } finally {
            setIsLoading(false)
        }
    };

    // Map header keys to data keys
    const headerToDataKey = {
        "Tenant": "fullName",
        "Property": "estateId.name",
        "Apartment No": "rentInfo.apartmentNumber",
        "Address": "estateId.address",
        "Email": "user.email",
        "Phone No": "phoneNumber",
        "Rent Periods": "rentInfo.periods.length",
        "Current Rent Period": "1",
        "Rent Duration (CRP)": "rentInfo.duration",
        "Rent Amount (CRP)": "rentInfo.rent",
        "Status (CRP)": "rentInfo.paymentStatus",
        // Dynamic period columns will be handled separately
    };

    // Get nested property from object
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((o, p) => (o || {})[p], obj);
    };

    const renderCellContent = (header, row) => {
        if (loading) {
            return <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div>;
        }

        // Handle dynamic rent period columns
        const periodMatch = header?.match(/Rent Period (\d+)|Rent Duration \(RP(\d+)\)|Rent Amount \(RP(\d+)\)|Status \(RP(\d+)\)/);
        if (periodMatch) {
            const periodIndex = parseInt(periodMatch[1] || periodMatch[2] || periodMatch[3] || periodMatch[4]) - 1;
            const period = row?.rentInfo?.periods?.[periodIndex];

            if (!period) return "______";

            if (header?.startsWith("Rent Period")) {
                return `${changeBackendDateFormat(period?.startDate)} - ${changeBackendDateFormat(period?.dueDate)}`;
            } else if (header.startsWith("Rent Duration")) {
                return `${period.duration} ${period?.durationLength}`;
            } else if (header.startsWith("Rent Amount")) {
                return (
                    <>
                        <span style={{ fontFamily: "Arial" }}>₦</span>
                        {addCommasToNumber(period?.rent)}
                    </>
                );
            } else if (header.startsWith("Status")) {
                return (
                    <StatusDropdown
                        setSelectedStatus={(status) =>
                            setSelectedStatus((prev) => ({
                                ...prev,
                                [row._id]: status,
                            }))
                        }
                        value={capitalizeFirstLetter(period?.paymentStatus)}
                        selectedStatus={selectedStatus[row?._id] || null}
                        isOpen={openDropdowns[row?._id] || false}
                        toggleDropdown={() => { }}
                        loading={loadingRows[row?._id] || false}
                        dropdownRef={dropdownRefII}
                    />
                );
            }
        }

        // Handle special cases
        switch (header) {
            case 'Tenant':
                return (
                    <div className="flex items-center gap-1 text-GrayHomz4 font-[500]">
                        {!row?.coverPhoto?.url ? (
                            <div className="max-w-[40%] h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                                <EmptyAvatar />
                            </div>
                        ) : (
                            <Image
                                src={row?.coverPhoto?.url}
                                alt=""
                                width={40}
                                height={40}
                                layout="full"
                                objectFit="cover"
                                objectPosition="center"
                                className="object-cover bg-center h-[40px] rounded-full"
                                priority
                            />
                        )}
                        <span className="w-[60%] md:w-auto">{row?.fullName || "______"}</span>
                    </div>
                );

            case 'Address':
                return (
                    <div onMouseEnter={() => handleMouseEnter(row?._id)}
                        onMouseLeave={handleMouseLeave}
                        className="w-full relative">
                        {truncateText(row?.estateId?.address, 45)}
                        {hoveredRow === row?._id && (
                            <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-xs w-max">
                                {row?.estateId?.address}
                            </span>
                        )}
                    </div>
                );

            case 'Apartment No':
                return row?.rentInfo?.apartmentNumber ? `Apartment ${row?.rentInfo.apartmentNumber}` : "______";

            case 'Current Rent Period':
                const currentPeriod = row?.rentInfo?.startDate === undefined ? null : row?.rentInfo;
                return currentPeriod
                    ? `${changeBackendDateFormat(currentPeriod?.startDate)} - ${changeBackendDateFormat(currentPeriod?.dueDate)}`
                    : "______";

            case 'Rent Duration (CRP)':
                const crp = row?.rentInfo?.duration === undefined ? null : row?.rentInfo?.duration
                return crp > 0 ? `${crp} ${crp === 1 ? "month" : "months"}` : "______";

            case 'Rent Amount (CRP)':
                const activeRent = row?.rentInfo.rent === undefined ? null : row?.rentInfo.rent
                return activeRent ? (
                    <>
                        <span style={{ fontFamily: "Arial" }}>₦</span>
                        {addCommasToNumber(activeRent)}
                    </>
                ) : "______";

            case 'Status (CRP)':
                const activeStatus = row?.rentInfo?.paymentStatus === undefined ? null : row?.rentInfo?.paymentStatus
                return activeStatus ? (
                    <StatusDropdown
                        setSelectedStatus={(status) =>
                            setSelectedStatus((prev) => ({
                                ...prev,
                                [row._id]: status,
                            }))
                        }
                        value={capitalizeFirstLetter(activeStatus)}
                        selectedStatus={selectedStatus[row._id] || null}
                        handleStatusChange={(status) =>
                            handleStatusChange(status, row._id, row?.rentInfo?._id, activeStatus, row)
                        }
                        isOpen={openDropdowns[row?._id] || false}
                        toggleDropdown={() => toggleDropdown(row?._id)}
                        loading={loadingRows[row?._id] || false}
                        dropdownRef={dropdownRefII}
                    />
                ) : "______";

            case 'Actions':
                return (
                    <div className="relative bg-white w-[40%] pl-8">
                        <button onClick={() => handleToggleMenu(row?._id, row)}>
                            <Image
                                src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                alt=""
                                height={21}
                                width={20}
                                style={{ height: "auto", width: "auto" }}
                                className='z-10 min-w-[10px]'
                            />
                        </button>
                        {popUpMenuTwo && selectedDataId === row?._id && (
                            <PopUpMenuTwo dropdownRef={dropdownRef} data={row?._id} email={row?.user?.email} handleInvite={handleInvite} loading={isLoading} singleEstate={singleEstate} setOpenInvite={setOpenInvite} />
                        )}
                    </div>
                );

            default:
                // Handle other columns using the mapping
                const dataKey = headerToDataKey[header];
                if (dataKey) {
                    const value = getNestedValue(row, dataKey);
                    return value !== undefined && value !== null ? value?.toString() : "______";
                }
                return "______";
        }
    };

    return (
        <div className='w-full'>
            {/* Column visibility dropdown */}
            {/* <div className="mb-4">
                <label className="mr-2">Visible Columns:</label>
                <select
                    multiple
                    className="border p-2 rounded"
                    value={visibleColumns}
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                        selectedOptions.forEach((column) => toggleColumnVisibility(column));
                    }}
                >
                    {allColumns.map((column) => (
                        <option
                            key={column}
                            className={visibleColumns.includes(column) ? "bg-successBg" : "bg-whiteblue"}
                            value={column}
                        >
                            {column}
                        </option>
                    ))}
                </select>
            </div> */}

            {
                openInvite && (
                    <div className="fixed top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <ModalTwo
                            dropdownRef={dropdownRefYan}
                            setEmail={setEmail}
                            handleInvite={handleInvite}
                            loading={isLoading}
                            email={email}
                        />
                    </div>
                )}

            {successful &&
                <div className="fixed top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="md:max-w-[464px] bg-white rounded-[8px] ">
                        <div className="md:w-[464px] px-8 py-6 flex flex-col justify-center items-center gap-5">
                            <Image
                                src={
                                    "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                                }
                                alt=""
                                height={48}
                                width={48}
                            />
                            <h1 className="text-BlackHomz font-semibold text-[20px]">
                                Success! Invitation Sent
                            </h1>
                            <p className='text-GrayHomz font-normal text-[16px]'>
                                Your invitation link has been sent to <span className='font-medium'>{selectedData?.fullName ?? "[Tenant's Email]"}</span> to join <span className='font-medium'>{selectedData?.estateId?.name ?? "[Property Name]"}</span>
                            </p>
                            <button
                                onClick={() => setSuccessful(false)}
                                className="h-[48px] rounded-md w-full hover:border hover:border-BlueHomz text-BlueHomz text-[16px] font-[700]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            }

            <div className={`${widthRa >= 1440 ? "md:max-w-[1130px] " : widthRa >= 1375 ? "md:max-w-[1080px] " : "md:max-w-[1045px]"} max-w-[350px] w-full md:w-auto`}>
                <div className={`w-full overflow-x-auto scrollbar-container`}>
                    <div className="w-[800%] md:w-[450%]">
                        <div className="w-full border rounded-t-[12px]">
                            {/* Table Headers */}
                            <div className="bg-whiteblue h-[60px] text-[11px] grid justify-center items-center font-[500] text-BlackHomz px-2 rounded-t-[12px]"
                                style={{ gridTemplateColumns: `repeat(${visibleColumns?.length}, minmax(100px, 1fr))` }}
                            >
                                {visibleColumns && visibleColumns?.map(header => (
                                    <div key={header} className="">
                                        {header === "Actions" ? "" : header}
                                    </div>
                                ))}
                            </div>


                            {/* Table Body */}
                            <div className='text-[11px] font-normal text-GrayHomz'>
                                {tenantData && tenantData?.map((row, rowIndex) => (
                                    <div
                                        key={row?._id || rowIndex}
                                        className="relative border-b-[1px] grid justify-center items-center w-full px-2 h-[60px]"
                                        style={{ gridTemplateColumns: `repeat(${visibleColumns?.length}, minmax(100px, 1fr))` }}
                                    >
                                        {visibleColumns && visibleColumns?.map(header => (
                                            <div key={`${row?._id}-${header}`} className="">
                                                {renderCellContent(header, row)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-2'>
                    {tenantData && tenantData?.length >= 1 && (
                        <Pagination
                            firstThreePages={firstThreePages}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handleNext={handleNext}
                            handlePageClick={handlePageClick}
                            handlePrev={handlePrev}
                            lastThreePages={lastThreePages}
                            padding='px-0'
                        />
                    )}
                </div>
                <div style={{ display: 'none' }}>
                    <PrintableTenantdData
                        printableRef={printableRef}
                        Data={tenantData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Table;