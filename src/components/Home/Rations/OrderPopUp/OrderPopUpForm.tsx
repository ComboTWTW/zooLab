import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { rationsT } from "../../../../api/getRation";
import RationDescriptionPopUp from "./RationDescriptionPopUp";
import OrderForm from "./OrderForm";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
    setOrderClick: (orderClick: boolean) => void;
    rationsData: rationsT;
    clickIndex: number;
    setSelectFpcus: (selectFpcus: boolean) => void;
}

const OrderPopUpForm = ({
    setOrderClick,
    rationsData,
    clickIndex,
    setSelectFpcus,
}: Props) => {
    /* Clicked Outside */
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOrderClick(false));

    /* Order button in desc */
    const [orderDesc, setOrderDesc] = useState<boolean>(false);

    const [succSent, setSuccSent] = useState<boolean>(false);

    return (
        <div className="z-[51] w-full md:max-w-[900px]    px-8 py-8 md:px-8 md:py-8  xs:mx-8 md:p-16  opacity-100 max-h-[100vh]  bg-white flex flex-col gap-6  relative  overflow-y-auto">
            <div className="w-full flex  flex-col items-start  gap-[34px] md:gap-[34px]  md:flex-row md:items-start">
                <div className="hidden md:block relative overflow-hidden min-w-[50%] max-h-[450px]">
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

                <div className="flex flex-col md:self-start  max-w-[352px] ">
                    {!succSent && (
                        <h3 className="montserrat font-bold text-[20px] leading-[140%] text-nowrap">
                            {rationsData[clickIndex].title}
                        </h3>
                    )}

                    {!succSent && (
                        <p className="montserrat text-[15px] text-addGray mt-1 ">
                            {rationsData[clickIndex].composition}
                        </p>
                    )}

                    {!orderDesc ? (
                        <div className="md:max-w-[366px]">
                            <RationDescriptionPopUp
                                clickIndex={clickIndex}
                                rationsData={rationsData}
                                setOrderDesc={setOrderDesc}
                                orderDesc={orderDesc}
                            />
                        </div>
                    ) : !succSent ? (
                        <div className="w-full">
                            <OrderForm
                                rationsData={rationsData[clickIndex]}
                                setSelectFpcus={setSelectFpcus}
                                setSuccSent={setSuccSent}
                            />
                        </div>
                    ) : (
                        <div className="w-full md:mt-[100px] flex flex-col gap-5">
                            <h2 className="oswald font-bold text-[40px] text-mainRed leading-[130%] tracking-[2%] mt-8 md:mt-0">
                                Спасибо!
                            </h2>

                            <p className="montserrat text-[15px]">
                                Ваш заказ оформлен и передан менеджеру. Мы
                                свяжемся с вами для уточнения и подтверждения в
                                ближайшее время.
                            </p>
                            <p className="montserrat text-[15px]">
                                Если вы захотите дополнить свой заказ или
                                уточнить какие-то детали – вы сможете это
                                сделать у оператора.
                            </p>
                        </div>
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
