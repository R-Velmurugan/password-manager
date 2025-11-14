import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import SectionHeader from "./UI/SectionHeader";
import {useQuery} from "@tanstack/react-query";
import {fetchExpiredPasswordsForNotification, fetchMultiplePasswordsByUUID} from "../query/queries";
import FaviconFetcher from "./UI/FaviconFetcher";
import {useContext, useState} from "react";
import UserContext from "../store/store";

export default function PasswordHealth() {
    const [showExpiredPasswords , setShowExpiredPasswords] = useState(false);
    const UserCtx = useContext(UserContext);
    const {data: expiredPasswordsData , isLoading: expiredPasswordsDataIsLoading , isError: expiredPasswordsIsError} = useQuery({
        queryKey : ["expiredPasswords"],
        queryFn : () => {
            return fetchExpiredPasswordsForNotification("password_expired" , UserCtx.username);
        }
    })

    const {data : passwordData , isLoading: passwordDataIsLoading , isError : passwordDataIsError} = useQuery({
        queryKey : ["expiredPasswordsData"],
        queryFn : () => getPasswordsData()
    })

    const getPasswordsData = () => {
        return fetchMultiplePasswordsByUUID(expiredPasswordsData[0].description , UserCtx.username, UserCtx.vaultKey);
    }

    const handleShowExpiredPasswords = () => {
        setShowExpiredPasswords((previousState) => !previousState);
    }

    if (expiredPasswordsDataIsLoading || passwordDataIsLoading) return <p>Loading...</p>;
    if (expiredPasswordsIsError || passwordDataIsError) return <p>Error fetching data</p>;

    return (<section className="w-full text-stone-200 text-xl py-2">
        <SectionHeader header = "Password Health" />
        <ul className="px-[15rem] my-8">
            <li className="flex-col bg-[#3f434b] p-3 rounded-lg">
                    <span className="flex gap-2" >
                        <div className="rounded-full bg-pink-800 flex justify-center p-3">
                            <GppMaybeIcon sx={{fontSize: "2rem"}}/>
                        </div>

                        <div>
                            <p className="text-pink-800">Expired Passwords</p>
                            <p className="text-sm"> Passwords that are not updated for 3+ months </p>
                        </div>
                    </span>
                <button className="inline-block px-3 my-3" onClick={handleShowExpiredPasswords}>
                    <span className="text-[2rem] " >{expiredPasswordsData[0].description.length}</span>
                    <span> accounts</span>
                </button>
                {showExpiredPasswords &&
                    <section>
                        <hr className="w-80 border-stone-400 mx-auto py-2"/>
                        <ul>
                            {
                                passwordData.map(password =>
                                    <li className="text-base flex items-center gap-2"><FaviconFetcher url={password.url}
                                                                                                      domainName={password.domain}/>
                                        {password.domain}
                                    </li>
                                )
                            }
                        </ul>
                    </section>
                }
            </li>

        </ul>
    </section>);
}
