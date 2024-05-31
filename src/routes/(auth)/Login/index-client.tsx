import { component$, useStore, useStylesScoped$, $, useComputed$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);

    const formState = useStore({
        email: '',
        password: '',
        formPosted: false,
    });
    
    const emailError = useComputed$(() => formState.email.includes('@') ? '' : 'not-valid');
    const passwordError = useComputed$(() => formState.password.length >= 6 ? '' : 'not-valid');
    const isFormInvalid = useComputed$(() => [ emailError.value, passwordError.value ].includes('not-valid') );

    const onSubmit = $(
        () => {
            
            formState.formPosted = true;

            const { email, password } = formState;
            console.log({ email, password });            
        }
    )

    return (
        <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
            <div class="relative">
                <input 
                    name="email" 
                    type="text" 
                    value={ formState.email }
                    placeholder="Email address"
                    onInput$={ ev => formState.email = (ev.target as HTMLInputElement).value  }
                    class={ 
                        formState.formPosted ? 
                        emailError.value : 
                        '' 
                    } 
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    value={ formState.password }
                    onInput$={ ev => formState.password = (ev.target as HTMLInputElement).value }
                    class={ 
                        formState.formPosted ? 
                        passwordError.value : 
                        '' 
                    } 
                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button disabled={isFormInvalid.value} type='submit'>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});