import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/store'


const Login = () => {

  //use of react redux global hook i.e. useDispaatch to change the values of the functions inside the reducer...
  const dispatch = useDispatch();


  // useNavigate of react-router-dom
  const navigate = useNavigate();


  //useState for getting login content..
  const [loginContent, setLoginContent] = useState({
    email: "",
    password: "",
  })


  //Implimenting the handleChange function...
  function handleChange(e) {
    setLoginContent({
      ...loginContent,
      [e.target.name]: e.target.value,
    })
  }


  //Handling the login button click...
  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(loginContent);

    try {

      const result = await axios.post(`https://blog-app-apis-607h.onrender.com/api/v1/user/login`, { email: loginContent.email, password: loginContent.password });

      //if 'true' success message
      if (result.data.success) {
        //toast message for successfully login...
        toast.success("User Login Succesfull...", {
          position: "top-center"
        })

        //Change the global state of login to true which was false initially
        dispatch(authAction.login());

        //console.log(result.data.user._id)

        //Save this ID to the local storage
        localStorage.setItem("userId", result?.data?.user._id);


        //after login navigate to the blogs...
        navigate('/blogs');
      }

    } catch (error) {

      console.log(error);

      //toast message on login error !!
      toast.error("Error in Login !!", {
        position: "top-center"
      })
    }

    setLoginContent({
      email: "",
      password: "",
    })
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center '>
          <Box
            display={"flex"}
            flexDirection={'column'}
            maxWidth={'95%'}
            alignItems={'center'}
            justifyContent={'center'}
            marginTop={10}
            boxShadow='10px 10px 20px grey'
            paddingTop={7}
            borderRadius={5}
            paddingBottom={7}
            paddingLeft={'10%'}
            paddingRight={'10%'}
          >
            <Typography variant='h4' marginBottom={3} style={{ fontWeight: '500' }}>LOGIN</Typography>
            <TextField
              placeholder='email'
              name="email"
              value={loginContent.email}
              type='email'
              margin='normal'
              required
              onChange={handleChange}
              autoComplete='off'
            ></TextField>

            <TextField
              placeholder='password'
              name="password"
              value={loginContent.password}
              type='password'
              margin='normal'
              required
              onChange={handleChange}
              autoComplete='off'
            ></TextField>

            <div className='mt-[25px]'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                style={{ borderRadius: '15px', padding: "7px 15px", fontWeight: '900' }}
              >LOGIN</Button>
            </div>

            <Button onClick={() => navigate('/register')} style={{ marginTop: '15px' }}>Not Registered ? Register</Button>
          </Box>
        </div>
      </form>
    </div>
  )
}

export default Login