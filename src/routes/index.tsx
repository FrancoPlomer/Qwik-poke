import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { 
  $, component$, useSignal  
} from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const nav = useNavigate();

  const pokemonId     = useSignal<number>( 1 ); 
  const showBackImage = useSignal<boolean>( false ); 
  const showImage     = useSignal<boolean>( false ); 

  //El simbolo de dolar indica que la carga de ese elemento javascript es peresoza

  const handleChange = $(
    ( newValue: number ) => {
    
      if ( newValue <= 0 ) return;
      
      showImage.value = false;
      pokemonId.value = newValue;
    }
  );

  const handleTypeShowImage = $(
    () => showBackImage.value = !showBackImage.value
  )

  const handleShowImage = $(
    () => showImage.value = true
  )

  const goToPokemon = $(
    () => nav( `/pokemon/${pokemonId.value}` )
  )

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId }</span>
      <a style={{ cursor: 'pointer' }} onClick$={ () => goToPokemon() }>
        <PokemonImage 
          size={ 200 } 
          id={ pokemonId.value }
          showImage={ showImage.value } 
          backImage={ showBackImage.value }
        />
      </a>
      <div class="mt-2">
        <button 
          name="prev" 
          class="btn btn-primary mr-2"
          onClick$={ 
            () => handleChange( pokemonId.value - 1 ) 
          } 
        >
          Anterior
        </button>
        <button 
          name="next" 
          class="btn btn-primary mr-2"
          onClick$={ 
            () => handleChange( pokemonId.value + 1 ) 
          } 
        >
          Siguiente
        </button>
        <button 
          name="next" 
          class="btn btn-primary mr-2"
          onClick$={ () => handleTypeShowImage() } 
        >
          Voltear
        </button>
        <button 
          name="next" 
          class="btn btn-primary"
          onClick$={ () => handleShowImage() } 
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
