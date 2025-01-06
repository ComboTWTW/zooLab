import React, { Fragment } from "react";
import { rationsT } from "../../../../api/getRation";

interface Props {
    rationsData: rationsT;
    clickIndex: number;
    orderDesc: boolean;
    setOrderDesc: (orderDesc: boolean) => void;
}

const RationDescriptionPopUp = ({
    rationsData,
    clickIndex,
    setOrderDesc,
}: Props) => {
    return (
        <Fragment>
            <p className="montserrat text-[15px] text-mainGray mt-5 ">
                {rationsData[clickIndex].description}
            </p>

            <p className="montserrat text-[15px] text-mainGray mt-5 md:mt-10">
                <span className="font-semibold montserrat ">Состав: </span>
                {rationsData[clickIndex].composition_full}
            </p>

            <p className="montserrat text-[15px] text-mainGray mt-8 md:mt-12">
                <span className="font-semibold montserrat ">
                    Пищевая ценность на 100г:{" "}
                </span>
                {rationsData[clickIndex].nutrition_value}
            </p>

            <p className="montserrat text-[15px] text-addGray mt-4 ">
                {rationsData[clickIndex].weight}
            </p>

            <button
                onClick={() => setOrderDesc(true)}
                className="rounded-[8px] px-9 md:max-w-[160px] py-3 border-solid border-mainRed border-[1px] montserrat font-semibold text-mainRed leading-[140%] mt-9  md:hover:bg-pinkHover md:hover:border-pinkHover md:duration-200"
            >
                Заказать
            </button>
        </Fragment>
    );
};

export default RationDescriptionPopUp;
