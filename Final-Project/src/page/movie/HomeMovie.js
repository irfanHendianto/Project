import { Card, Divider, Typography,  Row, Col, Layout, Space,Pagination  } from 'antd';
import {useEffect, useState,useContext} from "react";
import {ComponentContext} from "../../context/ComponentContext";
import {StarFilled } from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";
const {Content } = Layout;
const { Meta } = Card;
const { Title , Paragraph,Text} = Typography;

const HomeMovie = ()=>{
    let number;
    const {user} = useContext(ComponentContext)
    const [movie, setMovie] = useState([]);
    const [currentPageElements, setCurrentPageElements ] = useState([]);
    (user === null) ? number = 5 : number = 4;
    const [elementsPerPage,] = useState(number);
    const [pagesCount, setPagesCount] = useState(1)
    const [totalElementsCount, setTotalElementsCount] = useState(0)
    const [offset, setOffset] = useState(0)
    let history = useHistory()
    

    useEffect(()=>{
        const fetchDataMovie = async ()=>{
            const result = await axios.get(`*********`)
            setMovie(result.data)
            setTotalElementsCount(result.data.length)
            setPaginationStates();
            
        }
        fetchDataMovie()
    
    },[offset,pagesCount])

    const setPaginationStates = () => {
        let pageCountTemp = Math.ceil(totalElementsCount / elementsPerPage)
        setPagesCount(pageCountTemp)
        setElementsForCurrentPage()
    }
    
    const setElementsForCurrentPage = () => {
        
        const currentPageElements = movie.slice(offset, offset + elementsPerPage);
        setCurrentPageElements(currentPageElements)
    }
    
    const handlePageClick = (pageNumber) => {
        
        const currentPagee = pageNumber - 1;
        const offset = currentPagee * elementsPerPage;
        setOffset(offset)
        setElementsForCurrentPage()
        
    }
    const viewDetailMovie = (id) =>{
        history.push(`/Movies/detail/${id}`);
    }

    return(
        <Layout>
            <Space direction="horizontal" size={30} style={{backgroundColor:'white'}}>
            {
                user === null &&
                <>
                <Row></Row>
                <Row></Row>
                </>
            }
            <Space size={30} direction="vertical" style={{backgroundColor:'white'}}>
                <Content style={{backgroundColor:'white',padding:'24px'}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                                <Title>Movie</Title>
                        </Col>
                    </Row>
                    <Divider style={{border:'1px solid'}}></Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Space size={30}>
                            <Row></Row>
                            {
                                currentPageElements.map((data,index)=>{
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
                {pagesCount > 1 &&
                    <Pagination
                        defaultCurrent={1}
                        onChange={handlePageClick}
                        size="medium"
                        total={totalElementsCount}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize={elementsPerPage}
                        showSizeChanger={false}
                        style={{margin:'10px',marginTop:'20px',marginLeft:'60px',marginBottom:'50px'}}
                    />
                }
            </Space>
            </Space>
        </Layout>
    );
}

export default HomeMovie;