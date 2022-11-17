import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Info from '../components/Info'
const Main = () => {
    const [allgamecount, setAllGameCount] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // axios call here
        axios("http://localhost:8000/getAllGames")
            .then(res => {
                setAllGameCount(res.data.applist.apps.app.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                setLoaded(true)
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <div style={{ background: "rgb(20,20,20)" }}>
            {
                (loaded)
                ?<div>
                    <div className='glow'></div>
                    <Info />
                    <p className='text-center all-games'>Current Number of Games Available: {allgamecount}</p>
                </div>
                :<p className='text-center text-light'></p>
            }
        </div>
    )
}

export default Main