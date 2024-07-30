import React, { useEffect, useState } from 'react';
import axios from "axios";


const VideoPlayer = () => {
    const [d, setd] = useState("https://jade-permanent-constrictor-490.mypinata.cloud/ipfs/QmWQ8zZDmEwNCG1mDEnsJY6T34RCoGhGzbhqLFLazt19YL")
    const [res, setRes] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log(1)
            const response = await axios.get(d);
            setRes(response.headers['content-type'])
            console.log(2)
            console.log(response.headers['content-type']);


        }
        fetchData()
    }, [])
    return (
        <>
            {res != "" ?
                <div>
                    {res == "video/mp4" ?
                        <video width="600" height={200} controls>
                            <source src={d} type="video/mp4" />
                            {/* <source src={d} type="image/jpeg" /> */}
                            Your browser does not support the video tag.
                        </video>
                        :
                        <img src={d} alt='img' />}
                </div>
                :
                <div className='text-2xl text-black'>Loading...</div>}
        </>
    );
}

export default VideoPlayer;