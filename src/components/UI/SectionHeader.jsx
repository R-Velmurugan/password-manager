export default function SectionHeader({header}){
    return(
        <div className="text-center text-xl ">
            <h1>{header}</h1>
            <hr className="w-32 border-stone-500 mx-auto my-4 rounded h-1"/>
        </div>
    );
}