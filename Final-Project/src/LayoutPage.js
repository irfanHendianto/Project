import { Space, Layout,Menu, Avatar,Typography, Row, Col   } from 'antd';
import { useContext, useEffect } from "react";
import MenuComponent from "./component/MenuComponent";
import Logout from "./component/SubMenuComponent";
import HomePage from "./page/HomePage";
import Login from "./page/Login";
import ChangePassword from "./page/ChangePassword";
import Register from "./page/Register";
import HomeMovie from "./page/movie/HomeMovie";
import ViewDetailMovie from "./page/movie/ViewDetailMovie";
import ListMovie from './page/movie/ListMovie';
import FormCreateMovie from './page/movie/FormCreateMovie'
import FormEditMovie from './page/movie/FormEditMovie';
import HomeGames from "./page/game/HomeGames";
import ViewDetaiGames from "./page/game/ViewDetaiGames";
import ListGames from './page/game/ListGames';
import FormCreateGames from './page/game/FormCreateGames';
import FormEditGames from './page/game/FormEditGames';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {ComponentContext} from "./context/ComponentContext";
import {ProtectedRouter, ProtectedRouterLogin} from "./ProtectedRouter";
import logo from'./logo.png'
import './style.css'

const {Text} = Typography;
const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu

const LayoutPage = () => {
    
    let {user,setGlobalMovie,setGlobalGames,locationMenu, setLocationMenu,locationMenuSub, setLocationMenuSub} = useContext(ComponentContext)
        const onClickMenu = (text,subText) =>{
            setLocationMenu(text)
            setLocationMenuSub(subText)
            localStorage.setItem("location",text)
            localStorage.setItem("locationSub",subText)
        }
        useEffect(()=>{
            setLocationMenu(localStorage.getItem("location"))
            setLocationMenuSub(localStorage.getItem("locationSub"))
        },[locationMenu,locationMenuSub])
        return(
            <>
            <Router>
             {
            <Layout >
                
                <Header className="header">
                    <Row>
                            <Col span={12}>
                            <img alt="baner" src={logo} width="200"  height="50" style={{objectFit: 'cover',backgroundColor:'white',borderRadius:'100px'}} />
                            </Col>
                            <Col span={12}> 
                                <MenuComponent/>
                            </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0', }}>
                    {
                        user !== null &&
                    
                    <Sider width={200}>
                    <Menu
                        mode="inline"
                        
                        defaultSelectedKeys={[locationMenuSub]}
                        defaultOpenKeys={[locationMenu]}
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="profile" icon={<UserOutlined />} title="Profile">
                            <Menu.Item>
                                <Space size={10}>
                                    <Avatar size={20} icon={<UserOutlined />} />
                                    <Text>{user.name}</Text>
                                </Space>
                            </Menu.Item>
                            <Menu.Item key="logout">
                                <Logout/>
                            </Menu.Item>
                            <Menu.Item key="ChangePassword">
                                <Link to="/ChangePassword" onClick={()=>onClickMenu("profile","ChangePassword") }>
                                    Change Password
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="movie" icon={<LaptopOutlined />} title="Movie Editor">
                            <Menu.Item key="listmovie">
                                <Link to="/ListMovies" onClick={()=>{
                                    setLocationMenu('movie')
                                    setLocationMenuSub('listmovie')
                                    localStorage.setItem("location",'movie')
                                    localStorage.setItem("locationSub",'listmovie')
                                    setGlobalMovie({
                                        id:null,
                                        description:'',
                                        duration: 0,
                                        genre: '',
                                        rating: 0,
                                        review: '',
                                        title: '',
                                        year: 0,
                                        image_url:''
                                    })
                                    localStorage.removeItem("movie")
                                }}>List Movie</Link>
                            </Menu.Item>
                            <Menu.Item key="CreateMovie">
                                <Link to="/CreateMovie"onClick={()=>{
                                    setLocationMenu('movie')
                                    setLocationMenuSub('CreateMovie')
                                    localStorage.setItem("location",'movie')
                                    localStorage.setItem("locationSub",'CreateMovie')
                                    setGlobalMovie({
                                        id:null,
                                        description:'',
                                        duration: 0,
                                        genre: '',
                                        rating: 0,
                                        review: '',
                                        title: '',
                                        year: 0,
                                        image_url:''
                                    })
                                    localStorage.removeItem("movie")
                                }} >Create Movie</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="game" icon={<LaptopOutlined />} title="Games Editor">
                        <Menu.Item key="listgames">
                                <Link to="/ListGames" onClick={()=>{
                                    setLocationMenu('game')
                                    setLocationMenuSub('listgames')
                                    localStorage.setItem("location",'game')
                                    localStorage.setItem("locationSub",'listgames')
                                    setGlobalGames({
                                        id:null,
                                        name: '',
                                        genre:'',
                                        singlePlayer: '',
                                        multiplayer: '',
                                        platform: '',
                                        release:0,
                                        image_url:''
                                    })
                                    localStorage.removeItem("game")
                                }}>
                                    List Games
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="CreateGames">
                                <Link to="/CreateGames" onClick={()=>{
                                    setLocationMenu('game')
                                    setLocationMenuSub('CreateGames')
                                    localStorage.setItem("location",'game')
                                    localStorage.setItem("locationSub",'CreateGames')
                                    setGlobalGames({
                                        id:null,
                                        name: '',
                                        genre:'',
                                        singlePlayer: '',
                                        multiplayer: '',
                                        platform: '',
                                        release:0,
                                        image_url:''
                                    })
                                    localStorage.removeItem("game")
                                }}>
                                    Create Games
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    </Sider>
                    }
                    <Content style={{ padding: '0px', minHeight: 280 }}>
                        <Switch>
                            <Route exact path="/">
                                <HomePage/>
                            </Route>
                            <ProtectedRouterLogin exact path="/Login"component={Login} user={user} />
                            <ProtectedRouterLogin exact path="/Register"component={Register} user={user} />
                            <ProtectedRouter exact path= "/ChangePassword" component={ChangePassword} user={user}/>
                            <ProtectedRouter exact path= "/Logout" user={user}/>
                            <Route exact path="/HomeMovies">
                                <HomeMovie/>
                            </Route>
                            <ProtectedRouter exact path= "/ListMovies" component={ListMovie} user={user}/>
                            <ProtectedRouter exact path= "/CreateMovie" component={FormCreateMovie} user={user}/>
                            <ProtectedRouter exact path= "/Movies/edit/:id" component={FormEditMovie} user={user}/>
                            <Route exact path="/Movies/detail/:id">
                                <ViewDetailMovie/>
                            </Route>
                            <Route exact path="/HomeGames">
                                <HomeGames/>
                            </Route>
                            <ProtectedRouter exact path= "/CreateGames" component={FormCreateGames} user={user}/>
                            <ProtectedRouter exact path= "/Games/edit/:id" component={FormEditGames} user={user}/>
                            <ProtectedRouter exact path= "/ListGames" component={ListGames} user={user}/>
                            <Route exact path="/Games/detail/:id">
                                <ViewDetaiGames/>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            }
            </Router>
            </>
        );
    }

export default LayoutPage;
