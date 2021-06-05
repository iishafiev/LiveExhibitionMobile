import axios from 'axios'

const EXHIBITIONS_REST_API_URL = 'http://localhost:8080/api/getAllExhibitions';

class ExhibitionService {

  getExhibitions(){
    return axios.get(EXHIBITIONS_REST_API_URL);
  }
}

export default new ExhibitionService();
