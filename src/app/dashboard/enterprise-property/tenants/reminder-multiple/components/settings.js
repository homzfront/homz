import React, { useState } from 'react'
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import CustomizeSettings from './customizeSettings';

const Settings = () => {
    const [modalCustom, setModalCustom] = useState(false);
    const [customizeSettings, setCustomizeSettings] = useState(false);

    return (
        <div>
            <CustomizeModal isOpen={modalCustom}>
                <div className="max-w-[464px] p-2 m-auto bg-white md:h-[245px] rounded-md">
                    <div className="flex flex-col justify-around items-center h-full p-6">
                        <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                            Change System Settings
                        </h1>
                        <p className="text-[16px] font-[500] text-GrayHomz text-center">
                            Are you sure you want to change the system’s default settings?
                        </p>
                        <button
                            onClick={() => {
                                setCustomizeSettings(true)
                                setModalCustom(false)
                            }}
                            className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
                        >
                            Proceed
                        </button>
                        <button
                            onClick={() => setModalCustom(false)}
                            className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </CustomizeModal>
            {
                customizeSettings ?
                    <div>
                        <CustomizeSettings setCustomizeSettings={setCustomizeSettings} />
                    </div>
                    :
                    <div>
                        <div className='flex justify-between border-b py-4 w-[100%]'>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Time
                                </p>
                                <p className='text-[13px] font-[400] text-BlackHomz'>
                                    Rent reminder will be sent out to tenants at this time
                                </p>
                            </div>
                            <div className='w-[50%]'>
                                <div className='w-[230px] py-3 pl-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[500]'>
                                        12 : 00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between border-b py-4 w-[100%]'>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Reminder channel(s)
                                </p>
                                <p className='text-[13px] font-[400] w-[70%] text-BlackHomz'>
                                    Rent reminder(s) will be sent to your tenants through these channels
                                </p>
                            </div>
                            <div className='w-[50%]'>
                                <div className='w-[230px] py-3 pl-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[500]'>
                                        In-app, Email, SMS
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between border-b py-4 w-[100%]'>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Email Reminder Message
                                </p>
                                <p className='text-[13px] font-[400] text-BlackHomz'>
                                    Tenant(s) will receive this message in their emails
                                </p>
                            </div>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400]'>Subject</p>
                                </div>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400] text-justify'>
                                        Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed eros non elit.
                                        Leo mauris etiam leo fames nec pretium egestas fames volutpat. Ut aliquet tortor volutpat faucibus. Nunc etiam vulputate tincidunt tempor malesuada pharetra. Ut ullamcorper turpis arcu felis. Ut urna placerat sem sagittis. Dui eu vel sit bibendum. Velit nam diam malesuada nunc lorem mattis gravida nunc. In convallis a urna egestas justo dictumst cras. Aenean id eget sit risus posuere amet. Quam felis.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between border-b py-4 w-[100%]'>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    SMS Reminder Message
                                </p>
                                <p className='text-[13px] font-[400] text-BlackHomz'>
                                    Tenant(s) will receive this message
                                </p>
                            </div>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400]'>Subject</p>
                                </div>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400] text-justify'>
                                        Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='py-4 w-[100%]'>
                            <div className='flex justify-between'>
                                <div className='w-[50%] flex flex-col gap-2'>
                                    <p className='text-[14px] font-[500] text-BlueHomz'>
                                        In-App Reminder Message
                                    </p>
                                    <p className='text-[13px] font-[400] text-BlackHomz'>
                                        Tenant(s) will receive this message
                                    </p>
                                </div>
                                <div className='w-[50%] flex flex-col gap-2'>
                                    <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                        <p className='text-[14px] font-[400]'>Subject</p>
                                    </div>
                                    <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                        <p className='text-[14px] font-[400] text-justify'>
                                            Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed            </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setModalCustom(true)}
                                className='mt-4 text-[14px] font-[500] w-[155px] bg-BlueHomz text-white py-2 rounded-[4px]'>
                                Customize settings
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Settings;