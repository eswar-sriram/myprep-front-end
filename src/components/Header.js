import {Link} from 'react-router-dom';
const Header = () => {
    return ( 
        <div className="navbar">
            <h1>header</h1>
            <div className="links">
                <Link to="/About" >About</Link>
                <Link to="/signin">Sign in</Link>
            </div>
        </div>
     );
}
 
export default Header;
