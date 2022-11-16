import React, {useState} from 'react'
import { useEffect } from 'react'


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

    topgames?.map(object => object["name"] = allgames?.filter(obj=> {
        return obj.appid === object.appid
    }).map(obj => obj.name)[0])

    console.log(topgames);

    return (
        <div className='container'>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Info