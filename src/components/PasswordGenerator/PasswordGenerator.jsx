import SectionHeader from "../UI/SectionHeader";
import {Checkbox , FormControlLabel, FormGroup, Slider} from "@mui/material";
import {teal} from "@mui/material/colors";
import {useReducer} from "react";
import {
    ACTION_TYPES,
    INITIAL_PASSWORD_CONTROLS_STATE,
    passwordGenerator,
    passwordGeneratorReducer
} from "./PasswordGeneratorReducer";

export default function PasswordGenerator() {
    const [currentPasswordState, passwordActionDispatcher] = useReducer(passwordGeneratorReducer, INITIAL_PASSWORD_CONTROLS_STATE);

    let checkboxStyle = {
        color: teal[800],
        '&.Mui-checked': {
            color: teal[600],
        }
    }
    let password = passwordGenerator(currentPasswordState);

    function handlePasswordControlChange(action) {
        passwordActionDispatcher(action);
        password = passwordGenerator(currentPasswordState);
        passwordActionDispatcher({type : ACTION_TYPES.CHECK_PASSWORD_STRENGTH});
    }

    return (
        <section className="w-full text-stone-200 py-2">
            <SectionHeader header="Password Generator"/>
            <div className="px-[10rem] bg-[#3f434b] pb-4 rounded-lg my-8 mx-10 ">
                <h6 className="text-xl py-8 flex align-middle justify-between pr-14">
                    <span className="break-words">{password}</span>
                    <span>
                        <lord-icon src="https://cdn.lordicon.com/cjbuodml.json" trigger="click"
                                   colors="primary:#109173,secondary:#121331"
                                   onClick={() => handlePasswordControlChange({type: ACTION_TYPES.REFRESH_PASSWORD})}>
                        </lord-icon>
                        <lord-icon src="https://cdn.lordicon.com/lyrrgrsl.json" trigger="click" colors="primary:#e4e4e4"
                                   onClick={() => navigator.clipboard.writeText(password)}>
                        </lord-icon>
                    </span>
                </h6>
                <ul className="w-auto">
                    <li>Password strength
                        <span className="ml-1 ">
                            {currentPasswordState.passwordStrength}
                        </span>
                    </li>
                    <li className="w-96 flex justify-center items-center">
                        <span className="whitespace-nowrap mr-6">Password length</span>
                        <Slider
                            onChange={
                                (length) => handlePasswordControlChange({
                                    type: ACTION_TYPES.CHANGE_PASSWORD_LENGTH,
                                    payload: {
                                        passwordLength: length.target.value
                                    }
                                })
                            }
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
                            }} defaultValue={15} min={8} max={30} valueLabelDisplay="auto"/>
                    </li>
                    <li>
                        <FormGroup row>
                            <FormControlLabel label="Use Uppercase" sx={{pr: 2}} control=
                                <Checkbox
                                              checked={currentPasswordState.isUppercaseNeeded}
                                              onChange={
                                                  () => handlePasswordControlChange({type: ACTION_TYPES.TOGGLE_IS_UPPERCASE_NEEDED})
                                              }
                                              sx={checkboxStyle}
                            />
                            />
                            <FormControlLabel label="Use lowercase" sx={{pr: 2}} control=
                                <Checkbox
                                              checked={currentPasswordState.isLowercaseNeeded}
                                              onChange={
                                                  () => handlePasswordControlChange({type: ACTION_TYPES.TOGGLE_IS_LOWERCASE_NEEDED})
                                              }
                                              sx={checkboxStyle}
                            />
                            />
                            <FormControlLabel label="Use digits" sx={{pr: 2}} control=
                                <Checkbox
                                              checked={currentPasswordState.isNumbersNeeded}
                                              onChange={
                                                  () => handlePasswordControlChange({type: ACTION_TYPES.TOGGLE_IS_NUMBERS_NEEDED})
                                              }
                                              sx={checkboxStyle}
                            />
                            />
                            <FormControlLabel label="Use special characters" sx={{pr: 2}} control=
                                <Checkbox
                                              checked={currentPasswordState.isSpecialCharactersNeeded}
                                              onChange={
                                                  () => handlePasswordControlChange({type: ACTION_TYPES.TOGGLE_IS_SPECIAL_CHARACTERS_NEEDED})
                                              }
                                              sx={checkboxStyle}
                            />
                            />
                        </FormGroup>
                    </li>
                </ul>
            </div>
        </section>
    );
}