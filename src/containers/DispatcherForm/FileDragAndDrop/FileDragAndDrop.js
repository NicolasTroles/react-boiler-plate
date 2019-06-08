// Modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import styled from 'styled-components';
import { Field, getFormValues } from 'redux-form';

// Components
import { FormGroup, Label } from 'reactstrap';

// Types
import { SHOW_TOAST } from '../../../redux/toast/types';
import { SET_CSV_COLUMNS } from '../../../redux/dispatcher/types';

// Utils
import ParseCsv from '../../../utils/parseCsv'

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


const DropzoneStyled = styled('section')`
    background: #ddd;
    cursor: pointer;
    border: 2px dotted #333;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        outline: none;
        text-align: center;
        padding: 30% 0 30%;
        width: 100%;
        p {
            width: 100%;
            font-weight: bold;
        }
        i {
            font-size: 30px;
        }
    }
`

const FileInformation = styled('div')`
    margin-top: 20px;
`



class FileDragAndDrop extends Component {
    state = {
        file: [],
    }

    componentDidMount() {
    }

    newFile = file => {
        const { props: { dispatch } } = this;
        if (!this.isFileCsv(file)) {
            dispatch({
                type: SHOW_TOAST.REQUEST,
                newMessage: 'A extensão do arquivo deve ser CSV!',
                messageType: 'error',
            });
            return;
        }
        this.getAsText(file[0]);

        this.setState({
            file: file,
        });
    }

    getAsText = (fileToRead) => {
        let reader = new FileReader();
        reader.readAsText(fileToRead);
        reader.onload = this.loadHandler;
    }

    loadHandler = (event) => {
        const { props: { dispatch } } = this;
        let csv = event.target.result;
        let csvParsed = ParseCsv(csv);

        dispatch({
            type: SET_CSV_COLUMNS.SUCCESS,
            csvColumns: Object.keys(csvParsed[0]),
        });
    }

    isFileCsv = file => {
        if (file[0].type.split('/')[1] === 'csv') {
            return true;
        }
        return false;
    }

    render() {
        const { state, props: { formValues, dispatcherReducer: { csvFileColumns } } } = this;

        let channel = false;
        if (formValues && formValues.channel && formValues.channel !== 'Selecione...') {
            channel = formValues.channel;
        }

        return (
            <Fragment>
                <Dropzone onDrop={acceptedFiles => this.newFile(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <DropzoneStyled>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <i className="fa fa-plus"></i>
                                <p>Arraste qui seu arquivo CSV</p>
                            </div>
                        </DropzoneStyled>
                    )}
                </Dropzone>
                <FileInformation>
                    <FormGroup>
                        {state.file.length ?
                            <Fragment>
                                {channel ?
                                    <Label for="csvColumn">
                                        Arquivo: <strong>
                                            {state.file[0].path}
                                        </strong>.<br />
                                        Selecione o nome da coluna correspondente ao <strong>
                                            {((channel === 'sms' || channel === 'wpp_no') && 'telefone') ||
                                                (channel === 'email' && 'email')}</strong> do arquivo csv acima:
                                    </Label>
                                    :
                                    <Label for="csvColumn">Selecione uma coluna do campo <strong>Canal</strong> no formulário ao lado primeiro:</Label>
                                }
                                <FieldStyled type="select"
                                    component='select'
                                    name="csvColumn"
                                    disabled={!channel}
                                    id="csvColumn">
                                    <option>Selecione...</option>
                                    {csvFileColumns.map((column, index) =>
                                        <option key={index}>{column}</option>
                                    )}
                                </FieldStyled>
                            </Fragment>
                            :
                            null
                        }
                    </FormGroup>
                </FileInformation>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        dispatcherReducer: state.dispatcherReducer,
        formValues: getFormValues('dispatcherForm')(state),
    }
}

export default connect(mapStateToProps)(FileDragAndDrop);
