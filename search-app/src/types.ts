type MoreResults = {
    title: string
    link: string
    description: string
}

export type Pokemon = {
    id: number
    name: string
    searchResult: MoreResults[]
}
