"use client";

import blogService from '@/components/customs/services/blog.service'
import { withAuthInfo } from '@propelauth/react';
import React, { useEffect, useState } from 'react'

const Blog = withAuthInfo(({accessToken}) => {

    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        blogService.getBlogs(accessToken!).then((_blogs) => {
            setBlogs(_blogs);
        });
    }, []);

  return (
    <>
        <div>Blog</div>
        {JSON.stringify(blogs)}
    </>
  )
})

export default Blog