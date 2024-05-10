import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
    id: number | string;
    showImage?: boolean;
    size?: number;
    backImage?: boolean;
}

export const PokemonImage = component$(( props : Props ) => {
    
    const { 
        id, size = 200, 
        backImage, showImage 
    } = props;
    
    const imageLoaded = useSignal<boolean>( false );

    useTask$( ({ track }) => {
        
        track( () => id );

        imageLoaded.value = false;
    })
    
    return (
        <div 
            class='flex items-center justify-center' 
            style={{ 
                width: `${ size }px`, 
                height: `${ size }px` 
            }}
        >
            { !imageLoaded.value && <span>Cargando..</span> }
            <img 
                alt="pokeImg" 
                style={{ width: `${ size }px` }}
                onLoad$={ () => imageLoaded.value = true }
                class={{
                    'hidden': !imageLoaded.value,
                    'brightness-0': !showImage
                }}
                src={``+
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+
                    `${ backImage ? '/back/' : '' }`+
                    `${ id }.png`+
                ``} 
            />
        </div>
    )
});