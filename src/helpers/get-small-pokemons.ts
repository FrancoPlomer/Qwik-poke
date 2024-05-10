import type { SmallPokemon } from "~/interfaces/small-pokemon";
import type { PokemonListResponse } from "~/interfaces/pokemon-list.response";


export const getSmallPokemons = async ( offset : number = 0, limit : number = 10 ) : Promise<SmallPokemon[]> => {

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`);

    const data = await respuesta.json() as PokemonListResponse;
    
    return (
        Array.isArray( data.results ) ? 
        data.results.map( ({ name, url }) => ({
                id: (
                    url.split('/')
                ).at( -2 )!,
                name
            })
        ) :
        []
    );
}