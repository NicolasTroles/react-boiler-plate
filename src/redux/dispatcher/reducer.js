// Types
import {
    FETCH_COMPANIES,
    SET_CSV_COLUMNS,
} from './types';

const INITIAL_STATE = {
    companies: {
        data: [
            {
                "defaults": {
                    "kami": {
                        "dialog": "DEMOSOFIA",
                        "portfolio": "DEMOSOFIA",
                        "company": "73879330000172"
                    },
                    "data": {
                        "intent": "receptive"
                    }
                },
                "channels": {
                    "sms": "554188160756",
                    "wpp_no": "554188160756",
                    "email": "atendimento@demo.softinova.com.br"
                },
                "keepContext": [
                    "wpp_no",
                    "sms"
                ],
                "id": "73879330000172",
                "name": "Empresa Demo Sofia"
            },
            {
                "defaults": {
                    "kami": {
                        "dialog": "PGMais",
                        "portfolio": "PGMais",
                        "company": "73879330000172"
                    },
                    "data": {}
                },
                "channels": {
                    "sms": "554188160756",
                    "wpp_no": "554188160756"
                },
                "keepContext": [
                    "wpp_no",
                    "sms"
                ],
                "id": "11111111111111",
                "name": "POC Mexico"
            },
            {
                "defaults": {
                    "kami": {
                        "dialog": "SaoCamilo",
                        "portfolio": "DemoSaoCamilo",
                        "company": "73879330000172"
                    },
                    "data": {}
                },
                "channels": {
                    "wpp_no": "554188160756"
                },
                "keepContext": [
                    "wpp_no"
                ],
                "id": "51284123000132",
                "name": "Centro Hospitalar São Camilo"
            },
            {
                "defaults": {
                    "kami": {
                        "dialog": "AcessoSaude",
                        "portfolio": "AcessoSaude",
                        "company": "73879330000172"
                    },
                    "data": {}
                },
                "channels": {
                    "sms": "SC00000002",
                    "wpp_no": "554184630091"
                },
                "keepContext": [
                    "wpp_no",
                    "sms"
                ],
                "id": "07282880000185",
                "name": "ACESSO SAÚDE"
            },
            {
                "defaults": {
                    "kami": {
                        "dialog": "DEMOBARIGUI",
                        "portfolio": "DEMOBARIGUI",
                        "company": "73879330000172"
                    },
                    "data": {
                        "teste": "true",
                        "images": []
                    }
                },
                "channels": {
                    "sms": "SC00000002",
                    "wpp_no": "554189018522"
                },
                "keepContext": [
                    "wpp_no",
                    "sms"
                ],
                "id": "00556603000174",
                "name": "Banco Barigui"
            },
            {
                "defaults": {
                    "kami": {
                        "dialog": "DemoIPSOS",
                        "portfolio": "DemoIPSOS",
                        "company": "73879330000172"
                    },
                    "data": {}
                },
                "channels": {
                    "sms": "554188160756",
                    "wpp_no": "554188160756"
                },
                "keepContext": [
                    "wpp_no",
                    "sms"
                ],
                "id": "04270642000161",
                "name": "IPSOS"
            },
            {
                "defaults": {
                    "kami": {
                        "dialog": "DEMOMAXIPAS",
                        "portfolio": "DEMOMAXIPAS",
                        "company": "73879330000172"
                    },
                    "data": {}
                },
                "channels": {
                    "chat": "08582146000102"
                },
                "keepContext": [],
                "id": "08582146000102",
                "name": "MAXIPAS"
            }
        ],
        isLoading: false,
        error: 'af',
    },
    csvFileColumns: [],
}

const dispatcherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COMPANIES.REQUEST:
            return {
                ...state,
                companies: {
                    isLoading: true,
                },
            }

        case FETCH_COMPANIES.SUCCESS:
            return {
                ...state,
                companies: {
                    data: action.data,
                    error: "",
                    isLoading: false
                }
            }

        case FETCH_COMPANIES.FAILURE:
            return {
                ...state,
                companies: {
                    data: [],
                    error: action.error,
                    isLoading: false
                }
            }

        case SET_CSV_COLUMNS.SUCCESS:
            return {
                ...state,
                csvFileColumns: [...action.csvColumns],
            }

        default:
            return state

    }
}

export default dispatcherReducer;

