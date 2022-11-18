import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Info = () => {
    const [topgames, setTopGames] = useState(null);
    const [allgames, setAllGames] = useState(null);
    const [selectedGame, setSelectedGame] = useState({
        appid: '',
        concurrent_in_game: '',
        name: '',
        peak_in_game: '',
        rank: ''
    })
    const [gameSelected, setGameSelected] = useState(false)


    useEffect(() => {
        // axios call here
        axios("http://localhost:8000/getTop100")
            .then(res => setTopGames(res.data.response.ranks))
            .catch(err => console.log(err));
        axios("http://localhost:8000/getAllGames")
            .then(res => setAllGames(res.data.applist.apps.app))
            .catch(err => console.error(err));
        axios.get(`https://api.twitch.tv/helix/search/channels?query=just%20chatting&live_only=true`, {
            headers: {
                'Authorization': 'Bearer 5mbkwxc8pn51auic3lhklmoli0iyy0',
                'Client-Id': '4a1zik3w9q51rqcwa9hjxyzp10lun8',
            }
        })
            .then(res => console.log(res.data.data))
            .catch(err => console.error(err));
    }, [])

    topgames?.map(object => object["name"] = allgames?.filter(obj => {
        return obj.appid === object.appid
    }).map(obj => obj.name)[0])


    let top10 = []

    for (let i = 0; i < 10; i++) {
        if (topgames) {
            top10.push(topgames[i])
        }
    }


    if (top10.length > 0 && top10[0].name) {
        let stringName = top10[0].name
        stringName += "_"
        let stringFormat = stringName.replace(/[^a-z^0-9^.]/gi, "%20").toLowerCase()
        console.log(stringFormat)
        stringFormat = stringFormat.replace(/[0-9]\.[0-9]/gi,"")
        const url = `https://api.twitch.tv/helix/search/channels?query=${stringFormat}&live_only=true`
        console.log(url)
    }


    const handleClick = (event, i) => {
        setSelectedGame({
            appid: top10[i].appid,
            concurrent_in_game: top10[i].concurrent_in_game,
            name: top10[i].name,
            peak_in_game: top10[i].peak_in_game,
            rank: top10[i].rank
        })
        setGameSelected(true)
    };

    const handleHide = () => {
        setGameSelected(false)
    }

    return (
        <div className='box-container'>

            {
                (gameSelected === true)
                    ? <div className='game-info-container'>
                        <h1 className='game-title'>{selectedGame.name}</h1>
                        <div>
                            <p><strong>Rank:</strong> {selectedGame.rank}</p>
                            <p><strong>Current Active Players:</strong> {selectedGame.concurrent_in_game}</p>
                            <p><strong>Peak Daily Active Players:</strong> {selectedGame.peak_in_game}</p>
                        </div>
                        <h2 className='twitch-header'>Live Twitch Streams</h2>
                        <div className='thumbnail-container'>
                            <div className='img-01'></div>
                            <div className='img-01'></div>
                            <div className='img-01'></div>
                        </div>
                        <button className='close-button' onClick={handleHide}>✖</button>
                    </div>
                    : <></>
            }
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
                        <div key={i} className="box text-center" onClick={(event) => handleClick(event, i)} style={{ color: `rgb(255,255,255)`, width: "1000px", height: 0.00050 * game.concurrent_in_game, fontSize: 0.00015 * game.concurrent_in_game, backgroundColor: `rgb(0,${15 * game.rank},${30 * game.rank})` }}></div>
                    )
                })
            }
        </div>
    )
}

export default Info