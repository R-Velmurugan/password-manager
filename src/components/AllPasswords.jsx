import FaviconFetcher from "./UI/FaviconFetcher";
import SectionHeader from "./UI/SectionHeader";
import moment from "moment";

const passwords = require("../resources/passwords.json");
export default function AllPasswords(){
    return(
        <section className="text-stone-200 " >
            <SectionHeader header={"All Passwords"} />
            <ul className="mx-8 p-5 rounded bg-[#343943]">
                {passwords.passwords.map(entity =>
                    <li className="py-2" key={entity.uuid}>
                        <span className="flex items-center justify-between pb-4 cursor-pointer">
                            <div className="flex items-center" >
                                {<FaviconFetcher url={entity.url} domainName={entity.domain}/>}
                                <ul className="p-1 pl-5 text-stone-300">
                                    <li>{entity.domain}</li>
                                    <li>{entity.email}</li>
                                </ul>
                            </div>
                            <p className="pr-14 text-stone-500" >{moment(entity.updated_at).fromNow()}</p>
                        </span>
                        <hr className="border-stone-600 rounded h-1 cursor-none"/>
                    </li>)
                }
            </ul>
        </section>
    );
}