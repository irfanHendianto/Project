import { useParams ,useHistory} from "react-router-dom";
import { Typography,  Row, Col, Space, Layout,Image,Button  } from 'antd';
import { useEffect, useState } from "react";
import { ArrowLeftOutlined  } from '@ant-design/icons';
import {ComponentContext} from "../../context/ComponentContext";
import {useContext} from "react"
import axios from "axios";
const { Title , Paragraph,Text} = Typography;
const {Sider, Content } = Layout;


const ViewDetailMovie = ()=>{
    let {id} = useParams();
    const [game, setGame] = useState([])
    let history = useHistory();
    const {locationMenu} = useContext(ComponentContext);
    
    useEffect(()=>{
        const fetchDataDetail = async ()=>{
            const result = await axios.get(`*******/${id}`)
            setGame(result.data)
        }
        fetchDataDetail()
    },[id])
    const handleBack =()=>{
        if(locationMenu == "home") {
         history.push(`/`)
        }else{
            history.push(`/HomeGames`)
        }    
    }
    return(
        <>
        <Layout style={{padding:'24px',backgroundColor:'white'}}>
            <Layout style={{backgroundColor:'white'}}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                        <Button style={{border:'0px',paddingLeft:'0px'}} size="large" onClick={handleBack}>
                            <ArrowLeftOutlined style={{fontSize:'30px'}}/> 
                        </Button>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                        <Title>Detail Games</Title>
                    </Col>
                </Row>
            </Layout>
            <Layout style={{backgroundColor:'white', border:'1px solid', borderRadius:'10px',padding:'20px'}}>
                    <Sider style={{backgroundColor:"white"}}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{width:'100%'}}>
                            <Col className="gutter-row">
                                <Image
                                width={200}
                                height={200}
                                src={game.image_url}
                                style={{objectFit: 'cover'}}
                                />
                            </Col>
                        </Row>
                    </Sider>
                    <Layout  style={{backgroundColor:'white',padding:'20px'}}>
                        <Content >
                            <Space direction="vertical">
                                <Row>
                                    <Col>
                                        <Title level={3}>{game.name} ( {game.release} )</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Paragraph> <span style={{fontWeight:'bold'}}>Genre :</span> {game.genre}  </Paragraph>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Paragraph><span style={{fontWeight:'bold'}}>Platform :</span> {game.platform}/10</Paragraph>
                                    </Col>
                                </Row>
                                <Row>    
                                    <Col>
                                        {game.singlePlayer === 1 ? ( <Text keyboard>Single Player</Text>):(<></>)}
                                        {game.multiplayer === 1 ? ( <Text keyboard>Multi Player</Text>):(<></>)}
                                    </Col>
                                </Row>
                            </Space>
                        </Content>
                   </Layout>
            </Layout>
        </Layout>
        </>
    );
}

export default ViewDetailMovie;