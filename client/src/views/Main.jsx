import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Info from '../components/Info'

const Main = () => {
    const [allgamecount, setAllGameCount] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredContent, setHoveredContent] = useState({
        name:"",
        concurrent_in_game:"",
        rank:""
    })
    const [top10main, setTop10Main] = useState([])

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        // axios call here
        axios("http://localhost:8000/getAllGames")
            .then(res => {
                setAllGameCount(res.data.applist.apps.app.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                setLoaded(true)
            })
            .catch(err => console.error(err))
    }, [])

    const handleHoverOn = (event, i) => {
        setIsHovered(true)
        if(isHovered){
            setHoveredContent({
                name:top10main[i].name,
                concurrent_in_game:top10main[i].concurrent_in_game,
                rank:top10main[i].rank
            })
            let hoverInfo = document.getElementById('hovered-content');
            const onMouseMove = (e) =>{
            hoverInfo.style.left = e.pageX + 'px';
            hoverInfo.style.top = e.pageY + -150 +'px';
            }
            document.addEventListener('mousemove', onMouseMove);
        }
    }
    const handleHoverOff = (event, i) => {
        setIsHovered(false)
    }

    return (
        <div style={{ background: "rgb(20,20,20)" }} className="test">
            {
                (loaded)
                ?<div>
                    <div className='glow'></div>
                    <Info handleHoverOn={handleHoverOn} handleHoverOff={handleHoverOff} top10main={top10main} setTop10Main={setTop10Main}/>
                    <p className='text-center all-games'>Current Number of Games Available: {allgamecount}</p>
                </div>
                :<p className='text-center text-light'></p>
            }
            {
                (isHovered===true&&top10main.length > 1)
                ?<div className='hovered-content' id='hovered-content'>
                    <div className='content text-center'>
                        <p><strong>{hoveredContent.name}</strong></p>
                        <p><strong>Active Players:</strong> {hoveredContent.concurrent_in_game.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                    <p>Click for more info.</p>
                </div>
                :<></>
            }
        </div>
    )
}

export default Main