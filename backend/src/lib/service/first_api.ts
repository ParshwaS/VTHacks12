const url = 'https://api.rentcast.io/v1/properties?zipCode=28262&limit=500';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'X-Api-Key': 'b128c8e896624640ae940981e5d4e361'}
};


class firstApi {
    constructor() {
        // this.getFirstApi = this.getFirstApi.bind(this);
    }
  public async getFirstApi() {
    return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));
  }
}

export default new firstApi();