import { Menu  } from 'antd';
import {ComponentContext} from "../context/ComponentContext";
import {useContext} from "react";
import { Link } from "react-router-dom";

const MenuComponent = ()=>{
    const {user,setLocationMenu,locationMenu} = useContext(ComponentContext);
    const onClickMenu = (text) =>{
        setLocationMenu(text)
        localStorage.setItem("location",text)
    }
    return (
        <>  
            <Menu theme="dark" mode="horizontal" style={{textAlign:'right'}} defaultSelectedKeys={[locationMenu]}>
                <Menu.Item key="home">
                    <Link to="/"onClick={()=>onClickMenu("home") } >Home</Link>
                </Menu.Item>
                <Menu.Item key="game"onClick={()=>onClickMenu("game")} >
                    <Link to="/HomeGames" >Games</Link>
                </Menu.Item>
                <Menu.Item key="movie" onClick={()=>onClickMenu("movie")}>
                    <Link to="/HomeMovies">Movies</Link>
                </Menu.Item>
                {
                    user === null &&
                
                <Menu.Item key="login" onClick={()=>onClickMenu("login")}>
                    <Link to="/Login">Login</Link>
                </Menu.Item>
                }

            </Menu>
        </>
    );
}

export default MenuComponent;