import { lazy, Suspense, useEffect, useContext } from 'react';

// Components
import Index from "./jsx";
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// Actions
import { isAuth } from './jsx/helpers/Auth'
// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import './vendor/datatables/css/dataTables.min.css';
import "./css/style.css";
import Error404 from "./jsx/pages/Error404";
import { isTheme } from "./jsx/helpers/Auth";
import { ThemeContext } from "./context/ThemeContext";

// Lazy-loaded components
const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./jsx/pages/ResetPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
    });
});
const ActivateAccount = lazy(() => import('./jsx/pages/ActivateAccount')); // Import the new component

function App(props) {

    const authCheck = sessionStorage.getItem('user');
    let theme = isTheme()

    const {
        changeBackground, background
      } = useContext(ThemeContext);
    
    useEffect(() => {
        if(theme === null){
            theme = { value: "light", label: "Light" };
        }
        changeBackground(theme);
        console.log(background)
    }, []);

    let routes = (
        <Switch>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <Route exact path="/dashboard">
                <Redirect to="/login" />
            </Route>
            <Route exact path="/about">
                <Redirect to="/login" />
            </Route>
            <Route exact path="/tools">
                <Redirect to="/login" />
            </Route>
            <Route exact path="/solidity-scan">
                <Redirect to="/login" />
            </Route>
            <Route exact path="/bytecode-scan">
                <Redirect to="/login" />
            </Route>
            <Route exact path="/app-profile">
                <Redirect to="/login" />
            </Route>
            
            <Route path='/login' component={Login} />
            <Route path='/users/new/register' component={SignUp} />
            <Route path='/forgot-password' component={ForgotPassword} />    
            <Route path='/users/password/reset/:token' component={ResetPassword} />
            <Route path='/users/activate/:token' component={ActivateAccount} /> {/* Add this route */}

            <Route path='*' component={Error404} />
        </Switch>
    );

    if (authCheck) {
        return (
            <>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    <Index />
                </Suspense>
            </>
        );
    } else {
        return (
            <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    {routes}
                </Suspense>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuth: isAuth(state),
    };
};

export default withRouter(connect(mapStateToProps)(App));
