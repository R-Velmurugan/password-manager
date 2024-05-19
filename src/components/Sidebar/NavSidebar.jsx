export default function NavSidebar(){
    return (
        <div className="flex justify-between mx-4 py-2">
            <span>
                <lord-icon
                    src="https://cdn.lordicon.com/fmasbomy.json"
                    trigger="hover"
                    state = {null}>
                </lord-icon>
            </span>
            <ul className="flex justify-evenly">
                <li>
                    <lord-icon
                        src="https://cdn.lordicon.com/jxzkkoed.json"
                        trigger="hover"
                        state="hover-enlarge">
                    </lord-icon>
                </li>
                <li>
                    <lord-icon
                        src="https://cdn.lordicon.com/dvqeipeg.json"
                        trigger="hover">
                    </lord-icon>
                </li>
            </ul>
        </div>
    );
}