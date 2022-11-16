import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Info = () => {
    useEffect(() => {
        // axios call here
        axios("http://localhost:8000/getList")
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <div className='container'>
            <div>Hello</div>
        </div>
    )
}

export default Info