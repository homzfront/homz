import ArrowRightBlue from '@/components/icons/arrowRightBlue';
import ArrowWhiteBig from '@/components/icons/arrowWhiteBig';
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderTwo = ({ DocSolution, handleSelectDocument, setHover, hover }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "linear",
        autoplaySpeed: 3000,
    };

    return (
        <div className="md:hidden mt-10">
            <Slider {...settings}>
                {DocSolution.map((data) => (
                    <div key={data.id}>
                        <div
                            onClick={() => handleSelectDocument(data.title)}
                            onMouseEnter={() => { setHover(data.id) }}
                            onMouseLeave={() => { setHover(null) }}
                            className={`cursor-pointer bg-whiteblue hover:bg-BlueHomz group rounded-[12px] px-4 py-8 flex flex-col justify-between items-center h-auto min-h-[260px] w-[320px]`}
                        >
                            <div className='flex flex-col gap-2 w-full justify-center items-center'>
                                <div className='w-[45px] h-[45px] rounded-full bg-white flex justify-center items-center'>
                                    {data.image}
                                </div>
                                <p className='text-[20px] font-[600] text-BlackHomz group-hover:text-white text-center'>
                                    {data.title}
                                </p>
                                <p className='text-[18px] font-[400] text-GrayHomz group-hover:text-white text-center'>
                                    {data.body}
                                </p>
                            </div>
                            <div className='mt-2'>
                                {
                                    hover && hover === data.id ?
                                        <div className='flex items-center justify-center'>
                                            <ArrowWhiteBig />
                                        </div>
                                        :
                                        <div className='flex items-center justify-center gap-1'>
                                            <p className='text-[16px] font-[500] text-BlueHomz group-hover:text-white'>
                                                Generate
                                            </p>
                                            <ArrowRightBlue />
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='mt-4 w-[320px] flex justify-center items-center'>
                            {data.video}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SliderTwo