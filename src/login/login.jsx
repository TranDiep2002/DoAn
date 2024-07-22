import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import authAPI from '../route/authAPI';
import { useNavigate } from 'react-router-dom';
import './login.css'
import ErrorText from '../components/Typography/ErrorText'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-notifications/lib/notifications.css';
const Login = () => {
    const [maUser,setMaUser] = useState('');
    const [passWord,setPassWord] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")

    const handelMaUserChange =(event)=>{
        setMaUser(event.target.value);
    }
    const handelPassWordChange = (event)=>{
        setPassWord(event.target.value);
    }

    const handelLogin = async()=>{
        const body={
            maUser:maUser,
            passWord:passWord
        };
        try {
            const response= await authAPI.login(body);
            if( response.data === "không tìm thấy tài khoản để đăng nhập"){
              setErrorMessage("Sai tên đăng nhập hoặc mật khẩu!")
            }else{
            localStorage.setItem("token", JSON.stringify(response.data));
            localStorage.setItem("maUser", JSON.stringify(maUser));
            navigate("/app")
            window.location.reload();
            console.log("token la :",response.data)
            }
        } catch (error) {
            console.log("loi khi dang nhap:",error)
        }
    }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src='https://hou.edu.vn/files/iconkhoa/DV01.png' style={{height:'500px',marginLeft:'100px'}} class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6' className='custom-form' style={{width:'500px',backgroundColor: 'rgb(242, 244, 245)'}}>
            <h2 style={{marginTop:'10px',marginLeft:'100px', color:'black'}}><b>WELCOME TO</b></h2>
          <h4 style={{marginTop:'20px',marginLeft:'40px', color:'black'}}><b>PROJECT MANAGEMENT SYSTEM</b></h4>
          <MDBInput wrapperClass='mb-4' label='Nhập mã sinh viên/giảng viên' id='formControlLg'  value={maUser} placeholder='Nhập mã sinh viên/giảng viên' onChange={handelMaUserChange} type='text' size="lg" style={{marginTop:'50px',backgroundColor:'white'}}/>
          <MDBInput wrapperClass='mb-4' label='Nhập mật khẩu' id='formControlLg'  value={passWord} placeholder='Nhập mật khẩu' onChange={handelPassWordChange} type='password' size="lg" style={{backgroundColor:'white'}}/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' type='button' onClick={handelLogin} style={{marginLeft:'150px'}}>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? Please contact your advisor or academic staff member for assistance!</p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary" style={{position:'fixed', right:0,left:0,bottom:0}}>

        <div className="text-white mb-3 mb-md-0">
          Copyright Trần Diệp, Hà Mai, Minh Thủy. All rights reserved.
        </div>

        <div className="text-white mb-3 mb-md-0">
            Địa chỉ: 96 Định Công, Hoàng Mai, Hà Nội
        </div>

      </div>

    </MDBContainer>
  );
}

export default Login
