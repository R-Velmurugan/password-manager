import FaviconFetcher from "./UI/FaviconFetcher";
import SectionHeader from "./UI/SectionHeader";
import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchAllPasswords = async () => {
    const response = await axios.post(
        "http://localhost:8080/graphql",
        {
            query:
                `query{
                    passwords{
                        uuid
                        domain
                        url
                        email
                        updationDate
                    }
                }`
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }

    );
    return response.data.data.passwords;
}
export default function AllPasswords(){

    const {data , isLoading , isError,error} = useQuery({
        queryKey : ["passwords"],
        queryFn : fetchAllPasswords
    })

    if(isLoading) return <b>Eh! wait for sometime</b>
    if(isError) {
        return <b>Bruh</b>
    }

    return(
        <section className="text-stone-200 py-2" >
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
        </section>
    );
}