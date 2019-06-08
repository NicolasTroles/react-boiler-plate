// Modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styled from 'styled-components';

/* Components */
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import MainForm from './MainForm/MainForm';
import AdvancedForm from './AdvancedForm/AdvancedForm';

const NavStyled = styled(Nav)`
    margin-bottom: 20px !important;
`

const ButtonStyled = styled(Button)`
    float: right;
`


class DispatcherFormTabs extends Component {
    state = {
        activeTab: '1',
        newFormValues: [],
    };

    toggle = tab => {
        const { state } = this;
        if (state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const { state, props: { newFormValues, validateFields } } = this;

        return (
            <Fragment>
                <NavStyled tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Principal
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Avançado
                        </NavLink>
                    </NavItem>
                </NavStyled>

                <TabContent activeTab={state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col>
                                <MainForm />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                        <Row>
                            <Col>
                                <AdvancedForm newFormValues={newFormValues} />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

                <ButtonStyled onClick={validateFields} color='primary'>Enviar</ButtonStyled>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        dispatcherReducer: state.dispatcherReducer,
    }
}

export default connect(mapStateToProps)(DispatcherFormTabs);
