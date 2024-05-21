import { type DocumentHead } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {

  const {
    pokemonGame,
    goToPokemon,
    handleChange,
    handleShowImage,
    handleTypeShowImage,
  } = usePokemonGame();

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      <a style={{ cursor: 'pointer' }} onClick$={() => goToPokemon()}>
        <PokemonImage
          size={200}
          id={pokemonGame.pokemonId}
          showImage={pokemonGame.showImage}
          backImage={pokemonGame.showBackImage}
        />
      </a>
      <div class="mt-2">
        <button
          name="prev"
          class="btn btn-primary mr-2"
          onClick$={
            () => handleChange(pokemonGame.pokemonId - 1)
          }
        >
          Anterior
        </button>
        <button
          name="next"
          class="btn btn-primary mr-2"
          onClick$={
            () => handleChange(pokemonGame.pokemonId + 1)
          }
        >
          Siguiente
        </button>
        <button
          name="next"
          class="btn btn-primary mr-2"
          onClick$={() => handleTypeShowImage()}
        >
          Voltear
        </button>
        <button
          name="next"
          class="btn btn-primary"
          onClick$={() => handleShowImage()}
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
