import { useRef, useState } from "react";
import { portionsCalc } from "../../../constants";
import CalcForm from "./CalcForm";
import CloseIcon from "@mui/icons-material/Close";
import { useOnClickOutside } from "usehooks-ts";
import SuccsessfulSent from "./SuccsessfulSent";
import RationCalcPopupForm from "./RationCalcPopupForm";

interface Props {
    setCalcClick: any;
}

const RationClacPopup = ({ setCalcClick }: Props) => {
    const [successSent, setSuccessSend] = useState<boolean>(false);

    return (
        <div className="w-full h-screen z-50 bg-black bg-opacity-35  fixed flex justify-center items-center top-0 left-0  ">
            {successSent === false ? (
                <RationCalcPopupForm
                    setCalcClick={setCalcClick}
                    setSuccessSend={setSuccessSend}
                />
            ) : (
                <SuccsessfulSent setCalcClick={setCalcClick} />
            )}
        </div>
    );
};

export default RationClacPopup;
