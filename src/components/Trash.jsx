import SectionHeader from "./UI/SectionHeader";
import FaviconFetcher from "./UI/FaviconFetcher";
import moment from "moment/moment";
import {useQuery} from "@tanstack/react-query";
import {fetchAllPasswords} from "../query/queries";
import {useState} from "react";
import Password from "./Password";

export default function Trash(){
    const [uuid , setUuid] = useState("");
    const {data , isLoading , isError} = useQuery({
        queryKey : ["passwords"],
        queryFn : () => fetchAllPasswords(false),
    })

    if(isLoading) return <b>Eh! wait for sometime</b>
    if(isError) {
        return <b>Bruh</b>
    }

    return(
        <section className="w-full text-stone-200 py-2">
            <SectionHeader header="Trash"/>
            {uuid && <Password uuid={uuid}/>}
            <ul className="mx-8 p-5 rounded bg-[#343943]">
                {data.map(entity =>
                    <li className="py-2" key={entity.uuid}>
                        <span className="flex items-center justify-between pb-4">
                            <div className="flex items-center">
                                {<FaviconFetcher url={entity.url} domainName={entity.domain}/>}
                                <button onClick={() => setUuid(entity.uuid)} className="focus:outline-none">
                                    <ul className="p-1 pl-5 text-stone-300">
                                        <li className="text-left">{entity.domain}</li>
                                        <li>{entity.email}</li>
                                        <li className="hidden">{entity.uuid}</li>
                                    </ul>
                                </button>
                            </div>
                            <div className="flex ">
                                <p className="pr-14 text-stone-500">{moment(entity.updationDate).fromNow()}</p>
                            </div>
                        </span>
                        <hr className="border-stone-600 rounded h-1 cursor-none"/>
                    </li>)
                }
            </ul>
        </section>
    )
}