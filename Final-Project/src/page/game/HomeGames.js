import { Card, Divider, Typography,  Row, Col, Layout, Space,Pagination  } from 'antd';
import {useEffect, useState,useContext} from "react";
import axios from "axios";
import {ComponentContext} from "../../context/ComponentContext"
import {useHistory} from "react-router-dom";
const {Content } = Layout;
const { Meta } = Card;
const { Title , Paragraph} = Typography;

const HomeGames = () =>{
    const {user} = useContext(ComponentContext)
    let number;
    (user === null) ? number = 5 : number = 4;
    const [game, setGame] = useState([]);
    const [currentPageElements, setCurrentPageElements ] = useState([]);
    const [elementsPerPage,] = useState(number);
    const [pagesCount, setPagesCount] = useState(1)
    const [totalElementsCount, setTotalElementsCount] = useState(0)
    const [offset, setOffset] = useState(0)
    let history = useHistory()

    useEffect(()=>{
        const fetchDataGame = async ()=>{
            const result = await axios.get(`******`)
            setGame(result.data)
            setTotalElementsCount(result.data.length);
            setPaginationStates();
        }
        fetchDataGame()
    },[offset,pagesCount])

    const setPaginationStates = () => {
        let pageCountTemp = Math.ceil(totalElementsCount / elementsPerPage)
        setPagesCount(pageCountTemp)
        setElementsForCurrentPage()
    }
    
    const setElementsForCurrentPage = () => {
        
        const currentPageElements = game.slice(offset, offset + elementsPerPage);
        setCurrentPageElements(currentPageElements)
    }
    
    const handlePageClick = (pageNumber) => {
        
        const currentPagee = pageNumber - 1;
        const offset = currentPagee * elementsPerPage;
        setOffset(offset)
        setElementsForCurrentPage()
        
    }

    const viewDetailGames = id =>{
        history.push(`/Games/detail/${id}`)
    }
    return(
        <>
        <Layout>
        <   Space direction="horizontal" size={30} style={{backgroundColor:'white'}}>
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
                                <Title>Games</Title>
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
                {pagesCount > 1 &&
                    <Pagination
                        defaultCurrent={1}
                        onChange={handlePageClick}
                        size="medium"
                        total={totalElementsCount}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize={elementsPerPage}
                        showSizeChanger={false}
                        style={{margin:'10px'}}
                        style={{margin:'10px',marginTop:'20px',marginLeft:'60px',marginBottom:'50px'}}
                    />
                }
            </Space>
            </Space>
        </Layout>

        </>
    );
}

export default HomeGames;