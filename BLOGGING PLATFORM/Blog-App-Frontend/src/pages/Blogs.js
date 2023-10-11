import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import BlogCard from '../components/BlogCard'

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);

  const currentUserId = localStorage.getItem("userId");

  async function getBlogsFromDatabase() {

    try {

      const { data } = await axios.get(`https://blog-app-apis-607h.onrender.com/api/v1/blog/all-blogs`);

      if (data && data.success) {
        setBlogs(data.blogData);
        //console.log(data.blogData);
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
      {blogs && blogs.map((element) => {
        return (
          <BlogCard
            key = {element._id}
            blogId={element._id}
            currentUser = {currentUserId === element.userId}
            title={element.title}
            description={element.description}
            image={element.image}
            date={element.createdAt}
            user={element.userId}
            Username = {element.userId?.username} />
        )
      })}
    </div>
  )
}

export default Blogs