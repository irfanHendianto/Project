import { Form, Input, Button,Typography, Divider  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useState} from "react"
import {useHistory } from "react-router-dom";
import axios from "axios";
const { Title} = Typography;
  
  /* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not a valid email!',
    },
};
const Register = ()=>{
    const [input,] = useState({
        name:'',
        password:"",
        email:""
    })
    let history = useHistory();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post(`***************`, {name: values.name, email: values.email, password: values.password})
        .then((res)=> {
            history.push(`/Login`);
            form.resetFields();
            })
        .catch(err=>{
            alert(err.mes)
        })
    };
    return (
        <div style={{margin:'auto',textAlign:'center',width:'50%'}}>  
            <Title>Register</Title>
            <Divider></Divider>
            <Form
            form={form}
            name="normal_login"
            className="login-form"
            validateMessages={validateMessages}
            initialValues={input}
            onFinish={onFinish}
            >
                <Form.Item
                    name='name'
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{width:"50%"}} placeholder="Name *"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password *"
                    style={{width:'50%'}}
                    />
                </Form.Item>
                <Form.Item
                name='email'
                rules={[
                {
                    required: true,
                    type: 'email',
                },
                ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email *" style={{width:'50%'}} />
                </Form.Item>

                <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                        </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;