import React, {useRef, useState, useEffect} from "react";
import { Swipeable } from 'react-swipeable';

import {getVerse} from "../functions";

import randomColor from "random-color";

import "../style/main.scss";

import getDayOfYear from "date-fns/getDayOfYear";

const Main = () => {
    const [verse, setVerse] = useState(null);
    const [ref, setRef] = useState(null);

    const [index, setIndex] = useState(getDayOfYear(new Date()));

    const theme = useRef({
        dark: randomColor(0.30, 0.25).hexString(),
        light: randomColor(0.30, 0.95).hexString()
    });

    const handlePrev = () => {
        if(index > 0) setIndex(index - 1);
    }

    const handleNext = () => {
        if(index < 364) setIndex(index + 1);
    }

    useEffect(() => {
        (async function() {
            const text = await getVerse(index);
            const split = text.lastIndexOf(". ");

            let verse = text.slice(0, split + 1);
            let ref = text.slice(split + 2, -1);

            setVerse(verse);
            setRef(ref);
        })();
    }, [index]);

    return (
        <main style={{color: theme.current.dark}}>
            <Swipeable 
                onSwipedLeft={handleNext} 
                onSwipedRight={handlePrev}>
                <div className="container" style={{backgroundColor: theme.current.light}}>
                    <p className="arrow" onClick={handlePrev}>&lsaquo;</p>
                    <p className="count">{index + 1}/365</p>
                    <div className="verse-wrapper">
                        <p className="verse">
                            {verse}
                        </p>
                        <p className="ref">
                            {ref}
                        </p>
                    </div>
                    <p className="arrow" onClick={handleNext}>&rsaquo;</p>
                </div>
            </Swipeable>
        </main>
    )
}

export default Main;