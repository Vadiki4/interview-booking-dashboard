import React, { Component } from 'react';
import Header from './Common/Header';
import Stats from './Common/EmployeeStats';
import Api from '../utils/Api';
import DashboardContext from '../DashboardContext';
import './App.scss';

const initialOverviewData = {
	availableRooms: 0,
	checkedIn: 0,
	reservedRooms: 0,
	weekAvailabilityPercent: 0,
};

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { overviewData: { ...initialOverviewData }, employeeStats: [] };
	}

	async componentDidMount() {
		try {
			const getBookingSnapshot = Api().getBookingSnapshot();
			const getBookings = Api().getEmployeeStats();
			const dashboardData = await Promise.all([getBookingSnapshot, getBookings]);
			this.setState({ overviewData: dashboardData[0].data, employeeStats: dashboardData[1].data });
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		return (
			<DashboardContext.Provider value={this.state}>
				<div className="app">
					<div className="page-content container">
						<Header />
						<div className="container row">
							<div className="employeeStats col-sm-4">
								<h6>Employee stats</h6>
								<Stats />
							</div>
						</div>
					</div>
				</div>
			</DashboardContext.Provider>
		);
	}
}
