"use client"
import React, { useEffect, useState } from "react";
import FileUpload from "./components/fileUpload";
import UpdateButton from "../components/updateButton";


const ProfilePicture = () => {
  return (
    <div className="mt-8">
      <div className="">
        <FileUpload/>
      </div>
     <UpdateButton/>
    </div>
  );
};

export default ProfilePicture;
