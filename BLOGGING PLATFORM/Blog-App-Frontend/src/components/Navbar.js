import React from 'react';
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { authAction } from '../redux/store';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Handling the logout button
    function handleLogout() {

        try {
            //call logout function from the reducer
            dispatch(authAction.logout());

            //logout message
            toast.success("Logged Out Successfully...", {
                position: "top-center"
            });

            //navigate to the login page
            navigate('/login');

            //clear local storage on logout
            localStorage.clear();

        } catch (error) {
            toast.error(error, {
                position: "top-center"
            })
        }

    }
    


    //global hook
    let isLogin = useSelector((state) => state.isLogin)
    //console.log(isLogin);

    isLogin = isLogin || localStorage.getItem("userId");


    return (
        <div>
            <AppBar position='sticky' color='secondary'>
                <Toolbar>
                    <Typography variant='h4'>
                        Blogging Website
                    </Typography>

                    {/* Show Blogs and Myblogs tab when the user is LOGGED IN
                    {isLogin && (
                        <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
                            <div className='text-white font-black'>
                                <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                                    <Tab label='Blogs' LinkComponent={Link} to='/blogs'></Tab>
                                    <Tab label='My Blogs' LinkComponent={Link} to='/my-blogs'></Tab>
                                    <Tab label='Create Blogs' LinkComponent={Link} to='/create-blogs'></Tab>
                                </Tabs>
                            </div>
                        </Box>
                    )} */}

                    <Box display={'flex'} marginLeft="auto">
                        {/* Show login and register buttons when the user is not LOGGED IN */}
                        {!isLogin && (
                            <div>
                                <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register">Register</Button>
                            </div>
                        )}

                        {/* Show the logout when the user is already login */}
                        {isLogin && (<div>
                            <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to='/blogs'>Blogs</Button>
                            <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to='/my-blogs'>My Blogs</Button>
                            <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to='/create-blogs'>Create Blogs</Button>
                            <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>Logout</Button>
                        </div>)}

                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar  