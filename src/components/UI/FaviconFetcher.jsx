export default function FaviconFetcher({url , domainName}){
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}&sz=32`

    return <img className="py-3" src={faviconUrl} alt = {domainName}/>
}