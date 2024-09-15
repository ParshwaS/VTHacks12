
class PricesqTimeService {
    public async getPts() {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI!+"/api/" + "rentals/average-price-per-sqft?zipCode=10005", {
            
        }).then((res) => res.json()).then((data)=>{
            console.log(data)
            return data;
        })
    }
}

export default new PricesqTimeService();