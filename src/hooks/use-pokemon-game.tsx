    import { $, useContext } from "@builder.io/qwik";
    import { useNavigate } from "@builder.io/qwik-city";
    import { PokemonGameContext } from "~/context";


export const usePokemonGame = () => {
    const nav = useNavigate();

    const pokemonGame = useContext(PokemonGameContext);

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

    return {
        pokemonGame,
        goToPokemon,
        handleChange,
        handleShowImage,
        handleTypeShowImage,
    }
}