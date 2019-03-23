import React from 'react';
import moment from 'moment';
import DashboardContext from '../../DashboardContext';
import Loading from '../Common/Loading';
import '../../styles/stats.scss';

function createTopEmployeeList(employeeStats) {
	try {
		const employees = employeeStats.reduce((result, { employee, ...roomDetails }) => {
			if (!employee) return result;
			const { id } = employee;
			const checkIn = moment(roomDetails.checkInDate, 'DD-MM-YYYY');
			const checkOut = moment(roomDetails.checkOutDate, 'DD-MM-YYYY');
			const roomHours = checkOut.diff(checkIn, 'hours');
			result[id] = {
				...employee,
				hours: result[id] && result[id].hours ? result[id].hours + roomHours : roomHours,
			};
			return result;
		}, {});

		return Object.values(employees)
			.sort((a, b) => b.hours - a.hours)
			.slice(0, 3);
	} catch (err) {
		console.error(err);
	}
}

const EmployeeStats = props => (
	<DashboardContext.Consumer>
		{({ employeeStats }) => {
			const topEmployee = createTopEmployeeList(employeeStats);
			if (!topEmployee.length) return <Loading />;
			return topEmployee.map(({ id, firstName, lastName, profileImageUrl, hours }) => (
				<div key={id} className="employee-stats">
					<div className="stat-item">
						<img src={profileImageUrl} alt="profile-preview" />
						<p>{firstName + lastName}</p>
						<span>{hours} hours</span>
					</div>
				</div>
			));
		}}
	</DashboardContext.Consumer>
);

export default EmployeeStats;
