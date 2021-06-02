import { Card, Divider, Typography,  Row, Col, Layout, Space ,Carousel  } from 'antd';
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {StarFilled } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {ComponentContext} from "../context/ComponentContext"
import "../style.css";
const {Content } = Layout;
const { Meta } = Card;
const { Title , Paragraph,Text} = Typography;


const HomePage = () =>{
    const [movie, setMovie] = useState([]);
    const [game, setGame] = useState([]);
    let {user} = useContext(ComponentContext)
    let history = useHistory()

    useEffect(()=>{
        const fetchDataMovie = async ()=>{
            const result = await axios.get(`**********`)
            setMovie(result.data.slice(0,4))
        }
        const fetchDataGame = async ()=>{
            const result = await axios.get(`*************`)
            setGame(result.data.slice(0,4))
        }
        fetchDataGame()
        fetchDataMovie()
    },[])

    const viewDetailMovie = (id) =>{
        history.push(`/Movies/detail/${id}`);
    }

    const viewDetailGames = id =>{
        history.push(`/Games/detail/${id}`)
    }
    return(
        <>
        <Layout>
            <Space size={30} direction="vertical" style={{backgroundColor:'white'}}>
                <Content style={{backgroundColor:'white',padding:'24px'}}>
                    <Carousel autoplay>
                        <div>
                            <h3 className="contentStyle">
                                Welcome To Movie & Games Explore
                            </h3>
                        </div>
                        <div>
                            <h3 className="contentStyle">
                                More Fun, More Joy
                            </h3>
                        </div>
                    </Carousel>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                                <Title style={{textAlign:'center'}}>Movie</Title>
                        </Col>
                    </Row>
                    <Divider style={{border:'1px solid'}}></Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Space size={30}>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            {
                                user === null &&
                            <>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            </>
                            }
                            {
                                movie.map((data,index)=>{
                                    return(
                                    <Col className="gutter-row" key={index}>
                                        <button value={data.id} onClick={()=>{viewDetailMovie(data.id)}} style={{backgroundColor:'white',border:'0px'}}>
                                            <Card
                                                hoverable
                                                style={{ width: 180 }}
                                                size="small"
                                                cover={<img alt="baner" src={data.image_url} width="200"  height="200" style={{objectFit: 'cover'}} />}
                                                
                                                >   
                                                <Row style={{marginBottom:'10px'}}>
                                                    <Col span={5}></Col>
                                                    <Col span={12}>

                                                        <Text><StarFilled style={{color:'yellow',fontSize:"15px"}}/> {data.rating}/10</Text>
                                                    </Col>
                                                </Row>
                                                <Meta title={data.title} description={
                                                <Paragraph ellipsis={true ? { rows: 2, expandable: false } : false}>
                                                    {data.description}
                                                </Paragraph>
                                                }style={{height: '106px'}} />
                                            </Card>                                      
                                        </button>
                                        
                                    </Col>
                                    );
                                })
                            }

                        </Space>

                    </Row>
                </Content>
                <Content style={{backgroundColor:'white',padding:'24px'}}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                                <Title style={{textAlign:'center'}}>Games</Title>
                        </Col>
                    </Row>
                    <Divider style={{border:'1px solid'}}></Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Space size={30}>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            {
                                user === null &&
                            <>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            </>
                            }
                            {
                                game.map((data,index)=>{
                                    return(
                                    <Col className="gutter-row" key={index}>
                                        <button value={data.id} onClick={()=>{viewDetailGames(data.id)}} style={{backgroundColor:'white',border:'0px'}}>
                                            <Card
                                                hoverable
                                                style={{ width: 180}}
                                                size="small"
                                                cover={<img alt="baner" src={data.image_url} width="200" height="200" style={{objectFit: 'cover'}}/>}
                                            >
                                                <Meta title={data.name} description={
                                                    <>
                                                        <Paragraph>{data.genre}</Paragraph>
                                                        <Paragraph>{data.platform}</Paragraph>
                                                    </>
                                                } style={{height: '150px'}}/>
                                            </Card>
                                        </button>
                                    </Col>
                                    );
                                })
                            }
                        </Space>

                    </Row>
                </Content>
            </Space>
        </Layout>

        </>
    );
}

export default HomePage;