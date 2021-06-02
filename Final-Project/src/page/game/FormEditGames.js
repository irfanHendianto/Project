import {ComponentContext} from "../../context/ComponentContext"
import { Divider, Typography, Layout,  Form, Input, InputNumber, Button , Select, Row, Col, Modal } from 'antd';
import { useContext } from "react";
import {ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";
const {Option} = Select
const {Content} = Layout
const {Title} = Typography

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const FormEditGames = ()=>{
    const [form] = Form.useForm();
    const {globalGames,user} = useContext(ComponentContext)
    let history = useHistory()

    const onFinish = (values) => {
        axios.put(`********/${globalGames.id}`, {name: values.name, genre: values.genre, singlePlayer: values.singlePlayer, multiplayer: values.multiplayer, platform: values.platform, release: values.release, image_url: values.image_url}, {headers: {"Authorization" : "Bearer "+ user.token}})
        .then(() => {
            history.push(`/ListGames`);
        })
    };

    const modalConfirm =(values) =>{
        Modal.confirm({
          title: 'Confirm Change Data',
          icon: <ExclamationCircleOutlined />,
          content:'Do you want to change these items?',
          onOk() {
            onFinish(values)
          },
        });
    }
    return(
        
        <Layout style={{backgroundColor:'white',padding:"24px"}}>
            <Content style={{border:'1px solid', borderRadius:'10px',padding:"20px"}}>
                <Title>Form Edit Data Games</Title>
                <Divider></Divider>
                <Form form={form} {...layout} name="nest-messages" initialValues={globalGames} onFinish={modalConfirm} validateMessages={validateMessages}>
                <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input  style={{width:"80%"}}/>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="genre"
                                label="Genre"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input style={{width:"50%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                            <Form.Item
                                name="singlePlayer"
                                label="Single Player"
                                rules={[{ required: true, message: 'Please select Single Player' }]}
                            >
                                <Select placeholder="Please select Single Player" style={{width:"80%"}} >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                            </Form.Item>
                            </div>
                        
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="multiplayer"
                                label="Multi Player"
                                rules={[{ required: true, message: 'Please select Multi Player!' }]}
                            >
                                <Select placeholder="Please select Multi Player" style={{width:"50%"}} >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="platform"
                                    label="Platform"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input style={{width:"80%"}} />
                                </Form.Item>

                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="release"
                                label="Release"
                                rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    min: 0,
                                },
                                ]}
                            >
                                <InputNumber style={{width:"50%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{paddingLeft:'25%'}}>
                        <Col span={24}>
                            <Form.Item name="image_url" label="Image URL" rules={[{required:true}]}>
                                <Input.TextArea style={{width:"70%"}} />
                            </Form.Item>
                        
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Content>
        </Layout>
    );
}

export default FormEditGames;