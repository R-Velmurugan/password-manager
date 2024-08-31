import FaviconFetcher from "./UI/FaviconFetcher";
import SectionHeader from "./UI/SectionHeader";
import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import AddPassword from "./AddPassword";
import {useRef} from "react";
import {getPasswords} from "../resources/request-body/payload"
const fetchAllPasswords = async () => {
    const response = await axios.post(
        getPasswords.url,
        getPasswords.data,
        getPasswords.config
    );
    return response.data.data.passwords;
}
export default function AllPasswords(){

    const {data , isLoading , isError,refetch} = useQuery({
        queryKey : ["passwords"],
        queryFn : fetchAllPasswords
    })

    const refresh = () => refetch();

    const addPasswordRef = useRef();

    if(isLoading) return <b>Eh! wait for sometime</b>
    if(isError) {
        return <b>Bruh</b>
    }

    return(
        <section className="static text-stone-200 py-2" >
            <AddPassword addPasswordRef={addPasswordRef} refresh={refresh} className="p-4"/>
            <SectionHeader header={"All Passwords"} />
            <ul className="mx-8 p-5 rounded bg-[#343943]">
                {data.map(entity =>
                    <li className="py-2" key={entity.uuid}>
                        <span className="flex items-center justify-between pb-4 cursor-pointer">
                            <div className="flex items-center" >
                                {<FaviconFetcher url={entity.url} domainName={entity.domain}/>}
                                <ul className="p-1 pl-5 text-stone-300">
                                    <li>{entity.domain}</li>
                                    <li>{entity.email}</li>
                                </ul>
                            </div>
                            <p className="pr-14 text-stone-500" >{moment(entity.updationDate).fromNow()}</p>
                        </span>
                        <hr className="border-stone-600 rounded h-1 cursor-none"/>
                    </li>)
                }
            </ul>
            <button onClick={() => addPasswordRef.current.open()} className=" bottom-4 right-5 fixed" >
                <lord-icon
                    src="https://cdn.lordicon.com/pdsourfn.json"
                    trigger="hover"
                    colors="primary:#000000,secondary:#c67d53,tertiary:#115e59"
                    style={{width:75 , height:75}}>
                </lord-icon>
            </button>

        </section>
    );
}