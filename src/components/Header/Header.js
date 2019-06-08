// Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Components
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

// Types
import { TOKEN_DECODED } from '../../redux/authentication/types';

// Styles
import './header.css';

class Header extends Component {
    state = {
        isOpen: false
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        const { props: { dispatch, history } } = this;
        dispatch({
            type: TOKEN_DECODED.RESET,
        })
        localStorage.removeItem('token');
        history.push('/login');
    }

    render() {
        return (
            <Navbar className='Header' color="light" light expand="md">
                <Link to="/">Dispatcher</Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/">Dispatcher</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Páginas
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.logout}>
                                    Logout
                                </DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps() { return {} }

export default withRouter(connect(mapStateToProps)(Header));