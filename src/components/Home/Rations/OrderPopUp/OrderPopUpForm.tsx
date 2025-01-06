import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { rationsT } from "../../../../api/getRation";
import RationDescriptionPopUp from "./RationDescriptionPopUp";

interface Props {
    setOrderClick: (orderClick: boolean) => void;
    rationsData: rationsT;
    clickIndex: number;
}

const OrderPopUpForm = ({ setOrderClick, rationsData, clickIndex }: Props) => {
    /* Clicked Outside */
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOrderClick(false));

    /* Order button in desc */
    const [orderDesc, setOrderDesc] = useState<boolean>(false);

    return (
        <div
            ref={ref}
            className=" w-full md:max-w-[872px] px-8 py-8 mx-0 xs:mx-8 md:p-16  opacity-100 max-h-[100vh]  bg-white flex flex-col gap-6  relative  overflow-y-auto"
        >
            <div className="w-full flex flex-col items-center gap-[34px] md:gap-[34px]  md:flex-row md:items-start">
                <div className="hidden md:block relative overflow-hidden min-w-[50%] max-h-[450px] ">
                    <img
                        className="relative -top-14"
                        src={rationsData[clickIndex].image_big}
                        alt={rationsData[clickIndex].title}
                    />
                </div>

                <div className="relative self-start mt-6 overflow-hidden min-w-[70%] max-h-[350px] sm:max-h-[400px] md:hidden">
                    <img
                        className=" relative -top-14 "
                        src={rationsData[clickIndex].image_big}
                        alt={rationsData[clickIndex].title}
                    />
                </div>

                <div className="flex flex-col md:self-start md:max-w-[366px] ">
                    <h3 className="montserrat font-bold text-[20px] leading-[140%] text-nowrap">
                        {rationsData[clickIndex].title}
                    </h3>

                    <p className="montserrat text-[15px] text-addGray mt-1 ">
                        {rationsData[clickIndex].composition}
                    </p>

                    {!orderDesc ? (
                        <RationDescriptionPopUp
                            clickIndex={clickIndex}
                            rationsData={rationsData}
                            setOrderDesc={setOrderDesc}
                            orderDesc={orderDesc}
                        />
                    ) : (
                        <div className=""></div>
                    )}
                </div>
            </div>
            <button onClick={() => setOrderClick(false)}>
                <CloseIcon className="top-3 right-2 md:top-4 md:right-4 absolute min-h-[40px] min-w-[40px]" />
            </button>
        </div>
    );
};

export default OrderPopUpForm;
