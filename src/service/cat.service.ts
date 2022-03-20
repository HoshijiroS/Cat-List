import { config } from "../models/config";
import { handleResponse } from './api.service';

export function getBreeds() {
    return handleResponse(`${config.api}/breeds`, {});
}

export function getCatByBreed(page: number, limit: number, breed_id: string) {
    return handleResponse(`${config.api}/images/search`, {
        page, limit, breed_id, order: 'asc'
    });
}

export function getCat(id: string){
    return handleResponse(`${config.api}/images/${id}`, {});
}