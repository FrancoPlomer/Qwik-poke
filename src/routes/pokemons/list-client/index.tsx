import { PokemonListContext } from '~/context';
import type { DocumentHead } from '@builder.io/qwik-city';
import type { SmallPokemon } from '~/interfaces/small-pokemon';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import {
  component$, $, useTask$,
  useOnDocument, useContext
} from '@builder.io/qwik';

interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  isEndPage: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {


  const pokemonState = useContext<PokemonPageState>(PokemonListContext);

  useTask$(async ({ track }) => {

    if (pokemonState.isEndPage) {
      pokemonState.isLoading = false;
      return
    }

    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);

    if (!pokemons.length) {

      pokemonState.isEndPage = true;

      return;
    }

    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      //La suma se debe a que debemos tomar todo lo que hicimos scroll con el resto de la pantalla
      //Que no se encuentra en el scroll
      const currentScroll = window.scrollY + window.innerHeight;

      if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }

    })
  );

  return (
    <>
      <div class="flex flex-col fixed top-0" style={{ backgroundColor: '#151934' }}>
        <span class="my-5 text-5xl">Status</span>
        <span>Actual page: {pokemonState.currentPage} </span>
        <span>{pokemonState.isLoading ? 'Loading...' : ''} </span>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {
          pokemonState.pokemons.map(({ id, name }: { id: string, name: string }) => (
            <div
              key={id}
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage showImage id={id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: 'Qwik Client',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
