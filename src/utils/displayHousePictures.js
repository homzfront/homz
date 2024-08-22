const DisplayHousePic = (e, index,imagesFiles,setImagesFiles,errorMsg, setErrorMsg,houses,setHouses) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      if (
        imagesFiles.some(
          (house) => house.name === file.name && house.size === file.size
        )
      ) {
        const newErrorMsg = [...errorMsg];
        newErrorMsg[index] = "Image already selected";
        setErrorMsg(newErrorMsg);
        return;
      }
      // Check for duplicate file

      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        const newErrorMsg = [...errorMsg];
        newErrorMsg[index] = "Only, JPG, JPEG or PNG files are allowed.";
        setErrorMsg(newErrorMsg);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit
        const newErrorMsg = [...errorMsg];
        newErrorMsg[index] = "Photo size exceeds 5MB.";
        setErrorMsg(newErrorMsg);
        return;
      } else {
        setImagesFiles((prev) => [...prev, file]);
        const newErrorMsg = [...errorMsg];
        newErrorMsg[index] = "";
        setErrorMsg(newErrorMsg);
        const newImages = [...houses];
        newImages[index] = URL.createObjectURL(file);
        setHouses(newImages);
      }
    }
  };

  export default DisplayHousePic;