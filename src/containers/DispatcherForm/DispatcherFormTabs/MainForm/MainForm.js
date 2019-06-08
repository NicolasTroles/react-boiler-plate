// Modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, getFormValues } from 'redux-form'
import styled from 'styled-components';

/* Components */
import { FormGroup, Label } from 'reactstrap';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/Select/Select';
import Textarea from '../../../../components/Textarea/Textarea';

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

class MainForm extends Component {
   state = {
      selectChannels: [],
      warningMessage: 'Antes de preencher a mensagem, insira um arquivo CSV.',
      errorMessage: '',
   };

   componentDidUpdate(prevProps) {
      const { props: { dispatcherReducer: { csvFileColumns} } } = this;
      if (prevProps.dispatcherReducer.csvFileColumns !== csvFileColumns) {
         this.setState({
            errorMessage: '',
            warningMessage: '',
         });
      }
   }

   choosenCompany = incomingCompany => {
      if (incomingCompany !== 'Selecione...') {
         const { props: { dispatcherReducer: { companies } } } = this;

         let company = companies.data.find(company => company.name === incomingCompany);

         this.setState({
            selectChannels: Object.keys(company.channels),
         });
      }
   }

   choosenChannel = channel => {
      console.log(channel);
   }

   onKeyUpFunction = e => {
      const { props: { dispatcherReducer: { csvFileColumns } } } = this;


      let textareaTagsSplitted = e.split(/(<([^>]+)>)/ig);
      let somethingWrong = false;

      textareaTagsSplitted.forEach((item, index, array) => {
         if (item.startsWith("<") && item.endsWith(">")) {
            if (!csvFileColumns.find(column => column === array[index + 1])) {
               somethingWrong = true;
            }
         }
      })

      let messageTextarea = document.getElementById('message');

      if (somethingWrong) {
         messageTextarea.style.background = 'red';
         messageTextarea.style.color = 'white';
         this.setState({
            errorMessage: 'Alguma das tags preenchidas está incorreta, por favor verifique.'
         });
      } else {
         messageTextarea.style.background = 'transparent';
         messageTextarea.style.color = '#495057';
         this.setState({
            errorMessage: ''
         });
      }
      // messageTextarea.value = e;

      // console.log(e);
   }

   render() {
      const { state, props: { formValues, dispatcherReducer: { csvFileColumns, companies } } } = this;

      let csvColumn = false;
      if (formValues && formValues.csvColumn && formValues.csvColumn !== 'Selecione...') {
          csvColumn = formValues.csvColumn;
      }

      return (
         <Fragment>
            <FormGroup>
               <Label for="batchName">Nome do lote: </Label>
               <FieldStyled
                  name="batchName"
                  component={Input}
                  id="batchName"
                  type="text"
                  placeholder="Digite o nome do lote..."
               />
            </FormGroup>

            <FormGroup>
               <Label for="message">Mensagem: </Label>
               <FieldStyled type="textarea"
                  component={Textarea}
                  name="message"
                  id="message"
                  disabled={!csvFileColumns.length}
                  errorMessage={state.errorMessage}
                  warningMessage={state.warningMessage}
                  onKeyUpFunction={this.onKeyUpFunction}
                  placeholder="Digite uma mensagem..." />
            </FormGroup>

            <FormGroup>
               <Label for="company">Empresa:</Label>
               <FieldStyled
                  component={Select}
                  name="company"
                  id="company"
                  options={companies.data}
                  defaultValue='Selecione...'
                  onChangeFunction={this.choosenCompany}
                  fieldToShow='name'>
               </FieldStyled>
            </FormGroup>

            <FormGroup>
               <Label for="channel">Canal:</Label>
               <FieldStyled
                  component={Select}
                  name="channel"
                  id="channel"
                  options={state.selectChannels}
                  defaultValue='Selecione...'
                  onChangeFunction={this.choosenChannel}>
               </FieldStyled>
            </FormGroup>
         </Fragment>
      );
   }
}

function mapStateToProps(state) {
   return {
      dispatcherReducer: state.dispatcherReducer,
      formValues: getFormValues('dispatcherForm')(state),
   }
}

export default connect(mapStateToProps)(MainForm);
