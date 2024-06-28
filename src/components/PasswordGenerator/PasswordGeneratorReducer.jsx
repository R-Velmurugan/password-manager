import {GppBad, GppGood, PrivacyTip} from "@mui/icons-material";
import {red} from "@mui/material/colors";

export const PASSWORD_STRENGTH = {
    STRONG: <span className="ml-1"><GppGood color="success"/> STRONG </span>,
    MODERATE: <span className="ml-1"><PrivacyTip color="warning"/> MODERATE </span>,
    WEAK: <span className="ml-1"><GppBad sx={{color: red[600]}}/> WEAK </span>
}
export const INITIAL_PASSWORD_CONTROLS_STATE = {
    isUppercaseNeeded : true,
    isLowercaseNeeded : true,
    isNumbersNeeded : true,
    isSpecialCharactersNeeded : true,
    passwordLength : 15,
    passwordStrength : PASSWORD_STRENGTH.STRONG
}

export const ACTION_TYPES = {
    TOGGLE_IS_UPPERCASE_NEEDED : "TOGGLE_IS_UPPERCASE_NEEDED",
    TOGGLE_IS_LOWERCASE_NEEDED : "TOGGLE_IS_LOWERCASE_NEEDED",
    TOGGLE_IS_NUMBERS_NEEDED : "TOGGLE_IS_NUMBERS_NEEDED",
    TOGGLE_IS_SPECIAL_CHARACTERS_NEEDED : "TOGGLE_IS_SPECIAL_CHARACTERS_NEEDED",
    CHANGE_PASSWORD_LENGTH : "CHANGE_PASSWORD_LENGTH",
    REFRESH_PASSWORD : "REFRESH_PASSWORD",
    CHECK_PASSWORD_STRENGTH : "CHECK_PASSWORD_STRENGTH"
}

export const passwordGeneratorReducer = (state , action) => {
    switch (action.type){
        case ACTION_TYPES.TOGGLE_IS_UPPERCASE_NEEDED :
            if(!(state.isLowercaseNeeded || state.isNumbersNeeded || state.isSpecialCharactersNeeded)) return state;
            return {
                ...state,
                isUppercaseNeeded : !state.isUppercaseNeeded
            }
        case ACTION_TYPES.TOGGLE_IS_LOWERCASE_NEEDED :
            if(!(state.isUppercaseNeeded || state.isNumbersNeeded || state.isSpecialCharactersNeeded)) return state;
            return {
                ...state,
                isLowercaseNeeded : !state.isLowercaseNeeded
            }
        case ACTION_TYPES.TOGGLE_IS_NUMBERS_NEEDED :
            if(!(state.isUppercaseNeeded || state.isLowercaseNeeded || state.isSpecialCharactersNeeded)) return state;
            return {
                ...state,
                isNumbersNeeded : !state.isNumbersNeeded
            }
        case  ACTION_TYPES.TOGGLE_IS_SPECIAL_CHARACTERS_NEEDED :
            if(!(state.isUppercaseNeeded || state.isLowercaseNeeded || state.isNumbersNeeded)) return state;
            return {
                ...state,
                isSpecialCharactersNeeded : !state.isSpecialCharactersNeeded
            }
        case ACTION_TYPES.CHANGE_PASSWORD_LENGTH :
            return {
                ...state,
                passwordLength : action.payload.passwordLength
            }
        case ACTION_TYPES.REFRESH_PASSWORD :
            return {
                ...state,
                //updating state to re-render
                isUppercaseNeeded : state.isUppercaseNeeded
            }
        case ACTION_TYPES.CHECK_PASSWORD_STRENGTH :
            let passwordStrength = checkPasswordStrength(state);
            console.log(passwordStrength);
            return {
                ...state,
                passwordStrength : passwordStrength
            }
        default :
            return state;
    }
}

function checkPasswordStrength({passwordLength , passwordStrength , ...state}){
    let numberOfChecked = 0;
    for(const key in state){
        if(state[key] === true) numberOfChecked++;
    }
    if((numberOfChecked === 3) || (numberOfChecked === 4)){
        if(passwordLength > 10) return PASSWORD_STRENGTH.STRONG;
        else return PASSWORD_STRENGTH.MODERATE;
    }
    else if ((numberOfChecked === 1) || (numberOfChecked === 2)){
        if(passwordLength > 19) return PASSWORD_STRENGTH.STRONG;
        else if(passwordLength > 10) return PASSWORD_STRENGTH.MODERATE;
        else return PASSWORD_STRENGTH.WEAK;
    }
}

export const passwordGenerator = (state) => {
    const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
    const NUMBERS = "0123456789";
    const SPECIAL_CHARACTERS = "!@#$%^&*";
    let ALL_CHARACTERS = "";

    let password = "";
    let initialPasswordLength = "";

    if(state.isUppercaseNeeded){
        ALL_CHARACTERS += UPPERCASE_LETTERS;
        password += UPPERCASE_LETTERS[Math.floor(Math.random() * UPPERCASE_LETTERS.length)];
        initialPasswordLength++;
    }
    if(state.isLowercaseNeeded){
        ALL_CHARACTERS += LOWERCASE_LETTERS;
        password += LOWERCASE_LETTERS[Math.floor(Math.random() * LOWERCASE_LETTERS.length)];
        initialPasswordLength++;
    }
    if(state.isNumbersNeeded){
        ALL_CHARACTERS += NUMBERS;
        password += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
        initialPasswordLength++;
    }
    if(state.isSpecialCharactersNeeded){
        ALL_CHARACTERS += SPECIAL_CHARACTERS;
        password += SPECIAL_CHARACTERS[Math.floor(Math.random() * SPECIAL_CHARACTERS.length)];
        initialPasswordLength++;
    }

    for(let i=initialPasswordLength ; i<state.passwordLength ; i++){
        password += ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)];
    }

    password = password.split("").sort((a , b) => { return Math.random() - 0.6}).join("");
    return password;
}