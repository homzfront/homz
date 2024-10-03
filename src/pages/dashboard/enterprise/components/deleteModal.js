import LoadingFormII from "@/components/mainmenu/loadingFormII";
import React from "react";

const DeleteModel = ({
    header,
    body,
    returnHome,
    returnHomeTwo,
    button,
    buttonTwo,
    loading
}) => {
    return (
        <div>
            <div className="absolute px-8 md:px-0 top-0 z-20 h-screen w-full  inset-0 flex items-center  bg-black bg-opacity-30">
                <div className={`max-w-[464px] p-2 m-auto bg-white rounded-md ${loading ? "pointer-events-none" : ""}`}>
                    <div className="flex flex-col justify-around items-center h-full p-6">
                        <div className="">
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="4" width="48" height="48" rx="24" fill="#F2B9B5" />
                                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FDF2F2" stroke-width="8" />
                                <path d="M37.0736 21.23C35.4636 21.07 33.8536 20.95 32.2336 20.86V20.85L32.0136 19.55C31.8636 18.63 31.6436 17.25 29.3036 17.25H26.6836C24.3536 17.25 24.1336 18.57 23.9736 19.54L23.7636 20.82C22.8336 20.88 21.9036 20.94 20.9736 21.03L18.9336 21.23C18.5136 21.27 18.2136 21.64 18.2536 22.05C18.2936 22.46 18.6536 22.76 19.0736 22.72L21.1136 22.52C26.3536 22 31.6336 22.2 36.9336 22.73C36.9636 22.73 36.9836 22.73 37.0136 22.73C37.3936 22.73 37.7236 22.44 37.7636 22.05C37.7936 21.64 37.4936 21.27 37.0736 21.23Z" fill="#D92D20" />
                                <path d="M35.2317 24.14C34.9917 23.89 34.6617 23.75 34.3217 23.75H21.6817C21.3417 23.75 21.0017 23.89 20.7717 24.14C20.5417 24.39 20.4117 24.73 20.4317 25.08L21.0517 35.34C21.1617 36.86 21.3017 38.76 24.7917 38.76H31.2117C34.7017 38.76 34.8417 36.87 34.9517 35.34L35.5717 25.09C35.5917 24.73 35.4617 24.39 35.2317 24.14ZM29.6617 33.75H26.3317C25.9217 33.75 25.5817 33.41 25.5817 33C25.5817 32.59 25.9217 32.25 26.3317 32.25H29.6617C30.0717 32.25 30.4117 32.59 30.4117 33C30.4117 33.41 30.0717 33.75 29.6617 33.75ZM30.5017 29.75H25.5017C25.0917 29.75 24.7517 29.41 24.7517 29C24.7517 28.59 25.0917 28.25 25.5017 28.25H30.5017C30.9117 28.25 31.2517 28.59 31.2517 29C31.2517 29.41 30.9117 29.75 30.5017 29.75Z" fill="#D92D20" />
                            </svg>
                        </div>
                        <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                            {header}
                        </h1>
                        <p className="text-[16px] font-[500] text-GrayHomz text-center">
                            {body}
                        </p>
                        <button
                            onClick={
                                returnHome}
                            className={`mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500] ${loading ? "w-full flex justify-center" : ""}`}
                        >
                            {loading ? <LoadingFormII /> : button}
                        </button>
                        <button
                            onClick={
                                returnHomeTwo
                            }
                            className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                        >
                            {buttonTwo}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModel;
