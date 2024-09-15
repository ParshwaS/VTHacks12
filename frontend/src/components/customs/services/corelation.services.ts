
class CorelationServices {
    public async getcorelation() {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI!+"/api/" + "rentals/quarterly-change?zipCode=10001", {
            
        }).then((res) => res.json()).then((data)=>{
            console.log(data.data)
            return data.data;
        })
    }
}

export default new CorelationServices();
