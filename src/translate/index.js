import { FileUploadInPartsPT, FileUploadInPartsEN } from 'components/FileUploadInParts/FileUploadInPartsTranslator';
import { LoginPT, LoginEN } from 'containers/Login/LoginTranslator';

let translationsPT = {
    locale: 'pt-BR',
    ...FileUploadInPartsPT,
    ...LoginPT,
}

let translationsEN = {
    locale: 'en-US',
    ...FileUploadInPartsEN,
    ...LoginEN,
}

export { translationsPT, translationsEN };