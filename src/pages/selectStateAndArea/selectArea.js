"use client"
import useAreaStore from '@/store/useStateAndAreaStore/useAreaStore';
import React, { useEffect } from 'react'
import Select from 'react-select';

const SelectArea = ({ selectedArea, setSelectedArea, state, placeholder }) => {
    console.log(state)

    const { loading, success, error, data, chooseArea } = useAreaStore();

    useEffect(() => {
        chooseArea(state);
    }, [state]);

    console.log(data);


    const handleChange = (selectedOption) => {
        setSelectedArea(selectedOption);
    };

    const options = data?.data?.data?.map((state) => ({
        value: state,
        label: `${state}`,
    }));

    return (
        <div className=''>
            <Select
                value={selectedArea}
                onChange={handleChange}
                options={options}
                placeholder={ placeholder ? placeholder : "Select Area..."}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        height: '45px', // Set desired height here
                        borderRadius: '6px', // Add border radius
                        backgroundColor: 'transparent', // Set background color to transparent
                        cursor: 'pointer', 
                        borderColor: state.isFocused ? 'grey' : '',
                        '&:hover': {
                            borderColor: '', // Change border color on hover
                        },
                    }),
                    indicatorSeparator: (base) => ({
                        ...base,
                        backgroundColor: '', // Customize the color of the separator line
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        color: 'grey', // Customize the color of the dropdown indicator arrow
                    }),
                    // menu: (base) => ({
                    //     ...base,
                    //     maxHeight: '100px', // Set maximum height for the dropdown menu
                    //     overflowY: 'auto', // Allow vertical scrolling if needed
                    //     '&::-webkit-scrollbar': {
                    //         display: 'none', // Hide the scrollbar
                    //     },
                    // }),
                }}
            />
        </div>
    );
}

export default SelectArea


