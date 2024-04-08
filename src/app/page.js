import React from "react";
import UserTable from './user/components/UserTable';

const User = () => {
  return (
    <div className="flex gap-7 flex-col">
    
      <div className=''>
      <UserTable />
      </div>
    </div>
  );
};

export default User;
