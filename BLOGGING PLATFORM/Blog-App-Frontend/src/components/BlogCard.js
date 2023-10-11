import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function BlogCard(props) {

    const x = props.Username && props.Username[0]

    //console.log(x);

    const navigate = useNavigate();

    async function handleDelete() {

        try {

            const result = await axios.delete(`https://blog-app-apis-607h.onrender.com/api/v1/blog/delete-blog/${props.blogId}`)

            if (result.data.success) {

                //window.location.reload();

                //navigate to create blog
                navigate("/create-blogs");

                toast.success("Blog Deleted Successfully...", {
                    position: 'top-center'
                })
            }

        } catch (error) {
            console.log(error)
            toast.error("Error in deleting the blog..", {
                position: "top-center"
            })
        }

        // try {
        //     const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
        //     if (data?.success) {
        //       alert("Blog Deleted");
        //       window.location.reload();
        //     }
        //   } catch (error) {
        //     console.log(error);
        //   }

    }


    async function handleEdit() {

        try {

            navigate(`/edit-blog/${props.blogId}`);
            toast.success("Navigated to the Update page..", {
                position: "top-center"
            })

        } catch (error) {
            console.log(error)
            toast.error("Error in navigating to the EDIT page !!", {
                position: "top-center"
            })
        }

    }



    return (
        <div className='flex justify-center'>
            <Card className='w-11/12 lg:w-2/5 mt-[40px] mb-[10px] shadow-lg' sx={{ boxShadow: "7px 7px 10px grey" }}>

                {/* Show EDIT and DELETE button with the currentUser */}
                {props.currentUser && (
                    <Box display={"flex"} >
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {x}
                        </Avatar>
                    }
                    title={props.user && props.user.username}
                    subheader={props.title}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.image}
                    alt="blog-image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
} 