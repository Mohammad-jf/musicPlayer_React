
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faAngleLeft,faAngleRight,faPause } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';








const Player = ({isPlaying,setIsPlaying,refAudio,songInfo,setSongInfo,songs,setSongs,currentSong,setCurrentSong}) => {
    //use effect
    useEffect(()=>{
        const newSongs= songs.map((song)=>{
            if(song.id === currentSong.id){
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
    setSongs(newSongs)

    },[currentSong])





// for playing music or pause it
const songPlayHandler =()=>{
    if(isPlaying){
        refAudio.current.pause();
        setIsPlaying(!isPlaying)
    }else{
        refAudio.current.play();
        setIsPlaying(!isPlaying);
    }
}



// for changing time format
const getTime=(time)=>{
return(
    Math.floor(time /60 ) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
   )
}



// for changing range
const dragHandler = (e)=>{
    // update the state time that is used for p tag
    setSongInfo({...songInfo,currentTime:e.target.value});
    // update actuall music time
    refAudio.current.currentTime = e.target.value;
}


 
const skipTrackHandler = async(direction)=>{
    let currentIndex = songs.findIndex((song)=>song.id ===currentSong.id);
    if(direction==='skip-forward'){
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
     if (direction==="skip-back"){
            if((currentIndex - 1) % songs.length === -1){
            setCurrentSong(songs[songs.length - 1]);
            return;
            }
           await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) refAudio.current.play();
}

//add styles
const trackAnim  = {
    transform: `translateX(${songInfo.animationPercentage}%)`
}

    return (
        <div className='player'>

            <div className="time-controll">
                <p>{songInfo.duration? getTime(songInfo.currentTime) : "00:00"}</p>

                <div className="track">
                <input 
                    min={0}
                    type="range"
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}/>
                    <div style={trackAnim} className="animate-track"></div>

                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
            </div>


            <div className="song-controlls">
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skip-back') } icon={faAngleLeft} size='2x'/>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size='3x' className='play' onClick={songPlayHandler}/>
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skip-forward') }  icon={faAngleRight} size='2x'/>
            </div>


        </div>
    )
}

export default Player
