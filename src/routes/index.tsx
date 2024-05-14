import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import {
  $, component$, useContext
} from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  // const pokemonId     = useSignal<number>( 1 ); 
  // const showBackImage = useSignal<boolean>( false ); 
  // const showImage     = useSignal<boolean>( false ); 

  //El simbolo de dolar indica que la carga de ese elemento javascript es peresoza

  const handleChange = $(
    (newValue: number) => {

      if (newValue <= 0) return;

      pokemonGame.showImage = false;
      pokemonGame.pokemonId = newValue;
    }
  );

  const handleTypeShowImage = $(
    () => pokemonGame.showBackImage = !pokemonGame.showBackImage
  )

  const handleShowImage = $(
    () => pokemonGame.showImage = true
  )

  const goToPokemon = $(
    () => nav(`/pokemon/${pokemonGame.pokemonId}`)
  )

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
