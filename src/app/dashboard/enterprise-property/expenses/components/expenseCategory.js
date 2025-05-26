import React from 'react'
import Dropdown from "./dropDown";
import useExpenseStore from '@/store/enterpriseStore/useExpenseStore';

const ExpenseCategory = ({ setFormData, formData }) => {
    const { categories, loadingCate } = useExpenseStore()
    
    const options = []

    return (
        <div className={`${loadingCate && "pointer-events-none animate-pulse"}`}>
            <label className="block text-sm font-medium">
                Expense Category <span className="text-error">*</span>
            </label>
            <div className="w-full mt-0.5">
                <Dropdown
                    options={categories ? categories?.map((data)=> data.categoryName) : options}
                    selectOption="Select an option"
                    onSelect={(selectedOption) => setFormData({ ...formData, expenseCategory: selectedOption })}
                    value={formData.expenseCategory}
                    border={"border-[#a9a9a9]"}
                    className={"w-full"}
                />
            </div>
        </div>
    )
}

export default ExpenseCategory