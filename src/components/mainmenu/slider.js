import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const SliderComponent = ({ users }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "1%", // Set centerPadding to 0 for the first slide
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mt-[60px] max-w-[1299px]  m-auto px-6 relative">
      <div className="ml-[3%]">
        <Slider {...sliderSettings}>
          {users.map((user) => (
            <div key={user.id}>
              <div className="h-auto flex flex-col-reverse sm:flex-row max-w-[460px] sm:max-w-full md:max-w-[820px] lg:max-w-full xl:max-w-[1308px] mr-0  sm:mr-4  rounded-[40px] border">
                <div className="sm:h-auto xl:h-[30vh]">
                  <div className="flex flex-col gap-3 xl:gap-4 w-full justify-start px-8 sm:px-12 my-6 sm:my-0">
                    <div className="star-rating sm:mt-14">
                      {[...Array(5)].map((index) => {
                        return (
                          <span key={index} className="text-BlueHomz text-2xl">
                            &#9733;
                          </span>
                        );
                      })}
                    </div>
                    <h1 className="font-[500] h-auto text:[24px] sm:text-[13px] lg:text-[22px] xl:text-[36px] mb-1 md:mb-0 xl:mb-4 text-BlackHomz">
                      {user.content}
                    </h1>
                    <div>
                      <p className="font-[500] text-[14px] sm:text-[11px] lg:text-[16px] xl:text-[18px] text-BlackHomz">
                        - {user.name}
                      </p>
                      <p className="xl:mt-3 mt-0 mb-4 sm:mb-4 font-[500]  text-[14px] sm:text-[9px] lg:text-[14px] xl:text-[16px] text-GrayHomz">
                        {user.position}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[480px] h-auto">
                  <div className="sm:bg-cover sm:bg-center">
                    <Image
                      src={user.image}
                      alt="img"
                      width={4096}  // Specify the desired width
                      height={2731}
                      layout="full" // Specify the desired height
                      objectFit="cover"
                      objectPosition="center"
                      className="object-cover bg-center w-[480px] h-[286px] sm:h-[464px] rounded-[40px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="sm:hidden mt-[80px] flex flex-col gap-4">
        <Link href={"/register"}>
          <button className=" w-[100%] h-[48px] text-[16px]  rounded-md font-normal hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz  text-white  bg-BlueHomz  px-2 py-1">
            Get started
          </button>
        </Link>
        <Link href={"/contact-page"}>
          <button className=" w-[100%] h-[48px] text-[16px] rounded-md font-normal hover:bg-BlueHomz hover:text-white text-BlueHomz  border border-BlueHomz bg-transparent px-2 py-1">
            Contact us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SliderComponent;
