
class QolService {
    public async getQol(zipcode: string | null) {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI! + "/api/qol/crime?zip="+zipcode, {
         
        }).then((res) => res.json()).then((data)=>{
            return data;
        })
    }
}

export default new QolService();