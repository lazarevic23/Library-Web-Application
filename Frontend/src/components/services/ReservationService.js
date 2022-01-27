import axios from 'axios'

const RESERVATION_URL = 'http://localhost:8083/reservation';

class ReservationService {

    getReservations() {
        return axios.get(RESERVATION_URL);
    }

    createReservation(reservation){
        return axios.post(RESERVATION_URL, reservation);
    }

    getReservationById(reservationId){
        return axios.get(RESERVATION_URL + '/' + reservationId);
    }

    updateReservation(reservation){
        return axios.put(RESERVATION_URL, reservation);
    }

    deleteReservation(reservationId){
        return axios.delete(RESERVATION_URL + '/' + reservationId);
    }

    getReservationsByUser(userId){
        return axios.get(RESERVATION_URL + '/user/' + userId);
    }

}

export default new ReservationService();