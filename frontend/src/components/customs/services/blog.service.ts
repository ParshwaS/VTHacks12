
class BlogService {
    public async getBlogs(accessToken: string) {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI!+"/api/bl/bg", {
            headers: {
                "Authorization": "bearer "+accessToken,
            }
        }).then((res) => res.json()).then((data)=>{
            return data;
        })
    }
}

export default new BlogService();