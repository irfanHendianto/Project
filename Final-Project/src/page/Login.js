import { Form, Input, Button, Typography, Divider ,Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useState, useContext} from "react"
import {useHistory, Link } from "react-router-dom";
import {ComponentContext} from "../context/ComponentContext"
import axios from "axios";
const {Title} = Typography;

  
  
  /* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};
const Login = ()=>{
    let {setUser} = useContext(ComponentContext)
    const [input,] = useState({
        password:"",
        email:""
    })
    let history = useHistory();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post(`**********`, {email: values.email, password: values.password})
        .then((res)=> {
                var user = res.data.user
                var token = res.data.token
                var currentUser = {name: user.name, email: user.email, token }
                setUser(currentUser)
                localStorage.setItem("user", JSON.stringify(currentUser))
                history.push(`/`);
                form.resetFields();
            })
    };
    return (
        <div style={{margin:'auto',textAlign:'center',width:'50%'}}>  
            <Title>Login</Title>
            <Divider style={{width:'50%'}}></Divider>
            <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={input}
            onFinish={onFinish}
            >
                    <Form.Item
                    name='email'
                    rules={[
                    {
                        required: true,
                        type: 'email',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" style={{width:'50%'}} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    style={{width:'50%'}}
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in 
                        </Button>
                        Or 
                        <Link to="/Register">  register now!</Link> 
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;