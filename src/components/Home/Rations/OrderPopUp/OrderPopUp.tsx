import { useState } from "react";
import OrderPopUpForm from "./OrderPopUpForm";
import { rationsT } from "../../../../api/getRation";

interface Props {
    setOrderClick: (orderClick: boolean) => void;
    rationsData: rationsT;
    clickIndex: number;
}

const OrderPopUp = ({ setOrderClick, rationsData, clickIndex }: Props) => {
    const [successSent, setSuccessSend] = useState<boolean>(false);

    return (
        <div className="w-full h-screen z-50 bg-black bg-opacity-35  fixed flex justify-center items-center top-0 left-0  ">
            {successSent === false ? (
                <OrderPopUpForm
                    setOrderClick={setOrderClick}
                    rationsData={rationsData}
                    clickIndex={clickIndex}
                />
            ) : (
                <div className=""></div>
            )}
        </div>
    );
};

export default OrderPopUp;
