import NavSidebar from "./NavSidebar";
import AppsIcon from "@mui/icons-material/Apps";
import HttpsIcon from "@mui/icons-material/Https";
import DescriptionIcon from "@mui/icons-material/Description";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CategoryOption from "./Categories/CategoryOption";
import {List} from "@mui/material";
import {Link} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../store/store";

export default function Sidebar() {

    const UserCtx = useContext(UserContext);

    const APPS_ICON = <AppsIcon className="text-stone-200"/>
    const PASSWORD_LOCK = <HttpsIcon className="text-stone-200"/>
    const DESCRIPTION_ICON = <DescriptionIcon className="text-stone-200"/>
    const PERSONAL_INFO_ICON = <RecentActorsIcon className="text-stone-200"/>
    const DELETE_ICON = <AutoDeleteIcon className="text-stone-200"/>

    const GENERATE_PASSWORD =
        <lord-icon
            src="https://cdn.lordicon.com/abaxrbtq.json"
            trigger="hover">
        </lord-icon>
    const HEALTH =
        <lord-icon
            src="https://cdn.lordicon.com/brweqbnv.json"
            trigger="hover">
        </lord-icon>

    console.log(UserCtx)

    return (
        <aside className="w-64 md:w-72 bg-gradient-to-b from-[#3f444b] to-[#303238] my-2 rounded-md mx-1 font-medium">
            <NavSidebar/>
            <hr className="border-stone-600"/>

            <p className="mt-4 ml-4 text-stone-200">Categories</p>
            <List className=" pl-1 mt-4 ml-4 text-stone-200">
                <CategoryOption optionName="All Items" optionIcon={APPS_ICON}/>
                <Link to="/all-passwords"><CategoryOption optionName="Passwords" optionIcon={PASSWORD_LOCK}/></Link>
                <CategoryOption optionName="Secure Notes" optionIcon={DESCRIPTION_ICON}/>
                <CategoryOption optionName="Personal Info" optionIcon={PERSONAL_INFO_ICON}/>
                <Link to="/trash"><CategoryOption optionName="Trash" optionIcon={DELETE_ICON}/></Link>
            </List>

            <hr className="border-stone-600"/>

            <p className="mt-4 ml-4 text-stone-200">Tools</p>
            <List className=" pl-1 mt-4 ml-4 text-stone-200">
                <Link to="/generate-password" ><CategoryOption optionName="Password Generator" optionIcon={GENERATE_PASSWORD}/></Link>
                <Link to="/password-health" ><CategoryOption optionName="Password Health" optionIcon={HEALTH}/></Link>
            </List>
        </aside>
    );
}