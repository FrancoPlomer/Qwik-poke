import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);


    if (
        isNaN(id) ||
        id <= 0 ||
        id >= 1000
    ) redirect(301, '/');

    return id;
});

export default component$(() => {

    const pokemonId = usePokemonId();
    const pokemonGame = useContext(PokemonGameContext);

    return <>
        <span class="text-5xl">
            Pokemon:
        </span>
        <PokemonImage
            id={pokemonId.value}
            showImage={pokemonGame.showImage}
            backImage={pokemonGame.showBackImage}
        />

    </>
});