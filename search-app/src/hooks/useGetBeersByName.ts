import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const basePath = 'https://api.punkapi.com/v2/beers?'
const getBeersByName = (name: string) =>
    axios.get(`${basePath}beer_name=${name}`).then((res) => res.data);


export const useGetBeersByName = (name: string) =>
    useQuery({
        queryKey: ['beersNames', name],
        keepPreviousData: true,
        queryFn: () => getBeersByName(name),
    });