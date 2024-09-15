
class LineChart1Service {
    public async getLinePts() {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI!+"/api/" + "rentals/average-rent-per-month?zipCode=10005", {
            
        }).then((res) => res.json()).then((data)=>{
            // console.log(data.data)
            return data.data;
        })
    }
}

export default new LineChart1Service();