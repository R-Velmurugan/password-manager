import NavSidebar from "./NavSidebar";
import Categories from "./Categories/Categories";

export default function Sidebar(){
    return(
        <aside className="w-1/3 md:w-72 bg-stone-600 h-screen font-medium" >
            <NavSidebar/>

            <p className="mt-4 ml-4 text-stone-200" >Categories</p>
            <Categories/>
        </aside>
    );
}