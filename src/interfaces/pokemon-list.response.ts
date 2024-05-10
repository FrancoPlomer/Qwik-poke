export interface PokemonListResponse {
    count:    number;
    next:     null;
    previous: null;
    results:  BasicPokemonInfo
}

export interface BasicPokemonInfo {
    name: string;
    url:  string;
}
