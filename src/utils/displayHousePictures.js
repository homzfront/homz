const DisplayHousePic = (
  e,
  index,
  imagesFiles,
  setImagesFiles,
  errorMsg,
  setErrorMsg,
  houses,
  setHouses,
  setPropertyPhotos
) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const file = e.target.files[0];

  if (file) {
    // Check for duplicate file
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

    // Validate file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      const newErrorMsg = [...errorMsg];
      newErrorMsg[index] = "Only JPG, JPEG, or PNG files are allowed.";
      setErrorMsg(newErrorMsg);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const newErrorMsg = [...errorMsg];
      newErrorMsg[index] = "Photo size exceeds 5MB.";
      setErrorMsg(newErrorMsg);
      return;
    } else {
      if (setPropertyPhotos) {
        setPropertyPhotos((prev) => {
          const newPropertyPhotos = [...prev];
          newPropertyPhotos[index] = file; 
          return newPropertyPhotos;
        });
      }
      // Update the image at the specified index if it exists
      if (imagesFiles[index]) {
        setImagesFiles((prev) => {
          const newImagesFiles = [...prev];
          newImagesFiles[index] = file; // Replace the file at the given index
          return newImagesFiles;
        });
      } else {
        // If no file exists at the index, append it
        setImagesFiles((prev) => [...prev, file]);
      }
    
      const newErrorMsg = [...errorMsg];
      newErrorMsg[index] = "";
      setErrorMsg(newErrorMsg);
    
      const newImages = [...houses];
      newImages[index] = URL.createObjectURL(file); // Update the image preview
      setHouses(newImages);
    }
    
  }
};

export default DisplayHousePic;
