"use client"
import React, { useState } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";
import api from "@/utils/api";
import useExpenseStore from "@/store/enterpriseStore/useExpenseStore";

const Dropdown = ({ value, options, onSelect, selectOption, className, border }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useClickOutside(() => setIsOpen(false)); // Use the custom hook
    const [showAdd, setShowAdd] = useState(false);
    const [addCategory, setAddCategory] = useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = useState(false)
    const { fetchCategory } = useExpenseStore();

    const handleDropdownToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleSubmitCategory = async () => {
        setLoading(true)
        setError(null)
        try {
            const payload = {
                categoryName: addCategory
            }
            const response = await api.post('/expense/enterprise/create-category', payload);
            if (response) {
                const response = await fetchCategory()
                setShowAdd(false)
                setAddCategory('')
            }
        }
        catch (error) {
            // console.error('Error submitting expense:', error);

            // Handle different error formats
            if (error.response) {
                // Axios-style error response
                const errorData = error.response.data;

                if (errorData?.error?.errors) {
                    // Back-end validation errors
                    setError(
                        Object.values(errorData.error.errors).join(', ')
                    );
                } else if (errorData?.message) {
                    // General error message
                    setError(errorData.message);
                } else {
                    setError('Failed to create category. Please try again.');
                }
            } else {
                // Network or other errors
                setError(error.message || 'An unexpected error occurred');
            }
        } finally {
            setLoading(false)
        }
    };


    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <div
                className={`text-BlackHomz px-4 border h-[45px] p-3 rounded-[4px] cursor-pointer ${border}`}
                onClick={handleDropdownToggle}
            >
                <div className="flex items-center justify-between">
                    <span className={`mr-2 ${(selectedOption?.label || selectedOption) || value ? "text-BlackHomz" : "text-GrayHomz2"}`}>{(selectedOption?.label ? selectedOption.label : selectedOption ? selectedOption : value ? value : selectOption)}</span>
                    <div className={`w-5 h-5`}>
                        {isOpen ?
                            <ArrowUpII className="#4E4E4E" /> :
                            <ArrowDown className="#4E4E4E" />
                        }
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className=" absolute z-20 top-14 w-full text-GrayHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
                    {(options && options?.length > 0) && options.map((option, index) => (
                        <div
                            key={index}
                            className=" p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label ?? option}
                        </div>
                    ))}
                    <button
                        onClick={() => setShowAdd(!showAdd)}
                        className=" p-2 text-sm font-medium text-BlueHomz mx-2 mb-2 rounded-md"
                    >
                        <span className="text-[18px] mr-1 mt--0.5">+</span> Add New Category
                    </button>
                    {error && <span className='px-4 py-2 text-xs font-normal text-error italic'>{error}</span>}
                    {
                        showAdd &&
                        <div className={`flex items-center gap-4 mb-2 px-4 pb-2 ${loading && "animate-pulse pointer-events-none"}`}>
                            <input
                                type="text"
                                value={addCategory}
                                onChange={(e) => setAddCategory(e.target.value)}
                                className="h-[44px] px-2 rounded-[8px] w-full outline-none border"
                            />
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        handleSubmitCategory()
                                    }}
                                    type="button"
                                    name="addCategory"
                                    className={`text-BlueHomz min-w-[30px] hover:text-BlueHomz4`}>Add
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAdd(false)
                                    }}
                                    type="button"
                                    className={`text-[#D92D20] min-w-[30px] hover:text-[#d1655d]`}>Delete
                                </button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default Dropdown;
