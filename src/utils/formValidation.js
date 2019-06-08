const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Campo obrigatório!'
    }
    if (!values.password) {
        errors.password = 'Campo obrigatório!'
    }
    if (!values.batchName) {
        errors.batchName = 'Campo obrigatório!'
    }
    if (!values.message) {
        errors.message = 'Campo obrigatório!'
    }
    if (!values.company) {
        errors.company = 'Campo obrigatório!'
    } else if (values.company === 'Selecione...') {
        errors.company = 'Campo obrigatório!'
    }
    if (!values.channel) {
        errors.channel = 'Campo obrigatório!'
    } else if (values.channel === 'Selecione...') {
        errors.channel = 'Campo obrigatório!'
    }

    if (!values.batchSize) {
        errors.batchSize = 'Campo obrigatório!'
    } else if (values.batchSize < 1) {
        errors.batchSize = 'O valor mínimo é 1!'
    }

    if (!values.cooldownTime) {
        errors.cooldownTime = 'Campo obrigatório!'
    } else if (values.cooldownTime < 1) {
        errors.cooldownTime = 'O valor mínimo é 1!'
    }

    return errors;
}

export default validate;