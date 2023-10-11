import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {

  //useNavigate of react-router-dom
  const navigate = useNavigate();

  //useState hook 
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  })

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  async function handleClick(e) {
    e.preventDefault();

    //console.log(data);

    try {
      const result = await axios.post(`https://blog-app-apis-607h.onrender.com/api/v1/user/register`, { username: data.username, email: data.email, password: data.password });

      if (result.data.success) {
        toast.success("User Registered Successfully...", {
          position: "top-center"
        });
        navigate('/login');
      }

    } catch (error) {
      console.log(error);
      toast.error("Error in user registration..", {
        position: "top-center"
      })
    }

    setData({
      username: "",
      email: "",
      password: "",
    })
  }

  return (
    <div>
      <form onSubmit={handleClick}>
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
            <Typography variant='h4' marginBottom={3} style={{ fontWeight: '500' }}>REGISTER</Typography>
            <TextField
              placeholder='username'
              name="username"
              value={data.username}
              type='text'
              margin='normal'
              required
              onChange={handleChange}
              autoComplete='off'
            ></TextField>

            <TextField
              placeholder='email'
              name="email"
              value={data.email}
              type='email'
              margin='normal'
              required
              onChange={handleChange}
              autoComplete='off'
            ></TextField>

            <TextField
              placeholder='password'
              name="password"
              value={data.password}
              type='password'
              margin='normal'
              required
              onChange={handleChange}
              autoComplete='off'
            ></TextField>

            <div className='mt-[25px]'>
              <Button type='submit' variant='contained' color='primary' style={{ borderRadius: '15px', padding: "7px 15px", fontWeight: '900' }}>SUBMIT</Button>
            </div>

            <Button onClick={() => navigate('/login')} style={{ marginTop: '15px' }}>Already Registered ? Login</Button>
          </Box>
        </div>
      </form>
    </div>
  )
}

export default Register