import {Badge, styled} from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        top: 20,
        padding: '0 4px',
    },
}));
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
                <li className="px-2" >
                    <StyledBadge badgeContent={0} color="warning" max={10}>
                        <lord-icon
                            src="https://cdn.lordicon.com/pilfbsjh.json"
                            trigger="loop"
                            delay="2500"
                            state="in-reveal"
                            style={{width : 45 , height : 35}}>
                        </lord-icon>
                    </StyledBadge>

                </li>
                <li>
                    <button>
                        <lord-icon
                            src="https://cdn.lordicon.com/oxgyjdir.json"
                            trigger="hover">
                        </lord-icon>
                    </button>
                </li>
            </ul>
        </div>
    );
}