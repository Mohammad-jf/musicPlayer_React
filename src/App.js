import Song from './Components/Song';
import Player from './Components/Player';
import './styles/app.css';
import { React,useState, useRef } from 'react';
import data from './data'
import Library from './Components/Library'
import Nav from './Components/Nav';





function App() {
// states
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime:0,
    duration:"",
    animationPercentage:0,
  });
  const [libraryStatus,setLibraryStatus] = useState(false);
  const refAudio = useRef(null);


// for updating time
const timeUpdateHandler = (e)=>{
 const roundedCurrent = Math.round(e.target.currentTime);
 const roundedDuration = Math.round(e.target.duration);
 const animate = Math.round((roundedCurrent / roundedDuration) * 100)
  setSongInfo({...songInfo,
      currentTime:e.target.currentTime,
      duration:e.target.duration,
      animationPercentage:animate,
  });
  }

  const songEndHandler =async()=>{
    let currentIndex = songs.findIndex((song)=>song.id ===currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying)refAudio.current.play();
  }


  return (
    <div className={`app ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>

      <Song currentSong={currentSong}/>
      <Player 
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      refAudio={refAudio}
      songInfo={songInfo}
      songs={songs}
      setSongs={setSongs}
      setSongInfo={setSongInfo}
      />
      <Library libraryStatus={libraryStatus} songs={songs} setCurrentSong={setCurrentSong} refAudio={refAudio} isPlaying={isPlaying} setSongs={setSongs}/>

      <audio
            src={currentSong.audio}
            ref={refAudio} 
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            onEnded={songEndHandler}>
            
      </audio>

    </div>
  );
}

export default App;
