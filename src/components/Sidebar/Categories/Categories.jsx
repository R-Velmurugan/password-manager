import AppsIcon from '@mui/icons-material/Apps';
import HttpsIcon from '@mui/icons-material/Https';
import DescriptionIcon from '@mui/icons-material/Description';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryOption from "./CategoryOption";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
export default function Categories(){

    const APPS_ICON = <AppsIcon className="text-stone-200" />
    const PASSWORD_LOCK = <HttpsIcon className="text-stone-200" />
    const DESCRIPTION_ICON = <DescriptionIcon className="text-stone-200" />
    const CREDIT_CARD_ICON = <CreditCardIcon className="text-stone-200" />
    const PERSONAL_INFO_ICON = <RecentActorsIcon className="text-stone-200" />
    const DELETE_ICON = <DeleteIcon className="text-stone-200" />

    return (
        <ul className="text-stone-200 mx-4" >
            <List>
                <CategoryOption optionName = "All Items" optionIcon = {APPS_ICON}/>
                <CategoryOption optionName = "Passwords" optionIcon = {PASSWORD_LOCK}/>
                <CategoryOption optionName = "Secure Notes" optionIcon = {DESCRIPTION_ICON}/>
                <CategoryOption optionName = "Credit Cards" optionIcon = {CREDIT_CARD_ICON}/>
                <CategoryOption optionName = "Personal Info" optionIcon = {PERSONAL_INFO_ICON}/>
                <CategoryOption optionName = "Trash" optionIcon = {DELETE_ICON}/>
            </List>
        </ul>
    );
}