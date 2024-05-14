import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        showImage: true,
        showBackImage: false
    });

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        isEndPage: false,
        pokemons: []
    })

    useContextProvider(PokemonGameContext, pokemonGame);
    useContextProvider(PokemonListContext, pokemonList);

    useVisibleTask$(() => {
        if (localStorage.getItem('pokemon-game')) {

            const {
                showImage = true,
                pokemonId = 10,
                showBackImage = false,
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showImage = showImage;
            pokemonGame.showBackImage = showBackImage;
        }
    })

    useVisibleTask$(({ track }) => {

        track(() => [pokemonGame.pokemonId, pokemonGame.showBackImage, pokemonGame.showImage]);

        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
    })

    return <Slot />
});
