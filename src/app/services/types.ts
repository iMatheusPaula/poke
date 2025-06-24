export type PaginatedResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Pokemon[]
}

export type Pokemon = {
    name: string,
    url: string,
    id: number
}

export type PokemonDetail = {
    id: number,
    name: string,
    height: number,
    weight: number,
    types: PokemonType[],
    abilities: PokemonAbility[],
    stats: PokemonStat[],
    sprites: PokemonSprites
}

export type PokemonType = {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

export type PokemonAbility = {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}

export type PokemonStat = {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export type PokemonSprites = {
    other: {
        'official-artwork': {
            front_default: string | null,
            front_shiny: string | null
        },
        'dream_world': {
            front_default: string | null
        },
        'home': {
            front_default: string | null,
            front_shiny: string | null
        },
    }
}
