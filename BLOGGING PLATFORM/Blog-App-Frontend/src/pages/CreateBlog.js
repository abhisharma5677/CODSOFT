import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, InputLabel, TextField } from "@mui/material";
import { toast } from "react-toastify"


const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });
    // input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://blog-app-apis-607h.onrender.com/api/v1/blog/post-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                userId: id,
            });
            if (data?.success) {
                toast.success("Blog Created", {
                    position: "top-center"
                });
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="lg:flex lg:justify-center">
                <form onSubmit={handleSubmit}
                 className="flex justify-center flex-col border p-4 lg:w-1/2 m-4 shadow-md shadow-gray-600 rounded-lg mt-10 lg:mt-20">
                    {/* <Box
                    // width={"50%"}
                    // border={3}
                    // borderRadius={10}
                    // padding={3}
                    // margin="auto"
                    // boxShadow={"10px 10px 20px #ccc"}
                    // display="flex"
                    // flexDirection={"column"}
                    // marginTop="30px"
                    > */}
                        {/* <Typography
                            variant="h2"
                            textAlign={"center"}
                            fontWeight="bold"
                            padding={3}
                            color="grey"
                        >
                            Create A Post
                        </Typography> */}
                        <div className="flex justify-center text-[35px] lg:text-[50px] mt-[10px] mb-[20px] text-gray-600 font-bold">
                            Create A Post
                        </div>
                        <InputLabel
                            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                        >
                            Title
                        </InputLabel>
                        <TextField
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            autoComplete="off"
                        />
                        <InputLabel
                            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                        >
                            Description
                        </InputLabel>
                        <TextField
                            name="description"
                            value={inputs.description}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            autoComplete="off"
                        />
                        <InputLabel
                            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                        >
                            Image URL
                        </InputLabel>
                        <TextField
                            name="image"
                            value={inputs.image}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            autoComplete="off"
                        />
                        <Button type="submit" color="warning" variant="contained" style={{marginTop:"30px", marginBottom:"20px"}}>
                            SUBMIT
                        </Button>
                    {/* </Box> */}
                </form>
            </div>
        </>
    );
};

export default CreateBlog;