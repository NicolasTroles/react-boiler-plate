// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFormValues, getFormAsyncErrors, reduxForm } from 'redux-form';

// Components
import {
   Row,
   Col,
   Form,
   Card,
   CardBody,
   CardTitle,
} from 'reactstrap';
import DispatcherFormTabs from './DispatcherFormTabs/DispatcherFormTabs';
import FileDragAndDrop from './FileDragAndDrop/FileDragAndDrop';
import validate from '../../utils/formValidation';

/* Types */
// import { FETCH_COMPANIES } from '../../redux/dispatcher/types'
import { SHOW_TOAST } from '../../redux/toast/types';

const Container = styled('div')`
   margin-bottom: 30px; 
`

const Title = styled('h2')`
    color: #333;
`;

class DispatcherForm extends Component {
   state = {
      newFormValues: [],
   }

   componentDidMount() {
      // const { props: { dispatch } } = this;
      // dispatch({
      //    type: FETCH_COMPANIES.REQUEST,
      // });
   }

   newFormValues = newFormValues => {
      this.setState({
         newFormValues: [...newFormValues],
      });
   }

   validateFields = () => {
      const { state, props: { dispatch, formValues } } = this;

      let newFormValues = [];
      let toastMessage;

      if (!formValues.batchName || !formValues.message || !formValues.company || !formValues.channel) {
         toastMessage = 'Preencha todos os campos da aba Principal!'
      }

      if (formValues.batchSize < 1 || formValues.cooldownTime < 1) {
         toastMessage = 'Os campos Tamanho do lote e Tempo de espera não podem ser menor que 1.'
      }

      if (!formValues.csvColumn) {
         toastMessage = 'Por favor insira um arquivo CSV e escolha uma coluna!'
      }

      if (toastMessage) {
         dispatch({
            type: SHOW_TOAST.REQUEST,
            newMessage: toastMessage,
            messageType: 'error',
         });
         return;
      }


      if (state.newFormValues) {
         state.newFormValues.forEach(field => {
            newFormValues.push({
               newFieldKey: formValues['newFieldKey' + field.newFieldKey.substring(11)],
               newFieldValue: formValues['newFieldValue' + field.newFieldKey.substring(11)],
            })
         });
      }

   }

   render() {
      return (
         <Form>
            <Container>
               <Title>
                  Formulário
               </Title>
               <Row>
                  <Col xs='12' md='4'>
                     <Card>
                        <CardBody>
                           <CardTitle color='secondary'>Arquivo CSV</CardTitle>
                           <FileDragAndDrop />
                        </CardBody>
                     </Card>
                  </Col>
                  <Col xs='12' md='8'>
                     <Card>
                        <CardBody>
                           <CardTitle color='secondary'>Preencha os campos abaixo</CardTitle>
                           <DispatcherFormTabs validateFields={this.validateFields} newFormValues={this.newFormValues} />
                        </CardBody>
                     </Card>
                  </Col>
               </Row>
            </Container>
         </Form>
      );
   }
}


DispatcherForm = reduxForm({
   form: 'dispatcherForm',
   validate,
})(DispatcherForm)


function mapStateToProps(state) {
   return {
      formValues: getFormValues('dispatcherForm')(state),
      asyncErrors: getFormAsyncErrors('dispatcherForm')(state),
      dispatcherReducer: state.dispatcherReducer,
   }
}

export default connect(mapStateToProps)(DispatcherForm);
