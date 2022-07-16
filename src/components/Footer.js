import { Link } from "react-router-dom";

const Footer = () => {
    
    return ( 
    <div id="footer"> 
        <div>
            <p>This website has been created by <a href="https://www.linkedin.com/in/eswar-sri-ram/">Eswar</a> as a personal project</p>
        </div>
        <div>
                <Link to="/about">About</Link>
                <br/>
                <Link to="/signin">Signin</Link>
        </div>
    </div>
  );
}
 
export default Footer;