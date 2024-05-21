import { $, useComputed$, useSignal } from "@builder.io/qwik";


export const useCounter = () => {

    const counter = useSignal( 0 );

    const handleCounter = $(
        ( add: string ) => counter.value += (
            add === 'add' ?
                1 :
                -1
        )
    );

    return {
        counter: useComputed$(() => counter.value), 
        handleCounter
    };
}