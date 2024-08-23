import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';

// Base URL (Ensure this matches your backend configuration)
const baseURL = 'https://5000-alyyashar-scal2024-zyixncvobqi.ws-eu115.gitpod.io';

export function signUp(name, email, password) {
    const postData = {
        name,
        email,
        password,
    };
    console.log("Sending sign-up request with data:", postData);
    return axios.post(`${baseURL}/api/register`, postData)
        .then(response => {
            console.log("Sign-up successful:", response.data);
            return response;
        })
        .catch(error => {
            console.error("Sign-up Error:", error.response || error.message);
            throw error;
        });
}

export function login(email, password) {
    const postData = {
        email,
        password,
    };
    console.log("Sending login request with data:", postData);
    return axios.post(`${baseURL}/api/login`, postData)
        .then(response => {
            console.log("Login successful:", response.data);
            return response;
        })
        .catch(error => {
            console.error("Login Error:", error.response || error.message);
            throw error;
        });
}

export function formatError(errorResponse) {
    console.log("Formatting error response:", errorResponse);
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            swal("Oops", "Email not found", "error", { button: "Try Again!" });
            break;
        case 'INVALID_PASSWORD':
            swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
            break;
        case 'USER_DISABLED':
            return 'User Disabled';
        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    console.log("Saving token in local storage:", tokenDetails);
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    console.log("Running logout timer for", timer, "ms");
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        console.log("No token found, dispatching logout.");
        dispatch(logout(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        console.log("Token expired, dispatching logout.");
        dispatch(logout(history));
        return;
    }
    console.log("Token valid, dispatching login confirmation.");
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);
}
