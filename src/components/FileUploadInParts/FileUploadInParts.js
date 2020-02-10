// Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { translate } from 'react-translate';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal as ModalDefault } from 'bornlogic-react-components';

// Components
import Input from 'components/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import { DELETE_MEDIA, GET_FOLDERS } from 'redux/medias/types';
import { SHOW_TOAST } from 'redux/toast/types';

// Utils
// import { BASE_URL } from 'utils/constants';
// import { getBusinessID, getBusinessToken } from 'utils/auth'

// Helpers
import { permitedVideos, permitedImages } from 'utils/helpers';

// Services
import { MediasService } from 'services';

const FileWrapper = styled('div')`
    ${({ theme }) => `
        padding: ${theme.spacing.px40} ${theme.spacing.px20};
    `}
`;

const UploadMultipleFiles = styled('div')`
    ${({ theme }) => `
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        h3 {
            color: ${theme.colors.blueGrey1};
        }
    `}
`;

const UploadItems = styled('div')`
    ${({ theme }) => `
        width: 100%;
        max-height: 25vh;
        overflow-y: scroll;
        h3 {
            text-align: center;
            margin: 0 0 ${theme.spacing.px20};
        }
        ::-webkit-scrollbar {
            width: 4px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: ${theme.colors.white}; 
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${theme.colors.blueGrey1}; 
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    `}
`;

const UploadItem = styled('div')`
    ${({ theme }) => `
        width: ${theme.spacing.full};
        display: flex;
        align-items: center;
        padding: ${theme.spacing.px10} ${theme.spacing.px10} ${theme.spacing.px10};
        border-bottom: 1px solid ${theme.colors.grey2};
        box-sizing: border-box;
        svg:nth-child(1) {
            background: ${theme.colors.blueGrey1};
            color: white;
            padding: ${theme.spacing.px10};
            border-radius: ${theme.spacing.full};
        }
        p {
            margin: 0 ${theme.spacing.px15};
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    `}
`;

const LabelStyled = styled('label')`
    ${({ theme, disabled }) => `
        display: flex;
        align-items: center;
        background: ${theme.colors.blueGrey1};
        padding: ${theme.spacing.px15} ${theme.spacing.px20};;
        border-radius: ${theme.spacing.px10};
        color: white;
        cursor: pointer;
        margin-top:  ${theme.spacing.px20};;
        svg {
            margin-right: ${theme.spacing.px10};
            color: white;
        }
        ${disabled &&
            `
            background: ${theme.colors.blueGrey3};
            cursor: wait;
        `}
    `}
`;

const Text = styled('div')`
    ${({ theme }) => `
        text-align: center;
        h3 {
            margin: 0
        }
        p {
            margin: ${theme.spacing.px8} 0 0;
        }
    `}
`;

const InputStyled = styled('div')`
    ${({ theme }) => `
        display: none;
    `}
`;

const ProgressStyled = styled('progress')`
    ${({ theme }) => `
        transition: all .3s;
        margin: 0 ${theme.spacing.px15} 0;

        color: ${theme.colors.blue2};
        &::-webkit-progress-bar-value {
            color: ${theme.colors.blue2};
    }
    `}
`;

const CloseFontAwesomeIcon = styled(FontAwesomeIcon)`
    ${({ theme, disabled }) => `
        cursor: pointer;
    `}
`;

let newFiles = [];
let totalUploaded = 0;

class File extends Component {
    state = {
        imageTypes: ['image/jpeg', 'image/jpg', 'image/png'],
        files: [],
        hasFileUploading: false,
        newFiles: [],
        cancelUpload: {},
        maxFilesize: 1024 * 900,
    };

    componentDidUpdate(prevProps, prevState) {
        const { state } = this;

        if (prevState.newFiles.length < state.newFiles.length) {
            if (!state.hasFileUploading) {
                this.uploadMedia(newFiles[0]);
            }
        }
    }

    componentWillUnmount() {
        newFiles = [];
    }

    handleChange = files => {
        let newFilesStructure = [];

        for (let i = 0; i < files.target.files.length; i++) {
            // não funciona com forEach
            newFilesStructure.push({
                file: files.target.files[i],
                uniqueCode: new Date().getTime() + files.target.files[i].name,
                uploadPercentage: 0,
            });
        }
        this.setState({
            newFiles: [...newFiles, ...newFilesStructure],
        });
        newFiles = [...newFiles, ...newFilesStructure];
    };

    uploadMedia = async file => {
        const {
            state,
            props: { mediaSetId },
        } = this;

        const totalFileParts = parseInt(file.file.size / state.maxFilesize) + 1;
        const body = {
            mediaSetID: mediaSetId,
            size: file.file.size,
            parts: totalFileParts,
            name: file.file.name,
        };

        this.setState({
            hasFileUploading: true,
            files: [...state.files, newFiles[0]],
            newFiles: [],
        });
        newFiles.shift();

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        this.setState({
            cancelUpload: source,
        });

        try {
            const response = await MediasService.createMedia(body, source.token);

            if (response.status === 200) {
                this.uploadFile(response.data.id, file, totalFileParts, source.token);
            }
        } catch (e) {
            console.log(e);
        }
    };

    uploadFile = (id, file, totalFileParts, cancelToken) => {
        const { state } = this;

        let reader = new FileReader();
        let that = this;

        let restOfFile = file.file.size;
        let partSize = restOfFile > state.maxFilesize ? state.maxFilesize : restOfFile;
        let totalPartsUploaded = partSize;
        let chunk = file.file.slice(0, totalPartsUploaded);

        reader.onload = function(e) {
            for (let i = 0; i < totalFileParts; i++) {
                let formData = new FormData();
                formData.append('id', id);
                formData.append('index', i + 1);
                formData.append('data', chunk);
                that.uploadChunk(formData, file.uniqueCode, totalFileParts, cancelToken);

                restOfFile -= state.maxFilesize;
                partSize = restOfFile > state.maxFilesize ? state.maxFilesize : restOfFile;
                chunk = file.file.slice(totalPartsUploaded, totalPartsUploaded + partSize);
                totalPartsUploaded += partSize;
            }
        };
        reader.readAsArrayBuffer(file.file);
    };

    uploadChunk = async (chunk, uniqueCode, totalFileParts, cancel) => {
        const {
            state,
            props: { dispatch, t },
        } = this;

        try {
            const response = await MediasService.uploadMediaChunk(chunk, cancel);

            if (response.status === 200) {
                let newFilesUpdate = state.files;
                totalUploaded += 1;
                newFilesUpdate.find(item => item.uniqueCode === uniqueCode).uploadPercentage =
                    (totalUploaded / totalFileParts) * 100;
                newFilesUpdate.find(item => item.uniqueCode === uniqueCode).id = response.data.id;
                this.setState({
                    files: [...newFilesUpdate],
                });

                if (response.data.last) {
                    this.uploadNext();
                }
            }
        } catch (e) {
            dispatch({
                type: SHOW_TOAST.SUCCESS,
                message: t('UPLOAD_FAILURE'),
                messageType: 'error',
            });
            state.cancelUpload.cancel('CANCELADO');
            this.uploadNext();
        }
    };

    uploadNext = () => {
        totalUploaded = 0;
        let fileToUpload = newFiles.find(item => !item.uploadPercentage);

        if (fileToUpload) {
            this.uploadMedia(fileToUpload);
        } else {
            this.setState({
                hasFileUploading: false,
            });
        }
    };

    removeMedia = media => {
        const { state } = this;

        let files = [...state.files.filter(item => item.uniqueCode !== media.uniqueCode)];
        newFiles = newFiles.filter(item => item.uniqueCode !== media.uniqueCode);
        let shouldUploadNext = false;

        if (media.uploadPercentage === 100) {
            this.deleteMedia(media.id);
        } else if (media.uploadPercentage > 0 || state.files[state.files.length - 1].uniqueCode === media.uniqueCode) {
            state.cancelUpload.cancel('CANCELADO');
            shouldUploadNext = true;
        }

        this.setState(
            {
                files,
            },
            () => {
                if (shouldUploadNext) {
                    this.uploadNext();
                }
            },
        );
    };

    deleteMedia = id => {
        const {
            props: { dispatch },
        } = this;

        dispatch({
            type: DELETE_MEDIA.REQUEST,
            id,
        });
    };

    isTypeCamera = (imageTypes, fileType) => {
        return imageTypes.find(type => type === fileType);
    };

    isThereAnyMediaUploading = files => {
        return files.some(item => item.uploadPercentage !== 100);
    };

    closeModal = _ => {
        const {
            state,
            props: { dispatch, closeModal },
        } = this;

        dispatch({
            type: GET_FOLDERS.RESET,
        });

        dispatch({
            type: GET_FOLDERS.REQUEST,
            body: {
                'cursor': '',
                'page_size': '20',
            },
        });

        closeModal(state.files);
    };

    render() {
        const {
            state,
            props: { t, mediaSetId },
        } = this;

        return (
            <ModalDefault
                visible={true}
                effect='fadeInDown'
                width={530}
                onClickAway={this.closeModal}
                title={t('FILE_TITLE')}
                confirmButton={this.closeModal}
                confirmButtonText={t('FINISH')}
                buttonConfirmDisabled={this.isThereAnyMediaUploading(state.files)}
                iconClose={['fal', 'times']}
            >
                <FileWrapper>
                    <UploadMultipleFiles>
                        {state.files.length ? (
                            <UploadItems>
                                <h3>{t('FILES_CHOSEN')}</h3>
                                {[...state.files, ...newFiles].map((item, index) => {
                                    return (
                                        <UploadItem key={index}>
                                            {this.isTypeCamera(state.imageTypes, item.file.type) ? (
                                                <FontAwesomeIcon icon={['fal', 'camera']} />
                                            ) : (
                                                <FontAwesomeIcon icon={['fal', 'video']} />
                                            )}
                                            <p title={item.file.name}>{item.file.name}</p>
                                            <ProgressStyled value={item.uploadPercentage} max='100'></ProgressStyled>
                                            <CloseFontAwesomeIcon
                                                onClick={() => this.removeMedia(item)}
                                                icon={['fal', 'times']}
                                            />
                                        </UploadItem>
                                    );
                                })}
                            </UploadItems>
                        ) : (
                            <Text>
                                <h3>{t('FILES_INFO_TITLE')}</h3>
                                <p>{t('FILES_INFO_DESCRIPTION')}</p>
                            </Text>
                        )}
                        <LabelStyled
                            disabled={!mediaSetId}
                            // htmlFor={mediaSetId ? 'multiple-files' : ''}>
                            htmlFor={'multiple-files'}
                        >
                            <FontAwesomeIcon icon={['fal', 'upload']} />
                            {t('CHOOSE_FILES')}
                        </LabelStyled>
                        <InputStyled>
                            <Input
                                type='file'
                                id='multiple-files'
                                label=''
                                multiple
                                accept={`${permitedVideos}, ${permitedImages}`}
                                onChange={this.handleChange}
                            />
                        </InputStyled>
                    </UploadMultipleFiles>
                </FileWrapper>
            </ModalDefault>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(translate('FileUploadInParts')(File)));
