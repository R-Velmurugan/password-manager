import FaviconFetcher from "./UI/FaviconFetcher";
import SectionHeader from "./UI/SectionHeader";
import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import AddPassword from "./AddPassword";
import {useContext, useRef, useState} from "react";
import Password from "./Password";
import Warning from "./Warning";
import {fetchAllPasswords} from "../query/queries";
import EditPassword from "./EditPassword";
import UserContext from "../store/store";

export default function AllPasswords(){
    const [uuid , setUuid] = useState("");
    const [deletePasswordUuid , setDeletePasswordUuid] = useState("");
    const [editPasswordUuid , setEditPasswordUuid] = useState("");
    const UserCtx = useContext(UserContext);

    const {data , isLoading , isError,refetch} = useQuery({
        queryKey : ["passwords"],
        queryFn : () => fetchAllPasswords(true, UserCtx.username, UserCtx.password)
    })

    const addPasswordRef = useRef();

    const refresh = () => refetch();


    if(isLoading) return <b>Eh! wait for sometime</b>
    if(isError) {
        return <b>Bruh</b>
    }

    return(
        <section className="static text-stone-200 py-2" >
            <AddPassword addEditPasswordRef={addPasswordRef} refresh={refresh} className="p-4"/>
            {uuid && <Password uuid={uuid} setUuid={setUuid}/>}
            {deletePasswordUuid && <Warning deleteUuid={deletePasswordUuid} setDeleteUuid={setDeletePasswordUuid} refresh={refresh}/>}
            {editPasswordUuid && <EditPassword uuid={editPasswordUuid} setEditPasswordUuid={setEditPasswordUuid} refresh={refresh} />}
            <SectionHeader header={"All Passwords"} />
            <ul className="mx-8 p-5 rounded bg-[#343943]">
                {data.map(entity =>
                    <li className="py-2" key={entity.uuid}>
                        <span className="flex items-center justify-between pb-4">
                            <div className="flex items-center" >
                                {<FaviconFetcher url={entity.url} domainName={entity.domain}/>}
                                <button onClick={() => setUuid(entity.uuid)}  className="focus:outline-none">
                                    <ul className="p-1 pl-5 text-stone-300">
                                        <li className="text-left" >{entity.domain}</li>
                                        <li>{entity.email}</li>
                                        <li className="hidden" >{entity.uuid}</li>
                                    </ul>
                                </button>
                            </div>
                            <div className="flex " >
                                <p className="pr-14 text-stone-500">{moment(entity.updationDate).fromNow()}</p>
                                <button onClick={() => setDeletePasswordUuid(entity.uuid)} className="focus:outline-none">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hjbrplwk.json"
                                        trigger="morph"
                                        state="morph-trash-in"
                                        colors="primary:#000000,secondary:#848484,tertiary:#ebe6ef,quaternary:#3a3347"
                                        style={{width:25 , height:25}}>
                                    </lord-icon>
                                </button>
                                <button onClick={() => setEditPasswordUuid(entity.uuid)}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/ylvuooxd.json"
                                        trigger="hover"
                                        colors="primary:#fae6d1,secondary:#e83a30,tertiary:#ffc738,quaternary:#000000"
                                        style={{width:25 , height:25}}>
                                    </lord-icon>
                                </button>
                            </div>
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
