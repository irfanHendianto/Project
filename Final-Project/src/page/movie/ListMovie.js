import {Typography, Layout, Space, Table, Button,Image, Input,Modal   } from 'antd';
import {ComponentContext} from "../../context/ComponentContext"
import {useEffect, useState,useContext} from "react";
import {ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";
const {Text } = Typography;


const ListMovie = ()=>{
    const {setGlobalMovie , user} = useContext(ComponentContext)
    const [movie, setMovie] = useState([]);
    const [fetch,setFetch] = useState(true)
    const [title,setTitle] = useState("")
    let history = useHistory()
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) => a.title.length - b.title.length,
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Image',
          dataIndex: 'image_url',
          key: 'image_url',
          render: theImageURL => <Image width={50} height={50} src={theImageURL} style={{objectFit: 'cover'}}/>
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          filters:[
              {
                text: 'Horor',
                value: 'Horor',
              },
              {
                text: 'Action',
                value: 'Action',
              },
              {
                text: 'Sci-Fi',
                value: 'Sci-Fi',
              },
              {
                text: 'Adventure',
                value: 'Andventure',
              },
              {
                text: 'Drama',
                value: 'Drama',
              },
              {
                text: 'Crime',
                value: 'Crime',
              },
          ],
            onFilter: (value, record) => record.genre.match(value),
            sorter: (a, b) => a.genre.length - b.genre.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.length - b.description.length,
            sortDirections: ['descend'],
            render: description =>  <Text style={true ? { width: 100 } : undefined} ellipsis={true}>{description} </Text>
         
        },
          {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            filters:[
                {
                    text: 1,
                    value: 1, 
                },
                {
                    text: 2,
                    value: 2, 
                },
                {
                    text: 3,
                    value: 3, 
                },
                {
                    text: 4,
                    value: 4, 
                },
                {
                    text: 5,
                    value: 5, 
                },
                {
                    text: 6,
                    value: 6, 
                },
                {
                    text: 7,
                    value: 7, 
                },
                {
                    text: 8,
                    value: 8, 
                },
                {
                    text: 9,
                    value: 9, 
                },
                {
                    text: 10,
                    value: 10, 
                },
            ],
            onFilter: (value, record) => record.rating === value,
            sorter: (a, b) => a.rating - b.rating,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'Durasi',
            dataIndex: 'duration',
            key: 'duration',
            sorter: (a, b) => a.duration - b.duration,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id) =>(
                <span>
                    <Space size={10}>
                        <Button value={id} onClick={()=>{modalConfirm(id)}}>Delete</Button>
                        <Button value={id} onClick={()=>{handleEdit(id)}}>Edit</Button>
                    </Space>
                </span>
            )
          },
      ];
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    useEffect(()=>{
        const fetchDataMovie = async ()=>{
            const result = await axios.get(`*******`)
            setMovie(result.data.map((el,index)=> {
                const {id, title, genre, description,year,rating,image_url,duration} = el;
                const key = index+1;
                return {key, id, title, genre, description,year,rating,image_url,duration}
              }))
        
        }
        if(fetch){
            setFetch(false)
            fetchDataMovie()
        }
    },[fetch])
    const searchFilter = (datas)=>{
        if(title !== ""){
            return datas.filter(data=>{
                return data.title.toLowerCase().match(title.toLocaleLowerCase())
            })
        }else{
            return datas
        }
    }

    const handleDelete = (id)=>{
        axios.delete(`**************************/${id}`,{headers: {"Authorization" : "Bearer "+ user.token}})
        .then(() => {
            setFetch(true)
        })
    }

    const handleEdit = (id) =>{
        axios.get(`************************************/${id}`)
        .then(res=>{
            let data = res.data
            let tempData = {
                id: data.id,
                description: data.description,
                duration: data.duration,
                genre: data.genre,
                rating: data.rating,
                review: data.review,
                title: data.title,
                year: data.year,
                image_url: data.image_url
            }
            setGlobalMovie(tempData)
            localStorage.setItem("movie", JSON.stringify(tempData))
            history.push(`/Movies/edit/${id}`);
        })
    }
    const modalConfirm =(id) =>{
          Modal.confirm({
            title: 'Confirm Delete',
            icon: <ExclamationCircleOutlined />,
            content:'Do you Want to delete these items?',
            onOk() {
              handleDelete(id)
            },
          });
    }
    return(
        <Layout>
            <Space direction="vertical" size={10} style={{backgroundColor:'white', padding:'24px'}}>
                <Input placeholder="Search Title" style={{ width: '20%' }} value={title} onChange={(e)=>{setTitle(e.target.value)}}></Input>
                <Table dataSource={searchFilter(movie)}  onChange={onChange} columns={columns} size={10} pagination={{ defaultPageSize: 5}} style={{backgroundColor:'white'}}>
                </Table>
            </Space>
        </Layout>
    );
}

export default ListMovie;