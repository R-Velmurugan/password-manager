import NavSidebar from "./NavSidebar";
import AppsIcon from "@mui/icons-material/Apps";
import HttpsIcon from "@mui/icons-material/Https";
import DescriptionIcon from "@mui/icons-material/Description";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryOption from "./Categories/CategoryOption";
import {List} from "@mui/material";

export default function Sidebar(){

    const APPS_ICON = <AppsIcon className="text-stone-200" />
    const PASSWORD_LOCK = <HttpsIcon className="text-stone-200" />
    const DESCRIPTION_ICON = <DescriptionIcon className="text-stone-200" />
    const CREDIT_CARD_ICON = <CreditCardIcon className="text-stone-200" />
    const PERSONAL_INFO_ICON = <RecentActorsIcon className="text-stone-200" />
    const DELETE_ICON = <DeleteIcon className="text-stone-200" />

    return(
        <aside className="w-1/3 md:w-72 bg-stone-600 h-screen font-medium" >
            <NavSidebar/>

            <p className="mt-4 ml-4 text-stone-200" >Categories</p>

            <List className=" pl-1 mt-4 ml-4 text-stone-200">
                <CategoryOption optionName = "All Items" optionIcon = {APPS_ICON}/>
                <CategoryOption optionName = "Passwords" optionIcon = {PASSWORD_LOCK}/>
                <CategoryOption optionName = "Secure Notes" optionIcon = {DESCRIPTION_ICON}/>
                <CategoryOption optionName = "Credit Cards" optionIcon = {CREDIT_CARD_ICON}/>
                <CategoryOption optionName = "Personal Info" optionIcon = {PERSONAL_INFO_ICON}/>
                <CategoryOption optionName = "Trash" optionIcon = {DELETE_ICON}/>
            </List>
        </aside>
    );
}