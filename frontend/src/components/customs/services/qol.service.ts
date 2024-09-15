
class QolService {
    public async getQol() {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI! + "/api/qol/crime", {
         
        }).then((res) => res.json()).then((data)=>{
            return data;
        })
    }
}

export default new QolService();