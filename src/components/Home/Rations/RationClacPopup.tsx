import { useRef, useState } from "react";
import { portionsCalc } from "../../../constants";
import CalcForm from "./CalcForm";
import CloseIcon from "@mui/icons-material/Close";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
    setCalcClick: any;
}

const RationClacPopup = ({ setCalcClick }: Props) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => setCalcClick(false));

    return (
        <div className="w-full h-screen z-50 bg-black bg-opacity-35  fixed flex justify-center items-center top-0 left-0  ">
            <div
                ref={ref}
                className="p-7 md:pt-10 opacity-100  bg-white flex flex-col gap-6 max-w-[548px] relative max-h-[100vh] md:max-h-[95vh] overflow-y-auto "
            >
                <h2 className="oswald font-bold text-[40px] text-mainRed leading-[130%] tracking-[2%] mt-8 md:mt-0">
                    {portionsCalc.header}
                </h2>

                <p className="montserrat text-[15px]">
                    Заполните информацию и мы свяжемся с вами, чтобы подсказать
                    с подбором рациона для вашего хвостика. Или напишите нам в
                    мессендерах{" "}
                    <a href="#" className="text-mainRed underline ">
                        WhatsApp
                    </a>{" "}
                    и{" "}
                    <a href="#" className="text-mainRed underline ">
                        Telegram
                    </a>
                </p>

                <CalcForm />

                <button onClick={() => setCalcClick(false)}>
                    <CloseIcon className="top-4 right-4 absolute min-h-[40px] min-w-[40px]" />
                </button>
            </div>
        </div>
    );
};

export default RationClacPopup;
