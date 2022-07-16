import {Link} from 'react-router-dom';
const Header = () => {
    return ( 
        <div className="navbar">
            <h1>My Preparation</h1>
            <div className="links">
                <Link to="/About" >About</Link>
            </div>
        </div>
     );
}
 
export default Header;
