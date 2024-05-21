import ModalStyles from './modal.css?inline';
import { 
    Slot, 
    component$, 
    useStylesScoped$, 
    type PropFunction, 
} from '@builder.io/qwik';

interface Props {
    showModal: boolean;
    persistent?: boolean;
    CloseFn: PropFunction<() => void>;
    size: 'sm' | 'md' | 'lg';
}

export const Modal = component$( ( props : Props ) => {

    const { 
        CloseFn, 
        showModal, 
        size = 'md',
        persistent = false, 
    } = props;

    useStylesScoped$(ModalStyles);

    return (
        // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
        <div
            id='modal-content'
            onClick$={ event => {
                    //Esto lo hacemos para que cierre si hacemos click afuera del modal
                    const id = (event.target as HTMLDivElement).id;
                    
                    if(id === 'modal-content' && !persistent) CloseFn();
                }
            }
            class={ 
                showModal ? 
                'modal-background' : 
                'hidden' 
            }
        >
            <div class={`modal-content ${ 'modal-' + size }`}>
                
                <div class="mt-3 text-center">
                    
                    <h3 class="modal-title">
                        <Slot name='title' />
                    </h3>

                    <div class="mt-2 px-7 py-3">
                        <div class="modal-content-text">
                            <Slot name='content' />
                        </div>
                    </div>


                    {/* Botton */}
                    <div class="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            class="modal-button"
                            onClick$={() => CloseFn()}
                        >
                            Cerrar
                        </button>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
});