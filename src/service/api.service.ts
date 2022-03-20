import axios, { AxiosResponse } from "axios";
import { config } from "../models/config";

const instance = axios.create({
    headers: {
      "X-Api-Key": config.authHeader
    }
});

export async function handleResponse(endpoint: string, queryParams: any) {
    return instance.get<any>(endpoint, 
        { params: queryParams }
    ).then((response: AxiosResponse<any>) => {
        return response;
    }).catch((error) => {
        throw new Error (`Error ${error}`);
    });
}