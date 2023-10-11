import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import BlogCard from '../components/BlogCard'

const UserBlogs = () => {

    const [blogs, setBlogs] = useState([]);

    async function getBlogsFromDatabase() {

        try {

            const id = localStorage.getItem("userId");
            const { data } = await axios.get(`https://blog-app-apis-607h.onrender.com/api/v1/blog/user-blog/${id}`);

            if (data && data.success) {
                setBlogs(data.userBlog.blogs);
                //console.log(data.userBlog.blogs);
            }

        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: "top-center",
            })
        }

    }


    //Use effect hook to get the data from the database using Rest APIS
    useEffect(() => {
        getBlogsFromDatabase();
    }, [])


    return (
        <div>
            {blogs && blogs.map((element) => (
                <BlogCard
                    key={element._id}
                    blogId={element._id}
                    currentUser={true}
                    title={element.title}
                    description={element.description}
                    image={element.image}
                    date={element.createdAt}
                    user={element.userId}
                    Username = {element.userId.username}
                />
            )
            )}
        </div>
    )
}

export default UserBlogs