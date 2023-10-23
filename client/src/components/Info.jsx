import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Info = ({ handleHoverOn, handleHoverOff, setTop10Main }) => {
    const [gameData, setGameData] = useState({
        topgames: null,
        allgames: null,
        selectedGame: {
            appid: '',
            concurrent_in_game: '',
            name: '',
            peak_in_game: '',
            rank: '',
            image: '',
        },
        gameSelected: false,
        twitchList: null,
    });
    const [onMobile, setOnMobile] = useState(window.innerWidth < 768);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const [topGamesResponse, allGamesResponse] = await Promise.all([
                    axios(`${process.env.REACT_APP_BACKEND}/getTop100`),
                    axios(`${process.env.REACT_APP_BACKEND}/getAllGames`),
                ]);

                const filteredTopGames = topGamesResponse.data.response.ranks.filter(list => list.appid !== 431960);

                // Map names to topgames
                const topgamesWithNames = filteredTopGames.map(topGame => {
                    const matchingGame = allGamesResponse.data.applist.apps.app.find(game => game.appid === topGame.appid);
                    return {
                        ...topGame,
                        name: matchingGame ? matchingGame.name : 'Unknown Game',
                    };
                });

                setGameData(prevGameData => ({
                    ...prevGameData,
                    topgames: topgamesWithNames.slice(0, 10),
                    allgames: allGamesResponse.data.applist.apps.app,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (event, i) => {
        // console.log(topgames);
        // Rest of the handleClick function



        let url = ""
        if (topgames.length > 0 && topgames[i].name) {
            let stringName = topgames[i].name
            stringName += "_"
            let stringFormat = stringName.replace(/[^a-z^0-9^.]/gi, "%20").toLowerCase()
            stringFormat = stringFormat.replace(/[0-9]\.[0-9]/gi, "")
            url = `https://api.twitch.tv/helix/search/channels?query=${stringFormat}&live_only=true`
        }

        axios.get(url, {
            headers: {
                'Authorization': `${process.env.REACT_APP_AUTH}`,
                'Client-Id': `${process.env.REACT_APP_CLIENT_ID}`,
            }
        })
            .then(res => {

                setGameData(prevGameData => ({
                    ...prevGameData,
                    twitchList: res.data.data
                }));
                // console.log(twitchList)
            })
            .catch(err => console.error(err))

        // Update state using functional update to avoid closure issues
        setGameData(prevGameData => ({
            ...prevGameData,
            selectedGame: {
                appid: topgames[i].appid,
                concurrent_in_game: topgames[i].concurrent_in_game,
                name: topgames[i].name,
                peak_in_game: topgames[i].peak_in_game,
                rank: topgames[i].rank,
                image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${topgames[i].appid}/header.jpg`,
            },
            gameSelected: true,
        }));
    };

    const handleHide = () => {
        setGameData(prevGameData => ({
            ...prevGameData,
            gameSelected: false,
        }));
    };

    const { topgames, selectedGame, gameSelected, twitchList } = gameData;
    return (
        <div className='box-container' id='box-container'>

            {
                (gameSelected === true)
                    ? <div className='game-info-container'>
                        <div className='game-image'
                            style={{
                                backgroundImage: `url(${selectedGame.image})`,
                                backgroundSize: '130% 97%',  // Adjust as needed
                                backgroundRepeat: 'no-repeat',  // Adjust as needed
                                backgroundPosition: 'center',
                                filter: `blur(5px)`,
                                position: 'absolute',
                                zIndex: '0',
                                height: '110%',
                                width: '100%',
                                opacity: 0.2
                            }}></div>
                        <div className='game-content' style={{ zIndex: '1000' }}>
                            <h1 className='game-title'>{selectedGame.name}</h1>
                            <div>
                                <p><strong>Rank:</strong> {selectedGame.rank}</p>
                                <p><strong>Current Active Players:</strong> {selectedGame.concurrent_in_game.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                <p><strong>Peak Daily Active Players:</strong> {selectedGame.peak_in_game.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                            </div>
                            <h2 className='twitch-header'>Streamers Live on Twitch</h2>
                            <div className='thumbnail-container'>
                                {
                                    (twitchList)
                                        ? <div className='link-list'>
                                            {
                                                (twitchList[0])
                                                    ? <a href={`https://www.twitch.tv/${twitchList[0].display_name}`} target="_blank" rel="noreferrer"><img className="thumbnail-image" src={twitchList[0].thumbnail_url} alt="" /></a>
                                                    : <div>No streamer at this moment...</div>
                                            }
                                            {
                                                (twitchList[1])
                                                    ? <a href={`https://www.twitch.tv/${twitchList[1].display_name}`} target="_blank" rel="noreferrer"><img className="thumbnail-image" src={twitchList[1].thumbnail_url} alt="" /></a>
                                                    : ""
                                            }
                                            {
                                                (twitchList[2])
                                                    ? <a href={`https://www.twitch.tv/${twitchList[2].display_name}`} target="_blank" rel="noreferrer"><img className="thumbnail-image" src={twitchList[2].thumbnail_url} alt="" /></a>
                                                    : ""
                                            }
                                        </div>
                                        : <></>
                                }
                            </div>
                            <button className='close-button' onClick={handleHide}>X</button>
                        </div>
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
                topgames?.map((game, i) => {
                    return (

                            (onMobile)?
                            <div key={i} className="box text-center" onClick={(event) => handleClick(event, i)} onMouseEnter={(event) => { handleHoverOn(event, i); setTop10Main(topgames) }} onMouseLeave={(event) => handleHoverOff(event, i)} style={{ color: `rgb(255,255,255)`, width: "1000px", height: 0.00019 * game.concurrent_in_game, fontSize: 0.00015 * game.concurrent_in_game, backgroundColor: `rgb(0,${15 * game.rank},${30 * game.rank})` }}></div>
                            :
                            <div key={i} className="box text-center" onClick={(event) => handleClick(event, i)} onMouseEnter={(event) => { handleHoverOn(event, i); setTop10Main(topgames) }} onMouseLeave={(event) => handleHoverOff(event, i)} style={{ color: `rgb(255,255,255)`, width: "1000px", height: 0.00060 * game.concurrent_in_game, fontSize: 0.00015 * game.concurrent_in_game, backgroundColor: `rgb(0,${15 * game.rank},${30 * game.rank})` }}></div>
                        )
                })
            }
        </div>
    )
}

export default Info