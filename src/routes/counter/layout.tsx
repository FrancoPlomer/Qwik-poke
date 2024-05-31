import { Slot, component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(() => {

    const nav = useNavigate();

    return (
        <div class='flex flex-col justify-center items-center mt-10'>
            <Slot />
            <span 
            onClick$={ () => nav('/') }
            class='mt-5'
            style={{ cursor: 'pointer' }} 
            >
                Regresar
            </span>
        </div>
    )
});