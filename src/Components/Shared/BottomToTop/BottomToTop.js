import React, { useEffect, useState } from 'react'
import './BottomToTop.css'
import { FaArrowUp } from "react-icons/fa";

const BottomToTop = () => {

    const [isVisible, setVisible] = useState(false);

    const goToBtn = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    const listenToScroll = () => {
        let heightScroll = 250; // apko kb ussy display krana woh value
        const windowScroll =
            (document.body.scrollTop || document.documentElement.scrollTop); // ap kitna scroll krchuky woh btaega
        if (windowScroll > heightScroll) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    // yeh bar bar check krrha hy ap web py kitna scroll kya ho 
    useEffect(() => {
        window.addEventListener('scroll', listenToScroll) // yh listen krega 
        return () => window.removeEventListener('scroll', listenToScroll) // yhn py forn apki app sy scroll data dlt krdega issy load nh brhga apki app py warna bar bar scroll ky data load pr ky hang hoskta
    }, [])

    // useEffect offers the use of return function, which is used for cleanup function purpose

    return (
        <>
            <section className='bottom-btn-section'>
                {isVisible && (
                    <div className='top-btn' onClick={goToBtn}>  {/* jb bh koe click krega to yeh execute hoga function */}
                        <FaArrowUp className='top-btn--icon' />
                    </div>
                )}
            </section>
        </>
    )
}

export default BottomToTop