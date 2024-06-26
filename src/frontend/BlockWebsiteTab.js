import {
	getAllBlockedTabs,
	addBlockedTab,
	deleteBlockedTab,
	resetBlockedTabs,
} from "../backend/BlockWebsiteTab.js";
import React, { Component } from "react";
import "./BlockWebsiteTab.css";

class BlockWebsiteTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blockedTabs: [],
			newTabUrl: "",
		};
	}

	componentDidMount() {
		this.setState({ blockedTabs: getAllBlockedTabs() });
	}

	handleInputChange = (event) => {
		this.setState({ newTabUrl: event.target.value });
	};

	addBlockedTab = (event) => {
		event.preventDefault();
		const { newTabUrl } = this.state;
		if (newTabUrl) {
			addBlockedTab(newTabUrl);
			this.setState({ blockedTabs: getAllBlockedTabs(), newTabUrl: "" });
		}
	};

	removeBlockedTab = (index) => {
		deleteBlockedTab(index);
		this.setState({ blockedTabs: getAllBlockedTabs() });
	};

	resetBlockedTabs = () => {
		resetBlockedTabs();
		this.setState({ blockedTabs: [] });
	};

	render() {
		const { blockedTabs, newTabUrl } = this.state;
		return (
			<div className="BlockWebsiteTab">
				<form onSubmit={this.addBlockedTab}>
					<input
						type="text"
						value={newTabUrl}
						onChange={this.handleInputChange}
						placeholder="Enter the website you want to block..."
					/>
					<button type="submit">Add</button>
				</form>
				<h3>Blocked Websites</h3>
				<ul>
					{blockedTabs.map((tab, index) => (
						<div key={index}>
							<button
								className="removeButton"
								onClick={() => this.removeBlockedTab(index)}
							>
								-
							</button>
							<span>{tab}</span>
						</div>
					))}
				</ul>
				<button className="reset-btn" onClick={this.resetBlockedTabs}>
					Reset All
				</button>
			</div>
		);
	}
}

export default BlockWebsiteTab;
