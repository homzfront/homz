import React from "react";
import UserTable from './components/UserTable.js';

const UserPage = () => {
  return (
    <div className="flex gap-7 flex-col">
    
      <div className=''>
      <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
