import { component$, useComputed$ } from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { 
  routeLoader$, useLocation, useNavigate, 
  type DocumentHead 
} from '@builder.io/qwik-city';

export const usePokemonList = routeLoader$( async( params ) => {

  const { query, redirect, pathname } = params;

  const offset = Number( 
    query.get('offset') ||
    '0' 
  );

  if( 
    isNaN(offset) || 
    offset <= 0 || 
    offset >= 1000 
) redirect( 301, pathname );

  return await getSmallPokemons( offset );
})

export default component$(() => {

  const nav      = useNavigate();
  const location = useLocation();
  const pokemons = usePokemonList();

  const currentOffset = useComputed$<number>(() => (
      Number(
        new URLSearchParams( location.url.search ).get('offset') || 0
      )
    )
  );  
  
  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current offset:{currentOffset}</span>
        <span>Is loading page: { location.isNavigating ? 'Yes' : 'No' } </span>
      </div>
      <div class="mt-10">
        <button 
          class="btn btn-primary mr-2"
          onClick$={ () =>(
            currentOffset.value - 10 >= 0 && 
            nav( `/pokemons/list-ssr?offset=${ currentOffset.value - 10 }` ) 
          )}
        >
          Anteriores
        </button>
        <button 
          class="btn btn-primary mr-2"
          onClick$={ () => (
            nav( `/pokemons/list-ssr?offset=${ currentOffset.value + 10 }` )
          )}
        >
          Siguientes
        </button>
      </div>
      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map( ({ id, name }:{ id:string, name:string }) => (
            <div 
              key={ id } 
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage showImage id={ id } />
              <span class="capitalize">{ name }</span>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: 'Qwik Server',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
