import FaviconFetcher from "./UI/FaviconFetcher";
import SectionHeader from "./UI/SectionHeader";
import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import AddPassword from "./AddPassword";
import {useEffect, useRef, useState} from "react";
import {getPasswords} from "../resources/request-body/payload"
import Password from "./Password";
const fetchAllPasswords = async () => {
    const response = await axios.post(
        getPasswords.url,
        getPasswords.data,
        getPasswords.config
    );
    return response.data.data.passwords;
}
export default function AllPasswords(){
    const [uuid , setUuid] = useState("3db7063d-c3e5-45bf-8f95-65e1a9442af9");
    const {data , isLoading , isError,refetch} = useQuery({
        queryKey : ["passwords"],
        queryFn : fetchAllPasswords,
    })
    useEffect(() => {
        if (uuid && showPasswordRef.current) {
            console.log("Opening modal after uuid update");
            showPasswordRef.current.open(); // Ensure modal opens after uuid is set
        }
    }, [uuid]);

    const refresh = () => refetch();

    const addPasswordRef = useRef();
    const showPasswordRef = useRef();

    if(isLoading) return <b>Eh! wait for sometime</b>
    if(isError) {
        return <b>Bruh</b>
    }
    const handleShowPassword = (entity) => {
        setUuid(entity.uuid);
        if(uuid && showPasswordRef.current){
            console.log("calling modal")
            showPasswordRef.current.open();
        }
    }

    return(
        <section className="static text-stone-200 py-2" >
            <AddPassword addPasswordRef={addPasswordRef} refresh={refresh} className="p-4"/>
            <Password showPasswordRef={showPasswordRef} uuid={uuid}/>
            <SectionHeader header={"All Passwords"} />
            <ul className="mx-8 p-5 rounded bg-[#343943]">
                {data.map(entity =>
                    <li className="py-2" key={entity.uuid}>
                        <span className="flex items-center justify-between pb-4">
                            <div className="flex items-center" >
                                {<FaviconFetcher url={entity.url} domainName={entity.domain}/>}
                                <button onClick={() => {handleShowPassword(entity)}}  className="focus:outline-none">
                                    <ul className="p-1 pl-5 text-stone-300">
                                        <li className="text-left" >{entity.domain}</li>
                                        <li>{entity.email}</li>
                                        <li className="hidden" >{entity.uuid}</li>
                                    </ul>
                                </button>
                            </div>
                            <p className="pr-14 text-stone-500">{moment(entity.updationDate).fromNow()}</p>
                        </span>
                        <hr className="border-stone-600 rounded h-1 cursor-none"/>
                    </li>)
                }
            </ul>
            <button onClick={() => addPasswordRef.current.open()} className="bottom-4 right-5 fixed focus:outline-none" >
                <lord-icon
                    src="https://cdn.lordicon.com/pdsourfn.json"
                    trigger="hover"
                    colors="primary:#000000,secondary:#c67d53,tertiary:#115e59"
                    style={{width:75 , height:75 , outline:null}}>
                </lord-icon>
            </button>

        </section>
    );
}
