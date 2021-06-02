import {ComponentContext} from "../../context/ComponentContext"
import { Divider, Typography, Layout,  Form, Input, InputNumber, Button, Row, Col,Modal  } from 'antd';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import { useContext } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
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

const FormEditMovie = ()=>{
    const [form] = Form.useForm();
    const {globaMovie,user} = useContext(ComponentContext)
    let history = useHistory()
    
    const onFinish = (values) => {
        axios.put(`***********/${globaMovie.id}`, {title: values.title, description: values.description, year: values.year, duration: values.duration, genre: values.genre, rating:values.rating, review:values.review, image_url:values.image_url}, {headers: {"Authorization" : "Bearer "+ user.token}})
        .then(() => {
            history.push(`/ListMovies`);
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
                <Title>Form Data Movies</Title>
                <Divider></Divider>
                <Form form={form} {...layout} name="nest-messages" initialValues={globaMovie} onFinish={modalConfirm} validateMessages={validateMessages}>
                <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="title"
                                    label="Title"
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
                                    name="duration"
                                    label="Durasi"
                                    rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                    },
                                    ]}
                                >
                                    <InputNumber style={{width:"80%"}} />
                                </Form.Item>
                            </div>
                       </Col>
                       <Col span={12}>
                            <Form.Item
                                name="year"
                                label="Tanggal Keluar"
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
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    min: 0,
                                },
                                ]}
                            >
                                <InputNumber style={{width:"68%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{paddingLeft:'25%'}}>
                        <Col span={24}>
                            <Form.Item name="description" label="Description" rules={[{required:true}]}>
                                <Input.TextArea style={{width:"70%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{paddingLeft:'25%'}}>
                        <Col span={24}>
                            <Form.Item name="review" label="Review" rules={[{required:true}]}>
                                <Input.TextArea style={{width:"70%"}} />
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

export default FormEditMovie;