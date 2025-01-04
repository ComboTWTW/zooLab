import { faq } from "../../constants";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { fetchFAQ, faqT } from "../../api/getFaq";
import { useQuery } from "@tanstack/react-query";

const FAQ = () => {
    const [openedArr, setOpenedArr] = useState<number[]>([0]);

    const handleClicked = (index: number) => {
        /* Adds index to array if there was no one and removes it there was*/
        openedArr.includes(index)
            ? setOpenedArr([
                  ...openedArr.filter(
                      (clickedNumber) => clickedNumber !== index
                  ),
              ])
            : setOpenedArr([...openedArr, index]);
    };

    const {
        data: faqData,
        isError,
        refetch,
        isSuccess,
        error,
    } = useQuery<faqT>({
        queryKey: ["fetchFAQ"],
        queryFn: fetchFAQ,
    });

    useEffect(() => {
        refetch();
        isError && console.log(error.message);
        isSuccess && console.log(faqData);
    }, []);

    return (
        <div className="w-full flex justify-center mt-[88px]">
            <div className="w-full max-w-[1200px] px-5 flex flex-col md:flex-row md:justify-between gap-11 md:gap-[85px]">
                <Fade
                    direction="up"
                    damping={0.1}
                    cascade={true}
                    triggerOnce={true}
                >
                    <h2 className="oswald font-bold text-[40px] md:text-[46px] leading-[130%] tracking-[2%] text-wrap md2:text-nowrap">
                        {faq.header}
                    </h2>
                </Fade>

                {/* Accordion */}
                <div className={`w-full md:mt-[-25px] flex flex-col `}>
                    {faqData?.map((item, index) => {
                        return (
                            <Fade
                                direction="up"
                                damping={0.1}
                                cascade={true}
                                triggerOnce={true}
                                key={item.text}
                            >
                                <Accordion
                                    /* Opens item with this index if its index is inside openedArr */
                                    expanded={openedArr.includes(index)}
                                    elevation={0}
                                    onChange={() => handleClicked(index)}
                                    disableGutters={true}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            openedArr.includes(index) ? (
                                                <RemoveIcon
                                                    style={{
                                                        color: "#961914",
                                                    }}
                                                />
                                            ) : (
                                                <AddIcon
                                                    style={{
                                                        color: "#961914",
                                                    }}
                                                />
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
                                                {item.title}
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
