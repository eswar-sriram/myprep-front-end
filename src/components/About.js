
const About = (props) => {
    console.log(props);
    return ( <div>{localStorage.getItem("userId")}</div> );
}
 
export default About;