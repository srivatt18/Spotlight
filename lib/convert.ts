import { MediaType, MovieHistoryType, watchedMoviesSchema, watchlistSchema } from "@/lib/validate"

export function deserializeWatchHistory(watchedMovies: string) {
    let history = watchedMoviesSchema.safeParse(JSON.parse(watchedMovies))
    if (!history.success) {
        return []
    }

    console.log("deserialized to " + history.data)
    return history.data
}

export function serializeWatchHistory(history: MovieHistoryType[]) {
    console.log("serialized to " + JSON.stringify(history))
    return JSON.stringify(history)
}

export function deserializeWatchlist(watchlist: string) {
    
    let list = watchlistSchema.safeParse(JSON.parse(watchlist))
    if (!list.success) {
        return []
    }

    console.log("deserialized to" + list.data)
    return list.data
}

export function serializeWatchlist(watchlist: MediaType[]) {
    return JSON.stringify(watchlist)
}