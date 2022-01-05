

const LibrarySong = ({songs,song,setCurrentSong,refAudio,isPlaying,id,setSongs}) => {

const songSelectHandler=async()=>{
    setCurrentSong(song);
    // add active state
    const newSongs= songs.map((song)=>{
        if(song.id === id){
            return{
                ...song,
                active:true
            };
        }
        else{
            return{
                ...song,
                active:false
            }
        }
    });
    await setSongs(newSongs)
     if(isPlaying) refAudio.current.play();
}



    return (
        <div className={`library-song ${song.active ? 'selected' : ""}`}   onClick={songSelectHandler}>
            <img src={song.cover} alt={song.name} />

            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
            
        </div>
    )
}

export default LibrarySong
