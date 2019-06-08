// Modules
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router'

// Components
import DispatcherForm from '../containers/DispatcherForm/DispatcherForm';
import Login from '../containers/Login/Login';
import ForgotPassword from '../containers/ForgotPassword/ForgotPassword';
import Header from '../components/Header/Header'

// Styles
import 'react-toastify/dist/ReactToastify.css';

class AppRouter extends Component {
    state = {
        authentication: false,
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token) {
            this.goToLogin();
            return;
        }

        const tokenDecoded = jwt_decode(token);
        if (tokenDecoded.name === 'John D') {
            this.setState({
                authentication: true,
            });
        } else {
            this.goToLogin();
        }
    }

    componentDidUpdate(prevProps) {
        const { props: { toastReducer, authenticationReducer: { tokenDecoded } } } = this;

        if (prevProps.toastReducer !== toastReducer) {
            toast(toastReducer.message, { type: toastReducer.type });
        }

        if (prevProps.authenticationReducer.tokenDecoded !== tokenDecoded) {
            debugger;
            let auth = false;
            if (tokenDecoded.name) {
                auth = true;
            }
            this.setState({
                authentication: auth,
            });
        }
    }

    goToLogin = () => {
        const { props: { history } } = this;
        history.push('/login');
    }


    render() {
        const { state } = this;

        return (
            <Fragment>

                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/forgotPassword' component={ForgotPassword} />

                    {state.authentication &&
                        <Fragment>
                            <Header />
                            <Container color='light'>
                                <Route path='/' exact component={DispatcherForm} />
                            </Container>
                        </Fragment>
                    }
                </Switch>
                <ToastContainer />
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        toastReducer: state.toastReducer,
        authenticationReducer: state.authenticationReducer,
    }
}

export default withRouter(connect(mapStateToProps)(AppRouter));
