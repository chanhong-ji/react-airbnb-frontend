function required(key: string, default_value = undefined) {
    let value = process.env[key] || default_value;
    if (!value) {
        throw new Error(`envError: Key ${key} is undefined`);
    }
    return value;
}

const config = {
    host: {
        url: required("REACT_APP_HOST"),
    },
    gh: {
        clientId: required("REACT_APP_GH_CLIENT_ID"),
    },
    kakao: {
        clientId: required("REACT_APP_KAKAO_CLIENT_ID"),
        redirectUrl: required("REACT_APP_KAKAO_REDIRECT_URL"),
    },
};

export default config;
