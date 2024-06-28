import Image from 'next/image';
import React from 'react'

const MiniPhotoFrame = ({
    houses,
    add,
    displayHousePic,
    uploadFile2,
    errorMsg,
    fileUploads,
    secondDisplay,
  }) => {
    const mapHouse = secondDisplay ? houses.slice(2) : houses.slice(0, 2);
  
    return (
      <div className="sm:space-y-4 w-fit">
        {!secondDisplay && (
          <>
            <label
              htmlFor="others"
              className="text-[13px] font-[500] leading-[19.5px]"
            >
              Other photos
            </label>
            <br />
          </>
        )}
        {/* Render each house dynamically */}
        <div
          className={`h-fit grid-cols-3 sm:grid-cols-6 flex flex-wrap gap-[15px] w-fit mt-2 md:mt-0`}
        >
          {mapHouse.map((house, index) => {
            // Calculate the actual index in the original houses array
            const actualIndex = secondDisplay ? index + 2 : index;
  
            return (
              <div
                className={`md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer flex-col photos`}
                key={actualIndex}
              >
                <form
                  encType="multipart/form-data"
                  method="put"
                >
                  <input
                    type="file"
                    name="HousePic"
                    ref={(el) => (fileUploads.current[actualIndex] = el)}
                    id={`uploadImage${actualIndex}`}
                    onChange={(e) => displayHousePic(e, actualIndex)}
                    style={{ display: "none" }}
                    accept="image/jpg, image/png, image/jpeg"
                  />
                  {house ? (
                    <Image
                      onClick={() => uploadFile2(actualIndex)}
                      src={house}
                      alt="photos"
                      className="md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px]"
                      width={120}
                      height={120}
                    />
                  ) : (
                    <Image
                      src={add}
                      alt="Photo"
                      className="w-[38px] h-[38px] rounded-[14.13px]"
                      onClick={() => uploadFile2(actualIndex)}
                      width={48}
                      height={48}
                    />
                  )}
                </form>
                <p className="text-[11px] text-red-600 pl-3">{errorMsg[actualIndex]}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default MiniPhotoFrame