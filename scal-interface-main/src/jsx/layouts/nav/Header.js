import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { isAuth, setTheme, isTheme, isNotification } from "../../helpers/Auth";
import { Dropdown } from "react-bootstrap";
import LogoutPage from './Logout';
import { ThemeContext } from "../../../context/ThemeContext";
import PerfectScrollbar from "react-perfect-scrollbar";

const Header = ({ onNote }) => {
	var path = window.location.pathname.split("/");
	var name = path[path.length - 1].split("-");
	var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
	var finalName = filterName.includes("app")
		? filterName.filter((f) => f !== "app")
		: filterName.includes("ui")
			? filterName.filter((f) => f !== "ui")
			: filterName.includes("uc")
				? filterName.filter((f) => f !== "uc")
				: filterName.includes("basic")
					? filterName.filter((f) => f !== "basic")
					: filterName.includes("jquery")
						? filterName.filter((f) => f !== "jquery")
						: filterName.includes("table")
							? filterName.filter((f) => f !== "table")
							: filterName.includes("page")
								? filterName.filter((f) => f !== "page")
								: filterName.includes("email")
									? filterName.filter((f) => f !== "email")
									: filterName.includes("ecom")
										? filterName.filter((f) => f !== "ecom")
										: filterName.includes("chart")
											? filterName.filter((f) => f !== "chart")
											: filterName.includes("editor")
												? filterName.filter((f) => f !== "editor")
												: filterName;

	const [imageData, setImageData] = useState('');
	const [nameData, setNameData] = useState('');
	const [roleData, setRoleData] = useState('');
	const id = isAuth()?._id;
	const theme = isTheme()?.value
	const notification = isNotification()

	const {
		changeBackground,
	} = useContext(ThemeContext);

	const fixChange = () => {
		if (theme === "dark") {
			changeBackground({ value: "light", label: "Light" });
			setTheme('theme', { value: "light", label: "Light" });
		} else if (theme === "light") {
			changeBackground({ value: "dark", label: "Dark" });
			setTheme('theme', { value: "dark", label: "Dark" });
		} else {
			console.log('Error Occurred')
		}

	}


	useEffect(() => {
		if (id) {
			axios
				.get(`https://5000-imamabubakar-scalserver-k2k88lajzmw.ws-eu75.gitpod.io/api/user/${id}`)
				.then((res) => {
					setImageData(res.data.profilePicture);
					setNameData(res.data.name);
					setRoleData(res.data.role);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<div className="header">
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left">
							<div
								className="dashboard_bar"
								style={{ textTransform: "capitalize" }}
							>
								{finalName.join(" ").length === 0
									? "Dashboard"
									: finalName.join(" ") === "dashboard dark"
										? "Dashboard"
										: finalName.join(" ")}
							</div>

						</div>
						<ul className="navbar-nav header-right main-notification">
							{/* NOTIFICATION DROPDOWN */}
							<Dropdown as="li" className="nav-item notification_dropdown ">
								<Dropdown.Toggle variant="" as="a" className="nav-link  ai-icon i-false c-pointer">
									<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M8.83333 3.91738V1.50004C8.83333 0.856041 9.356 0.333374 10 0.333374C10.6428 0.333374 11.1667 0.856041 11.1667 1.50004V3.91738C12.9003 4.16704 14.5208 4.97204 15.7738 6.22504C17.3057 7.75687 18.1667 9.8347 18.1667 12V16.3914L19.1105 18.279C19.562 19.1832 19.5142 20.2565 18.9822 21.1164C18.4513 21.9762 17.5122 22.5 16.5018 22.5H11.1667C11.1667 23.144 10.6428 23.6667 10 23.6667C9.356 23.6667 8.83333 23.144 8.83333 22.5H3.49817C2.48667 22.5 1.54752 21.9762 1.01669 21.1164C0.484686 20.2565 0.436843 19.1832 0.889509 18.279L1.83333 16.3914V12C1.83333 9.8347 2.69319 7.75687 4.22502 6.22504C5.47919 4.97204 7.0985 4.16704 8.83333 3.91738ZM10 6.1667C8.45183 6.1667 6.96902 6.78154 5.87469 7.87587C4.78035 8.96904 4.16666 10.453 4.16666 12V16.6667C4.16666 16.8475 4.12351 17.026 4.04301 17.1882C4.04301 17.1882 3.52384 18.2265 2.9755 19.322C2.88567 19.5029 2.89501 19.7187 3.00117 19.8902C3.10734 20.0617 3.29517 20.1667 3.49817 20.1667H16.5018C16.7037 20.1667 16.8915 20.0617 16.9977 19.8902C17.1038 19.7187 17.1132 19.5029 17.0234 19.322C16.475 18.2265 15.9558 17.1882 15.9558 17.1882C15.8753 17.026 15.8333 16.8475 15.8333 16.6667V12C15.8333 10.453 15.2185 8.96904 14.1242 7.87587C13.0298 6.78154 11.547 6.1667 10 6.1667Z" fill="#a72b75" />
									</svg>
									{notification.length !== 0 ?
										<div className="pulse-css"></div>
										:
										<></>
									}
								</Dropdown.Toggle>
								<Dropdown.Menu align="right" className="mt-4 dropdown-menu dropdown-menu-end">
									<PerfectScrollbar className="widget-media dz-scroll p-3 height250">
										<ul className="timeline">
											{notification.length !== 0 ?
												<>
													{notification.map((result) => {
														return (
															<li>
																<div className="timeline-panel">
																	<div className="media-body">
																		<h6 className="mb-1">Analysis "{result.name}" has been completed</h6>
																		<small className="d-block">{result.time}</small>
																	</div>
																</div>
															</li>
														)
													})}
												</>
												:
												<li>
													<div className="timeline-panel">
														<div className="media-body">
															<h6 className="mb-1">No notifications at the moment</h6>
														</div>
													</div>
												</li>
											}
										</ul>
										<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
											<div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
										</div>
										<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
											<div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} />
										</div>
									</PerfectScrollbar>
								</Dropdown.Menu>
							</Dropdown>
							{/* HISTORY DROPDOWN */}
							<Dropdown as="li" className="nav-item dropdown notification_dropdown ">
								<Dropdown.Toggle className="nav-link i-false c-pointer ai-icon" onClick={fixChange} variant="" as="a">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									><path
											d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
											fill="#a72b75"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
											fill="#a72b75"
										/>
									</svg>
								</Dropdown.Toggle>
							</Dropdown>
							{/*USER DROPDOWN*/}
							<Dropdown as="li" className="nav-item dropdown header-profile">
								<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
									<img src={imageData} width={20} alt="User Image" />
									<div className="header-info ms-3">
										<span>{nameData}</span>
										<small>{roleData}</small>
									</div>
								</Dropdown.Toggle>

								<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
									<Link to="/app-profile" className="dropdown-item ai-icon">
										<svg
											id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
											width={18} height={18} viewBox="0 0 24 24" fill="none"
											stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
										>
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
											<circle cx={12} cy={7} r={4} />
										</svg>
										<span className="ms-2">Profile </span>
									</Link>
									<LogoutPage />
								</Dropdown.Menu>
							</Dropdown>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;
