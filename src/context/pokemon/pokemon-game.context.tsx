import { createContextId } from "@builder.io/qwik";


export interface PokemonGameState {
    pokemonId: number;
    showImage: boolean;
    showBackImage: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');