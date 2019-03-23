import axios from 'axios';
import env from '../env';

export default function App() {
	const baseUrl = env.API_URL;

	return {
		getBookingSnapshot() {
			const url = baseUrl + '/booking-snapshot';
			return axios.get(url);
		},

		getEmployeeStats() {
			const url = baseUrl + '/bookings';
			return axios.get(url);
		},
	};
}
