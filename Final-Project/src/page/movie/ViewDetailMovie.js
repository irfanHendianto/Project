import { useParams , useHistory} from "react-router-dom";
import { Typography,  Row, Col, Space, Layout,Comment,Tooltip, Button  } from 'antd';
import { useEffect, useState } from "react";
import { Image } from 'antd';
import axios from "axios";
import { FieldTimeOutlined, UserOutlined,ArrowLeftOutlined,StarFilled  } from '@ant-design/icons';
import {ComponentContext} from "../../context/ComponentContext";
import {useContext} from "react";
import moment from 'moment';
const { Title , Paragraph} = Typography;
const {Sider, Content } = Layout;


const ViewDetailMovie = ()=>{
    let {id} = useParams();
    const [movie, setMovie] = useState([]);
    const [duration,setDuration] = useState("");
    const {locationMenu} = useContext(ComponentContext);
    let history = useHistory();

    useEffect(()=>{
        const fetchDataDetail = async ()=>{
            const result = await axios.get(`**********/${id}`)
            setMovie(result.data)
            let durationtemp= timeConvert(result.data.duration)
            setDuration(durationtemp)
        }
        const timeConvert  = (n) => {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            
            if(num < 60 ){
                return `${num}m`
            }else{
                if(rminutes == 0){
                    return `${rhours}h`
                }else{
                    return `${rhours}h ${rminutes}m`
                }
            }
        }
        fetchDataDetail()
    },[])
    const handleBack =()=>{
        if(locationMenu == "home") {
         history.push(`/`)
        }else{
            history.push(`/HomeMovies`)
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
                        <Title>Detail Movie</Title>
                    </Col>
                </Row>
            </Layout>
            <Layout style={{backgroundColor:'white', border:'1px solid', borderRadius:'10px',padding:'20px'}}>
                    <Sider style={{backgroundColor:"white"}}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{width:'100%'}}>
                            <Col className="gutter-row" span={12}>
                                <Image
                                width={200}
                                height={200}
                                src={movie.image_url}
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
                                        <Title level={3}>{movie.title} ( {movie.year} )</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Space>
                                            <Paragraph> <span style={{fontWeight:'bold'}}>Genre :</span> {movie.genre}  </Paragraph>
                                            <Paragraph><FieldTimeOutlined/>  {duration}  </Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Paragraph><span style={{fontWeight:'bold'}}>Rating :</span> <StarFilled style={{color:'yellow'}}/> {movie.rating}/10</Paragraph>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Paragraph ellipsis={true ? { rows: 2, expandable: true,symbol:'more' } : false}><span style={{fontWeight:'bold'}}>Overview :</span>{movie.description}</Paragraph>
                                    </Col>
                                </Row>
                            </Space>
                        </Content>
                
                        <Row>
                            <Col>
                                <Paragraph style={{fontWeight:'bold'}}>
                                    Review : 
                                </Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Comment
                                    author={<a>Someone</a>}
                                    avatar={
                                        <UserOutlined></UserOutlined>
                                    }
                                    content={
                                        <Paragraph ellipsis={true ? { rows: 2, expandable: true,symbol:'more' } : false}>
                                            {movie.review}
                                        </Paragraph>
                                    }
                                    datetime={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment().fromNow()}</span>
                                        </Tooltip>
                                    }
                                />
                            </Col>
                        </Row>
                   </Layout>
            </Layout>
        </Layout>
        </>
    );
}

export default ViewDetailMovie;