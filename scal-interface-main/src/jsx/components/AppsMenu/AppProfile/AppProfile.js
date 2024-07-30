import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { isAuth, setLocalStorage } from "../../../helpers/Auth";
import ChangeProfilePicture from './ChangeProfilePicture';

const AppProfile = () => {
	const [activeToggle, setActiveToggle] = useState("aboutMe");
	const [newImage, setNewImage] = useState('');
	const [imageData, setImageData] = useState('');
	const [nameData, setNameData] = useState('');
	const [roleData, setRoleData] = useState('');
	const [emailData, setEmailData] = useState('');
	const [bioData, setBioData] = useState('');
	const id = isAuth()?._id;

	const [email, setEmail] = useState('');
	const [bio, setBio] = useState('');
	const [name, setName] = useState('');

	const changeProfilePictureHandler = (image) => {
		setNewImage(image);
	};

	const postData = {
		bio,
		email,
		name,
	}
	console.log(newImage)

	useEffect(() => {
		if (id) {
			axios
				.get(`https://5000-imamabubakar-scalserver-k2k88lajzmw.ws-eu75.gitpod.io/api/user/${id}`)
				.then((res) => {
					setImageData(res.data.profilePicture);
					setNameData(res.data.name);
					setRoleData(res.data.role);
					setEmailData(res.data.email);
					setBioData(res.data.bio);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (postData.email == '') {
			postData.email = isAuth()?.email;
		}
		if (postData.name == '') {
			postData.name = isAuth()?.name;
		}
		if (postData.bio == '') {
			postData.bio = isAuth()?.bio;
		}
		if (newImage === ''){
			postData.profilePicture = imageData;
		} else {
			postData.profilePicture = newImage
		}
		postData._id = isAuth()?._id;
		
		axios
			.put(`https://5000-imamabubakar-scalserver-k2k88lajzmw.ws-eu75.gitpod.io/api/user/update`, postData)
			.then((res) => {
				setLocalStorage('user', res.data);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};
	return (
		<Fragment>
			<div className="row">
				<div className="col-lg-12">
					<div className="profile card card-body px-3 pt-3 pb-0">
						<div className="profile-head">
							<div className="photo-content ">
								<div className="cover-photo rounded"></div>
							</div>
							<div className="profile-info">
								<div className="profile-photo">
									<img
										src={imageData}
										className="img-fluid rounded-circle"
										alt="profile"
									/>
								</div>
								<div className="profile-details">
									<div className="profile-name px-3 pt-2">
										<h4 className="text-primary mb-0">{nameData}</h4>
										<p>{roleData}</p>
									</div>
									<div className="profile-email px-2 pt-2">
										<h4 className="text-muted mb-0">{emailData}</h4>
										<p>Email</p>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body">
							<div className="profile-tab">
								<div className="custom-tab-1">
									<ul className="nav nav-tabs">
										<li className="nav-item" onClick={() => setActiveToggle("aboutMe")}>
											<Link to="#about-me" data-toggle="tab" className={`nav-link ${activeToggle === "aboutMe" ? "active show" : ""}`}>About Me</Link>
										</li>
										<li className="nav-item">
											<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${activeToggle === "setting" ? "active show" : ""}`}>Setting</Link>
										</li>
									</ul>
									<div className="tab-content">
										{/*PROFILE*/}
										<div id="about-me" className={`tab-pane fade ${activeToggle === "aboutMe" ? "active show" : ""}`}>
											<div className="profile-about-me">
												<div className="pt-4 border-bottom-1 pb-3">
													<h4 className="text-primary">About Me</h4>
													<p>
														{bioData}
													</p>
												</div>
											</div>

											<div className="profile-personal-info">
												<div className="row mb-2">
													<div className="col-3">
														<h5 className="f-w-500"> Name<span className="pull-right">:</span></h5>
													</div>
													<div className="col-9">
														<span>{nameData}</span>
													</div>
												</div>
												<div className="row mb-2">
													<div className="col-3">
														<h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
													</div>
													<div className="col-9">
														<span>{emailData}</span>
													</div>
												</div>
												<div className="row mb-2">
													<div className="col-3">
														<h5 className="f-w-500"> Role<span className="pull-right">:</span></h5>
													</div>
													<div className="col-9">
														<span>{roleData}</span>
													</div>
												</div>

											</div>
										</div>
										{/* SETTINGS */}
										<div id="profile-settings" className={`tab-pane fade ${activeToggle === "setting" ? "active show" : ""}`}>
											<div className="pt-3">
												<div className="settings-form">
													<h4 className="text-primary">Account Setting</h4>
													<form onSubmit={(e) => handleSubmit(e)}>
														<div className="row">
															<div className="form-group mb-3 col-md-12">
															<label className="form-label">Change Profile Image {`(<100Kb)`}</label>
																<ChangeProfilePicture
																	sendDataToParent={changeProfilePictureHandler}
																/>
															</div>
															<div className="form-group mb-3 col-md-12">
																<label className="form-label">Change Name</label>
																<input type="text" onChange={(e) => setName(e.target.value)} className="form-control" />
															</div>
															<div className="form-group mb-3 col-md-12">
																<label className="form-label">Update Bio</label>
																<input type="text" onChange={(e) => setBio(e.target.value)} placeholder="I am a ....." className="form-control" />
															</div>
														</div>

														<button className="btn btn-primary" type="submit">Save Changes</button>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AppProfile;
