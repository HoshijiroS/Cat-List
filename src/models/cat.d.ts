export interface Breed {
    id: string;
    name: string;
}

export interface Cat {
    id: string;
    name: string;
    url: string;
    description: string;
}

export interface BreedDetail {
    id: string;
    name: string;
    description: string;
    natural: number;
    rare: number;
    suppressed_tail: number;
    short_legs: number;
    adaptability: number;
    hairless: number;
    origin: string;
    temperament: string;
}
  
export interface CatDetail {
    id: string;
    url: string;
    breeds: BreedDetail[];
}