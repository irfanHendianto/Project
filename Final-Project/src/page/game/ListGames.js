import {Typography, Layout, Space, Table, Button,Image, Input,Modal } from 'antd';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import {ComponentContext} from "../../context/ComponentContext"
import {useContext} from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
const {Text } = Typography;



const ListGames = ()=>{
  const {setGlobalGames , user} = useContext(ComponentContext)
    const [game, setGame] = useState([]);
    const [fetch,setFetch] = useState(true)
    const [title,setTitle] = useState("")
    let history = useHistory()

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
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
                text: 'Battle Royale',
                value: 'Battle Royale',
              },
              {
                text: 'Racing',
                value: 'Racing',
              },
              {
                text: 'Survival game',
                value: 'Survival game',
              },
              {
                text: 'Adventure',
                value: 'Adventure',
              },
              {
                text: 'Action',
                value: 'Action',
              },
              {
                text: 'RPG',
                value: 'RPG',
              },
              {
                text: 'Horor',
                value: 'Horor',
              },
              {
                text: 'FPS',
                value: 'FPS',
              },
          ],
            onFilter: (value, record) => record.genre.match(value),
            sorter: (a, b) => a.genre.length - b.genre.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Release',
            dataIndex: 'release',
            key: 'release',
            sorter: (a, b) => a.release - b.release,
            sortDirections: ['descend','ascend'],
          },
         {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            sorter: (a, b) => a.platform.length - b.platform.length,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'Single Player / Multi Player',
            key: 'player',
            dataIndex: 'player',
            filters:[
                {
                    text: 'Single Player',
                    value: 'Single Player',
                },
                {
                    text: 'Multi Player',
                    value: 'Multi Player',
                },
            ],
            onFilter: (value, record) => record.player[0] === value || record.player[1] === value,
            sorter: (a, b) => a.player.length - b.player.length,
            sortDirections: ['descend','ascend'],
            render: player => (
              <span>
                {player.map(player => {
                  return (
                    <Space size={20} direction="vertical">
                        <Text keyboard>
                        {player}
                        </Text>
                    </Space>
                  );
                })}
              </span>
            ),
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
            const result = await axios.get(`*********`)
            setGame(result.data.map((el,index)=> {
                const {id, name, genre,platform,image_url,release} = el;
                let player = []
                if(el.singlePlayer === 1 && el.multiplayer === 1){
                    player = ["Single Player", "Multi Player"]
                }else if(el.singlePlayer === 1) {
                    player = ["Single Player"]
                }else {
                    player = ["Multi Player"]
                }
                const key = index+1;
                return {key, id, name, genre, player,platform,image_url,release}
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
                return data.name.toLowerCase().match(title.toLocaleLowerCase())
            })
        }else{
            return datas
        }
    }
    const handleEdit = (id) =>{
      axios.get(`****************************************************/${id}`)
      .then(res=>{
          let data = res.data
          let tempData ={
            id: data.id,
            name: data.name,
            genre:data.genre,
            singlePlayer: data.singlePlayer.toString(),
            multiplayer: data.multiplayer.toString(),
            platform: data.platform,
            release: parseInt(data.release),
            image_url: data.image_url
          }
          setGlobalGames(tempData)
          localStorage.setItem("game", JSON.stringify(tempData))
          history.push(`/Games/edit/${id}`);
      })
  }

    const handleDelete = (id)=>{
      axios.delete(`****************************************************/${id}`,{headers: {"Authorization" : "Bearer "+ user.token}})
      .then(() => {
          setFetch(true)
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
            <Space direction="vertical" size={10} style={{backgroundColor:'white',padding:'24px'}}>
                <Input placeholder="Search Title" style={{ width: '20%' }} value={title} onChange={(e)=>{setTitle(e.target.value)}}></Input>
                <Table dataSource={searchFilter(game)}  onChange={onChange} columns={columns} size={10} pagination={{ defaultPageSize: 5}} style={{backgroundColor:'white'}}>
                </Table>
            </Space>
        </Layout>
    );
}

export default ListGames;