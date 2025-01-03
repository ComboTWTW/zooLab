import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

const MobileContactForm = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="flex flex-col gap-[18px]"
        >
            <TextField
                id="standard-basic"
                label="Имя"
                variant="filled"
                fullWidth
                sx={{
                    background: "#9b2520",
                    border: "solid #cd928f 1px",
                    borderRadius: "2px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "white" },
                }}
                InputLabelProps={{
                    style: {
                        color: "#cd928f",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "white",
                        background: "#9b2520",
                    },
                }}
                type="text"
            />
            <TextField
                id="standard-basic"
                label="Email"
                variant="filled"
                fullWidth
                sx={{
                    background: "#9b2520",
                    border: "solid #cd928f 1px",
                    borderRadius: "2px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "white" },
                }}
                InputLabelProps={{
                    style: {
                        color: "#cd928f",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "white",
                        background: "#9b2520",
                    },
                }}
                type="email"
            />

            <TextField
                id="standard-basic"
                label="Ваш вопрос..."
                variant="filled"
                fullWidth
                sx={{
                    background: "#9b2520",
                    border: "solid #cd928f 1px",
                    borderRadius: "2px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "white" },
                    minHeight: 122,
                }}
                InputLabelProps={{
                    style: {
                        color: "#cd928f",
                        fontSize: 16,
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "white",
                        background: "#9b2520",
                    },
                }}
                type="text"
                multiline
            />

            <div className="flex items-center gap-2">
                <Checkbox
                    id="check"
                    style={{
                        padding: 0,
                    }}
                    sx={{
                        color: "white",
                        "&.Mui-checked": {
                            color: "white",
                        },
                    }}
                />

                <label
                    htmlFor="check"
                    className="montserrat text-white  text-base leading-snug"
                >
                    Даю согласие на обработку персональных данных
                </label>
            </div>

            <button className="bg-white rounded-[3px] montserrat font-bold text-[#EC7973] leading-[140%] text-[17px] py-[16px] hover:bg-pinkHover duration-200 hover:text-mainRed">
                Отправить
            </button>
        </Box>
    );
};

export default MobileContactForm;
