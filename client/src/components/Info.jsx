import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Info = () => {
    useEffect(() => {
        // axios call here
        axios("http://localhost:8000/getTop100")
            .then(res => console.log(res))
            .catch(err => console.log(err));
        axios("http://localhost:8000/getAllGames")
            .then(res => console.log(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className='container'>
            <div>Hello</div>
        </div>
    )
}

export default Info