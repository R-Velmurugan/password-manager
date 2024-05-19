import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

export default function CategoryOption({optionIcon , optionName}){
    return(
        <ListItemButton>
            <ListItemIcon>{optionIcon}</ListItemIcon>
            <ListItemText primary={optionName} />
        </ListItemButton>
    );
}