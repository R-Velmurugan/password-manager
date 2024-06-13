import SectionHeader from "./UI/SectionHeader";
import {Checkbox, FormControlLabel, FormGroup, Slider} from "@mui/material";
import {teal , pink , red} from "@mui/material/colors";
import {ContentCopy, ContentPaste, GppBad, GppGood, PrivacyTip, Refresh} from "@mui/icons-material";
import ICONS from "../data/icons/icons";

export default function PasswordGenerator() {

    let checkbox = <Checkbox sx={{
        color: teal[800],
        '&.Mui-checked': {
            color: teal[600],
        },
    }} />;

    function handleSlider(currentValue) {
        console.log(currentValue.target.value);
    }

    return (
        <section className="w-full text-stone-200 py-2">
            <SectionHeader header="Password Generator" />

            <div className="px-[10rem] my-8 mx-10 " >
                <h6 className="text-xl py-8 flex align-middle gap-96" >
                    <span>ZS5v4Sk@S$pgAKi</span>
                    <span >
                        {ICONS.REFRESH}
                        {ICONS.COPY}
                        {ICONS.DONE}
                    </span>

                </h6>
                <ul className="w-auto" >
                    <li>Password strength
                        <span className="ml-1" ><GppGood color="success" /></span>
                        {/*<span><PrivacyTip color="warning" /></span>*/}
                        {/*<span><GppBad sx={{ color: red[600] }} /></span>*/}
                    </li>
                    <li className="w-96 flex justify-center items-center" >
                        <span className="whitespace-nowrap mr-6" >Password length</span>
                        <Slider
                            sx={{
                                '& .MuiSlider-thumb': {
                                    color: teal[600],
                                },
                                '& .MuiSlider-track': {
                                    color: teal[600],
                                },
                                '& .MuiSlider-rail': {
                                    color: teal[600],
                                },
                            }}
                            onChange={(currentValue) => handleSlider(currentValue)} defaultValue={10} max="30" valueLabelDisplay="auto" />
                    </li>

                    <li>
                        <FormGroup row>
                            <FormControlLabel control={checkbox} label="Use Uppercase" sx={{pr:2}} />
                            <FormControlLabel control={checkbox} label="Use lowercase" sx={{pr:2}} />
                            <FormControlLabel control={checkbox} label="Use digits" sx={{pr:2}} />
                            <FormControlLabel control={checkbox} label="Use special characters" sx={{pr:2}} />
                        </FormGroup>
                    </li>
                </ul>
            </div>
        </section>
    );
}