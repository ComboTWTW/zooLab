import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
    setCalcClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccsessfulSent = ({ setCalcClick }: Props) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => setCalcClick(false));
    return (
        <div
            ref={ref}
            className="p-7 md:pt-10 opacity-100  bg-white flex flex-col items-center gap-6 max-w-[548px] relative max-h-[100vh] md:max-h-[95vh] overflow-y-auto "
        >
            <h2 className="oswald font-bold text-[40px] text-mainRed leading-[130%] tracking-[2%] mt-8 md:mt-0">
                Спасибо!
            </h2>

            <p className="montserrat text-[15px]">
                Мы ответим вам в ближайшее время.
            </p>

            <button onClick={() => setCalcClick(false)}>
                <CloseIcon className="top-4 right-4 absolute min-h-[40px] min-w-[40px]" />
            </button>
        </div>
    );
};

export default SuccsessfulSent;
