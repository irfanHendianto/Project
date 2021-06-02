import {  Link, useHistory } from "react-router-dom";


const Logout = ()=>{
    let history = useHistory();
    const handleLogout = () =>{
        localStorage.clear("user")
        history.push(`/`)
        window.location.reload()
    }
    return (
        <>
        <span>
            <Link to="/Logout" onClick={handleLogout}>Logout</Link>
        </span>


        </>
    );
}

export default Logout;