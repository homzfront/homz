"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import PopUpMenuTwo from "./components/popUpMenuTwo";
import PopUpMenuFile from "./components/popUpMenuFile";

const MockData = [
  { name: "Tenant agreement.pdf", size: 15654 },
  { name: "Damage agreement.pdf", size: 20968 },
  // { name: "Document3.pdf", size: "3.1 MB" },
];

const PropertyDoc = ({ data }) => {
  const [mockData, setMockData] = useState(MockData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  
  const [clicked, setClicked] = useState(false);
  const fileUpload = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMockData([...mockData, file]); 
  };

  const deleteFile = (index) => {
    const updatedData = [...mockData];
    updatedData.splice(index, 1);
    setMockData(updatedData);
  };

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setClicked(!clicked);
    setSelectedDataId(id);
  };

  const uploadFile = (e) => {
    fileUpload.current.click();
  };

  const viewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // console.log('viewing')
    }
  };

  const downloadFile = (e) => {
    e.preventDefault();
    if (selectedFile) {
           const downloadUrl = URL.createObjectURL(selectedFile);
      downloadLink.current.href = downloadUrl;
      downloadLink.current.download = selectedFile.name;
      downloadLink.current.click();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      fetch("your-upload-api-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
            // Handle success
          } else {
            console.error("Failed to upload file");
            // Handle error
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error
        });
      //   console.log(formData);
    }
  };

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str; 
    } else {
      return str.substring(0, maxLength) + '...'; 
    }
  };
  
  function bytesToMegabytes(bytes) {
    return bytes / (1024 * 1024);
  }

  return (
    <div className="flex items-center gap-[1.5rem] flex-wrap">
      {mockData.map((file, index) => (
        <div key={index}>
          <div className="flex flex-col w-[182px] h-[197px] pt-[22px] pb-[12px] px-[16px] rounded-[12px] propertyDoc gap-[5px]">
            <div className="flex items-center justify-center pb-[20px]">
              <Image
                src="/static/images/document-text.svg"
                alt="document"
                className="w-[64px] h-[64px]"
                width={64}
                height={64}
              />
            </div>

            <div className="flex items-center gap-3 relative w-[149px]">
              <p className="text-[12px]">{truncateString(file.name, 30)}</p>

              <button onClick={() => handleToggleMenu(index)} className="ml-auto">
                <Image
                  src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                  alt=""
                  height={20}
                  width={20}
                  style={{ height: "auto", width: "auto" }}
                />
              </button>
            </div>
            <p className="text-blue-300 text-[11px]">PDF</p>
            <p className="text-[11px]">
              {bytesToMegabytes(file.size).toFixed(2)} MB
            </p>
            {popUpMenuTwo && selectedDataId === index && (
              <PopUpMenuTwo data={data} view={() => viewFile(file)} handleDelete={deleteFile} />
            )}
          </div>
        </div>
      ))}

      <div className=" flex flex-col items-center justify-center w-[182px] h-[197px] pt-[22px] pb-[12px] px-[16px] rounded-[12px] propertyDoc gap-[5px]">
        <form>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileUpload}
          />
          <div className="flex items-center justify-center pb-[20px]">
            {/* {!selectedFile && ( */}
            <div className="flex items-center justify-center flex-col ">
              <Image
                src="/static/images/add-square.svg"
                alt="document"
                className="w-[64px] h-[64px] cursor-pointer "
                width={64}
                height={64}
                onClick={uploadFile}
              />
              <p className="text-[13px] leading-[19.5px] text-center pt-3">
                Click to add new document
              </p>
              <p className="text-[10px] text-[#A9A9A9] leading-[15px] text-center">
                PDF (max. 3mb)
              </p>
            </div>
            {/* )} */}
          </div>
        </form>
      </div>

      {/* {popUpMenuFile && selectedFile && (
        <PopUpMenuFile data={data} click={clicked}  view={()=> viewFile()}/>
      )} */}
    </div>
  );
};

export default PropertyDoc;
