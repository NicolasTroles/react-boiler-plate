// Modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, Field } from 'redux-form';
import styled from 'styled-components';
import { createTextMask } from 'redux-form-input-masks';

/* Components */
import { FormGroup, Button, Label, Row, Col } from 'reactstrap';
import Input from '../../../../components/Input/Input';

const FieldStyled = styled(Field)`
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`

const ColStyled = styled(Col)`
    display: flex;
    align-items: center;
    button { 
        margin-top: 18px;
    }
`

const cnpjMask = createTextMask({
    pattern: '99.999.999/9999-99',
});

class AdvancedForm extends Component {
    state = {
        moreFields: [],
    };

    componentDidMount() {
        const { props: { dispatch } } = this;
        dispatch(change('dispatcherForm', 'batchSize', 6));
        dispatch(change('dispatcherForm', 'cooldownTime', 1));
    }

    addNewField = () => {
        const { state } = this;
        let newMoreFields = [...state.moreFields];
        newMoreFields.push({
            newFieldKey: 'newFieldKey' + state.moreFields.length,
            newFieldValue: 'newFieldValue' + state.moreFields.length,
        });
        this.setNewFormValues(newMoreFields);
    }

    removeNewField = index => {
        const { state } = this;
        const newMoreFields = state.moreFields.filter(field => !field.newFieldKey.includes(index));
        debugger;
        this.setNewFormValues(newMoreFields);
    }

    setNewFormValues = formValues => {
        const { props: { newFormValues } } = this;
        this.setState({
            moreFields: [...formValues],
        });
        newFormValues(formValues);
    }

    render() {
        const { state } = this;
        return (
            <Fragment>
                <h4>Context</h4>
                <FormGroup>
                    <Label for="contextCompany">Empresa: </Label>
                    <FieldStyled
                        component='input'
                        type="text"
                        name="contextCompany"
                        id="contextCompany"
                        {...cnpjMask}
                        placeholder="Digite o nome da empresa..." />
                </FormGroup>
                <FormGroup>
                    <Label for="contextPortfolio">Portfólio: </Label>
                    <FieldStyled
                        component='input'
                        type="text"
                        name="contextPortfolio"
                        id="contextPortfolio"
                        placeholder="Digite o portfólio..." />
                </FormGroup>
                <FormGroup>
                    <Label for="contextDialog">Diálogo: </Label>
                    <FieldStyled
                        component='input'
                        type="text"
                        name="contextDialog"
                        id="contextDialog"
                        placeholder="Digite o diálogo..." />
                </FormGroup>

                <FormGroup>
                    <Label for="batchSize">Tamanho do lote: </Label>
                    <FieldStyled
                        component={Input}
                        type="number"
                        name="batchSize"
                        id="batchSize"
                        min='1'
                        placeholder="Digite o tamanho do lote..." />
                </FormGroup>

                <FormGroup>
                    <Label for="cooldownTime">Tempo de espera: </Label>
                    <FieldStyled
                        component={Input}
                        type="number"
                        name="cooldownTime"
                        min='1'
                        id="cooldownTime"
                        placeholder="Digite o tempo de espera..." />
                </FormGroup>

                <h4>Outros campos</h4>
                {state.moreFields.map((field, index) =>
                    <Row key={index}>
                        <Col xs='4' md="5">
                            <FormGroup>
                                <Label for={field.newFieldKey}>Nome do campo: </Label>
                                <FieldStyled
                                    component='input'
                                    type="text"
                                    name={field.newFieldKey}
                                    id={field.newFieldKey}
                                    placeholder="Digite o nome do campo..." />
                            </FormGroup>
                        </Col>
                        <Col xs='4' md="5">
                            <FormGroup>
                                <Label for={field.newFieldValue}>Valor do campo: </Label>
                                <FieldStyled
                                    component='input'
                                    type="text"
                                    name={field.newFieldValue}
                                    id={field.newFieldValue}
                                    placeholder="Digite o valor do campo..." />
                            </FormGroup>
                        </Col>
                        <ColStyled xs='4' md="2">
                            <Button color='danger' onClick={() => this.removeNewField(index)}>Remover</Button>
                        </ColStyled>
                    </Row>
                )}

                <Button onClick={this.addNewField}>Adicionar campo extra</Button>



            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        dispatcherReducer: state.dispatcherReducer,
    }
}

export default connect(mapStateToProps)(AdvancedForm);
