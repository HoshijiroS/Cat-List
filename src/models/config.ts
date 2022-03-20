export const config: Config = {
    /**
     * Free API Key from https://thecatapi.com/
     */
    "authHeader": "2345128f-f8ca-436d-bc2d-cb862f585cf4",
    "api": "https://api.thecatapi.com/v1"
}

export interface Config {
    authHeader: string;
    api: string;
}