import {useState, useEffect } from 'react';
 import axios from 'axios';
import { BACKEND_URL } from '../config';

export type BlogType = {
  "content": string;
  "title": string;
  "id": number;
  "author": {
      "name": string,
      "email": string
  }
}


 export const  useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
      headers: {
        Authorization: localStorage.getItem('medium_user_token'),
      }
    })
    .then(res => {
      setBlogs(res.data.blogs);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
    })
  }, [])

  return {loading, blogs};
 }

 export const  useBlog = ({id}: {id: string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
      headers: {
        Authorization: localStorage.getItem('medium_user_token'),
      }
    })
    .then(res => {
      // console.log(res.data);
      setBlog(res.data.blog);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
    })
  }, [])

  return {loading, blog};
 }