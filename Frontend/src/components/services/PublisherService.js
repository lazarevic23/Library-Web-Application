import axios from 'axios'

const PUBLISHER_URL = 'http://localhost:8083/publisher';

class PublisherService {

    getPublishers() {
        return axios.get(PUBLISHER_URL);
    }

    getPublisherById(publisherId){
        return axios.get(PUBLISHER_URL + '/' + publisherId);
    }

    createPublisher(publisher){
        return axios.post(PUBLISHER_URL, publisher);
    }

    updatePublisher(publisher){
        return axios.put(PUBLISHER_URL, publisher);
    }

    deletePublisher(publisherId){
        return axios.delete(PUBLISHER_URL + '/' + publisherId);
    }
}

export default new PublisherService();