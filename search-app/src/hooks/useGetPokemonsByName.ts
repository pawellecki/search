import { useQuery } from '@tanstack/react-query';
import { allPokemons } from "../pokemon"

const fakeAsyncFn = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve("ok");
        }, 400);
    });


const getPokemonsByName = async (name: string, page: number, perPage: number) => {
    await fakeAsyncFn()

    let filteredData = allPokemons;

    if (name) {
        const searchName = name.toLowerCase();

        filteredData = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().startsWith(searchName)
        );
    }

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const totalPages = Math.ceil(filteredData.length / perPage);

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        page,
        perPage,
        totalItems: filteredData.length,
        totalPages,
    };
}

export const useGetPokemonsByName = (name: string, page: number, perPage: number) =>
    useQuery({
        queryKey: ['pokemonsNames', name, page, perPage],
        queryFn: () => getPokemonsByName(name, page, perPage),
    });
