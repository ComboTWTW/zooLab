import { useEffect, useRef, useState } from "react";
import OrderPopUpForm from "./OrderPopUpForm";
import { rationsT } from "../../../../api/getRation";
import { useOnClickOutside } from "usehooks-ts";
interface Props {
    setOrderClick: (orderClick: boolean) => void;
    rationsData: rationsT;
    clickIndex: number;
}

const OrderPopUp = ({ setOrderClick, rationsData, clickIndex }: Props) => {
    const [selectFpcus, setSelectFpcus] = useState<boolean>(false);

    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        !selectFpcus && setOrderClick(false);
    });

    return (
        <div className="w-full h-screen z-[50] bg-black bg-opacity-35  fixed flex justify-center items-center top-0 left-0 right-0 ">
            <div ref={ref} className="flex justify-center">
                <OrderPopUpForm
                    setOrderClick={setOrderClick}
                    rationsData={rationsData}
                    clickIndex={clickIndex}
                    setSelectFpcus={setSelectFpcus}
                />
            </div>
        </div>
    );
};

export default OrderPopUp;
