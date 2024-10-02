export default function FaviconFetcher({url , domainName , size=32}){
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=${size}`

    return <img className="py-3" src={faviconUrl} alt = {domainName}/>
}