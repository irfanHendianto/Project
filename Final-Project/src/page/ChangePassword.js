import { Form, Input, Button,Typography, Divider,Modal  } from 'antd';
import { LockOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {ComponentContext} from "../context/ComponentContext"
import {useState} from "react"
import {useHistory } from "react-router-dom";
import axios from "axios";
import Layout from 'antd/lib/layout/layout';
import {useContext} from "react";
const { Title} = Typography;

  
  /* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not a valid email!',
    },
};
const ChangePassword = ()=>{
    const [input,setInput] = useState({
        current_password:'',
        new_password:"",
        new_confirm_password:""
    })
    let history = useHistory();
    const {user} = useContext(ComponentContext)
    const [form] = Form.useForm();


    const onFinish = (values) => {
        const {current_password, new_password,new_confirm_password} = values
        if(new_password === new_confirm_password){
            axios.post(`*******`,{current_password, new_password, new_confirm_password}, {headers: {"Authorization" : "Bearer "+ user.token}})
            .then((res)=> {
                setInput({
                    current_password:'',
                    new_password:"",
                    new_confirm_password:""           
                })
            })
            .catch(err=>{
                alert(err.message)
                
            })
            history.push(`/ChangePassword`);
            form.resetFields();
            success()
        }else{
            warning("Password Salah","Password Konfirmasi Tidak sama dengan Password Password baru")
        }
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
    const warning = (title,message) => {
        Modal.warning({
          title: `${title}`,
          content: `${message}`,
        });
    }
    const success =()=> {
        Modal.success({
          content: 'Ubah Password Berhasil',
        });
    }
    return (
        <Layout style={{backgroundColor:'white'}}>
        <div style={{margin:'auto',textAlign:'center',width:'50%'}}>  
            <Title>Change Password</Title>
            <Divider></Divider>
            <Form
            form={form}
            name="normal_login"
            className="login-form"
            validateMessages={validateMessages}
            initialValues={input}
            onFinish={modalConfirm}
            >
                <Form.Item
                    name='current_password'
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} style={{width:"50%"}} type="password" placeholder="Current Password *"/>
                </Form.Item>
                <Form.Item
                    name="new_password"
                    rules={[{ required: true }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="New Password  *"
                    style={{width:'50%'}}
                    />
                </Form.Item>
                <Form.Item
                name='new_confirm_password'
                rules={[
                {
                    required: true,
                },
                ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="New Confirm Password *" style={{width:'50%'}} />
                </Form.Item>

                <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
                        </Button>
                </Form.Item>
            </Form>
        </div>
        </Layout>
    );
}

export default ChangePassword;