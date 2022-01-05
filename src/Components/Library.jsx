import React from 'react'
import LibrarySong from './LibrarySong';






const Library = ({songs,setCurrentSong,refAudio,isPlaying,setSongs,libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? "activeLibrary" : ''}`}>
            <h2>Library</h2>

            <div className="library-songs">
                {songs.map((song)=><LibrarySong 
                songs={songs}
                refAudio={refAudio}
                song={song}
                setSongs={setSongs}
                isPlaying={isPlaying}
                id={song.id}
                setCurrentSong={setCurrentSong}
                key={song.id}/>)}
            </div>
            
        </div>
    )
}

export default Library
