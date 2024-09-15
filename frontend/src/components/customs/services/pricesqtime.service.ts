
class PricesqTimeService {
    public async getPts() {
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URI!+"/api/" + "rentals/average-price-per-sqft?city=Charlotte", {
            
        }).then((res) => res.json()).then((data)=>{
            return data;
        })
    }
}

export default new PricesqTimeService();