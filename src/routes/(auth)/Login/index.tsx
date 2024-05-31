import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';
import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$(( data, { cookie, redirect } ) => {

    const { email, password } = data;

    //Aqui podriamos validar clave e usuario usando TypeOrm, prisma, etc

    if( email === 'franco@mail.com' && password === '1234' ) {

        cookie.set('jwt', 'esto_es_mi_jwt', { secure: true, path: '/' });

        redirect( 302, '/' );
    }
    return {
        success: false
    }
    //Lo siguiente es un esquema de validacion nativo de qwik para formularios
}, zod$({
    email: z.string().email('formato no valido'),
    password: z.string().min(6,'Mínimo 6 letras')
}));

export default component$(() => {

    useStylesScoped$(styles);

    const action = useLoginUserAction();

    return (
        <Form 
            action={ action } 
            class="login-form mt-5"
        >
            <div class="relative">
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email address"
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"

                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>
            <code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code>
        </Form>
    )
});