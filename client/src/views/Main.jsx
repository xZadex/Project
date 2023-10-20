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

    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND}/getAllGames`)
            .then(res => {
                setAllGameCount(res.data.applist.apps.app.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
            })
            .catch(err => console.error(err))
        setTimeout(() => {
            setLoaded(true);
        }, 2000);
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
            hoverInfo.style.left = e.pageX + -100 +'px';
            hoverInfo.style.top = e.pageY + -200 +'px';
            }
            let steam_container = document.getElementById('box-container')
            steam_container.addEventListener('mousemove', onMouseMove);
        }
    }
    const handleHoverOff = (event, i) => {
        setIsHovered(false)
    }

    return (
        <div style={{ background: "rgb(20,20,20)" }} className="test">
            {
                (loaded)
                ?
                <div className={`loading-screen hidden`}></div>
                :
                <div className={`loading-screen`}></div>
            }

                <div>
                    <div className='glow'></div>
                    <Info handleHoverOn={handleHoverOn} handleHoverOff={handleHoverOff} top10main={top10main} setTop10Main={setTop10Main}/>
                    <p className='text-center all-games'>Current Number of Games Available: {allgamecount}</p>
                </div>

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