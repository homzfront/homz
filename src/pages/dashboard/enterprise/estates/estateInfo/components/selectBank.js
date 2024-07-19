import React, { useState } from 'react';
import Select from 'react-select';

const BankSelect = ({ banks, selectedBank, setSelectedBank , setErrorName
}) => {
  

  const handleChange = (selectedOption) => {
    setSelectedBank(selectedOption);
    setErrorName('')
  };

  const options = banks?.map((bank) => ({
    value: bank?.name,
    label: `${bank?.name}`,
  }));

  return (
    <div className='h-[45px]'>
      <Select
        value={selectedBank}
        onChange={handleChange}
        options={options}
        placeholder="e.g Access Bank"
        className='scrollbar-container'
      />
    </div>
  );
};

export default BankSelect;
