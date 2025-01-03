import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const CalcForm = () => {
    return (
        <FormControl component="form">
            <RadioGroup>
                <FormControlLabel
                    value="Взрослая собака"
                    defaultChecked={true}
                    control={
                        <Radio
                            sx={{
                                color: "#434242",
                                "&.Mui-checked": {
                                    color: "#961914",
                                },
                            }}
                        />
                    }
                    label="Взрослая собака"
                    color="#961914"
                />
                <FormControlLabel
                    value="Щенок"
                    control={
                        <Radio
                            sx={{
                                color: "#434242",
                                "&.Mui-checked": {
                                    color: "#961914",
                                },
                            }}
                        />
                    }
                    label="Щенок"
                    color="#961914"
                />
            </RadioGroup>

            <TextField
                id="standard-basic"
                label="Вес (кг)"
                variant="filled"
                fullWidth
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "25px",
                    textWrap: "wrap",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                        textWrap: "wrap",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                        textWrap: "wrap",
                    },
                }}
                type="text"
            />

            <TextField
                id="standard-basic"
                label="Возраст"
                variant="filled"
                fullWidth
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                    },
                }}
                type="number"
            />

            <TextField
                id="standard-basic"
                label="Имя"
                variant="filled"
                fullWidth
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                    },
                }}
                type="text"
            />

            <TextField
                id="standard-basic"
                label="Телефон"
                variant="filled"
                fullWidth
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                    },
                }}
                type="tel"
            />

            <TextField
                id="standard-basic"
                hiddenLabel={true}
                placeholder="Если у вашего хвостика есть особенности здоровья – напишите об этом..."
                variant="filled"
                fullWidth
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    marginTop: "15px",
                    textWrap: "wrap",
                    minHeight: 100,
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                        textWrap: "wrap",
                    },
                }}
                type="text"
                multiline
            />

            <button
                type="submit"
                className="montserrat font-semibold z-[2] text-white leading-[140%] mt-[45px] rounded-[8px] bg-mainRed px-11 py-4 md:hover:bg-mainRedHove md:duration-200"
            >
                Рассчитать
            </button>
        </FormControl>
    );
};

export default CalcForm;
