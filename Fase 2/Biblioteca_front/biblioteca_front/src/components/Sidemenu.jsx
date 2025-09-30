import "../App.css";
import { NavLink } from "react-router";
import BookIcon from '@mui/icons-material/Book';
import SpeedIcon from '@mui/icons-material/Speed';

export function Sidemenu(){
    return (
        <div className="Sidemenu">
            <ul className="SidemenuList">
                <li className="row">
                    <div>
                        <BookIcon />
                    </div>
                    <NavLink to="/ListaLibros">Libros</NavLink>
                </li>
                <li className="row">
                    <div>
                        <SpeedIcon />
                    </div>
                    <NavLink to="/Test">Test</NavLink>
                </li>
            </ul>
        </div>
    )
}