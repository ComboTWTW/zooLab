import { faq } from "../../constants";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

const FAQ = () => {
    const [indexOp, setIndexOp] = useState<number>(0);
    const [opened, setOpened] = useState<boolean>(true);

    const handleClicked = (index: number) => {
        setIndexOp(index);
        console.log("previous index " + indexOp);
        console.log("index clicked " + index);

        !opened ? setOpened(() => true) : setOpened(false);
        console.log(index + " is " + opened);

        index !== indexOp && setOpened(true);
    };

    return (
        <div className="w-full flex justify-center mt-[88px]">
            <div className="w-full max-w-[1200px] px-5 flex flex-col md:flex-row md:justify-between gap-11 md:gap-[85px]">
                <Fade
                    direction="up"
                    damping={0.1}
                    cascade={true}
                    triggerOnce={true}
                >
                    <h2 className="oswald font-bold text-[40px] md:text-[46px] leading-[130%] tracking-[2%] text-nowrap">
                        {faq.header}
                    </h2>
                </Fade>

                {/* Accordion */}
                <div className={`w-full md:mt-[-25px] flex flex-col `}>
                    {faq.list.map((item, index) => {
                        return (
                            <Fade
                                direction="up"
                                damping={0.1}
                                cascade={true}
                                triggerOnce={true}
                            >
                                <Accordion
                                    expanded={index === indexOp && opened}
                                    elevation={0}
                                    onChange={() => handleClicked(index)}
                                    disableGutters={true}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            !opened || index !== indexOp ? (
                                                <AddIcon
                                                    style={{
                                                        color: "#961914",
                                                    }}
                                                />
                                            ) : (
                                                index === indexOp &&
                                                opened && (
                                                    <RemoveIcon
                                                        style={{
                                                            color: "#961914",
                                                        }}
                                                    />
                                                )
                                            )
                                        }
                                        aria-controls={`panel${
                                            index + 1
                                        }-content`}
                                        id={`panel${index + 1}-header`}
                                    >
                                        <Typography className={`py-[17px]`}>
                                            <span
                                                onClick={() =>
                                                    handleClicked(index)
                                                }
                                                className="text-black montserrat font-semibold leading-[140%] text-[16px] md:text-lg pr-[60px] "
                                            >
                                                {item.header}
                                            </span>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="-pt-9">
                                            <span
                                                onClick={() =>
                                                    handleClicked(index)
                                                }
                                                className={` montserrat text-[14px] leading-[140%] text-mainGray pr-[60px] `}
                                            >
                                                {item.text}
                                            </span>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Fade>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
