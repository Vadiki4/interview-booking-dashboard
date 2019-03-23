import React from 'react';
import DashboardContext from '../../DashboardContext';
import '../../styles/header.scss';

const Header = props => (
	<DashboardContext.Consumer>
		{({ overviewData }) => (
			<div className="row header">
				<div className="col-sm stat-item">
					<span>{overviewData.availableRooms}</span>
					<p>Rooms available</p>
				</div>
				<div className="col-sm stat-item">
					<span>{overviewData.reservedRooms}</span>
					<p>Reserved Rooms</p>
				</div>
				<div className="col-sm stat-item">
					<span>{overviewData.checkedIn}</span>
					<p>Checked in</p>
				</div>
			</div>
		)}
	</DashboardContext.Consumer>
);

export default Header;
