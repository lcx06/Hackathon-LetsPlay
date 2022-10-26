import { spotifyProfileReducer } from './spotify.profile.slice'
import { spotifySessionReducer } from './spotify.session.slice'
import { spotifyMyAlbumsReducer } from './spotify.myAlbums.slice'
import { spotifyMyTracksReducer } from './spotify.mySongs.slice'
import { spotifyMyPlaylistsReducer } from 'spotify/spotify.myPlaylists.slice'
import { spotifyPlaylistTracksReducer } from 'spotify/spotify.myPlaylistTracks.slice'
import { spotifyQueryReducer } from 'spotify/spotify.query.slice'

export * from './spotify.api'
export * from './spotify.session.api'
export * from './spotify.session.slice'
export * from './spotify.profile.api'
export * from './spotify.profile.slice'

export * from './spotify.myAlbums.api'
export * from './spotify.myAlbums.slice'

export * from './spotify.mySongs.api'
export * from './spotify.mySongs.slice'

export * from './spotify.myPlaylists.api'
export * from './spotify.myPlaylists.slice'

export * from './spotify.myPlaylistTracks.api'
export * from './spotify.myPlaylistTracks.slice'

export * from './spotify.query.api'
export * from './spotify.query.slice'

export const reducers = {
    profile: spotifyProfileReducer,
    session: spotifySessionReducer,
    myAlbums: spotifyMyAlbumsReducer,
    myTracks: spotifyMyTracksReducer,
    myPlaylists: spotifyMyPlaylistsReducer,
    playlistTracks: spotifyPlaylistTracksReducer,
    query: spotifyQueryReducer
}

export const provider = {
    reducers,
}