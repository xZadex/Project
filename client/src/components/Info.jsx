import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Info = () => {
    const [topgames, setTopGames] = useState(null);
    const [allgames, setAllGames] = useState(null);

    useEffect(() => {
        // axios call here
        axios("http://localhost:8000/getTop100")
            .then(res => setTopGames(res.data.response.ranks))
            .catch(err => console.log(err));
        axios("http://localhost:8000/getAllGames")
            .then(res => setAllGames(res.data.applist.apps.app))
            .catch(err => console.error(err))
    }, [])

    topgames?.map(object => object["name"] = allgames?.filter(obj => {
        return obj.appid === object.appid
    }).map(obj => obj.name)[0])

    console.log(topgames);


    let top10 = []

    for (let i = 0; i < 10; i++) {
        if (topgames) {
            top10.push(topgames[i])
        }
    }

    return (
        <div className='box-container'>
            <div className='logo-container'>
            <svg id="steam-logo" width="794" height="555" viewBox="0 0 794 555" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="627.735" cy="166.089" r="80.1339" fill="white" />
                <circle cx="627.274" cy="166.549" r="133.755" stroke="white" strokeWidth="65" />
                <circle cx="357.398" cy="435.504" r="101.28" stroke="white" strokeWidth="36" />
                <path d="M364.867 316.61L461.497 174.363L618.985 331.883L475.402 434.963L364.867 316.61Z" fill="white" />
                <path d="M416.881 462.131C402.775 495.932 362.635 511.353 327.226 496.575C291.818 481.797 274.55 442.417 288.656 408.616C302.763 374.816 342.903 359.395 378.312 374.172C413.72 388.95 430.988 428.331 416.881 462.131Z" fill="white" />
                <path d="M-3.69197 214.742L378.312 374.172L327.226 496.575L-54.7772 337.145L-3.69197 214.742Z" fill="white" />
            </svg>
            </div>
            {
                top10?.map((game, i) => {
                    return (
                        <div key={i} className="box text-center" style={{ color: `rgb(255,255,255)`,width: "1000px", height: 0.00050 * game.concurrent_in_game, fontSize: 0.00015 * game.concurrent_in_game, backgroundColor: `rgb(0,${15 * game.rank},${30 * game.rank})` }}></div>
                    )
                })
            }
        </div>
    )
}

export default Info