import React, { useState, useEffect } from 'react';
import "./index.css";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    return (
        <div className="stopwatch">
            <h1>Stopwatch</h1>
            <div className="time">
                <span>{("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                <span>{("0" + (time % 60)).slice(-2)}</span>
            </div>
            <div className="buttons">
                {!isActive && time === 0 && (
                    <button onClick={handleStart}>Start</button>
                )}
                {isActive && !isPaused && (
                    <button onClick={handlePause}>Pause</button>
                )}
                {isActive && isPaused && (
                    <button onClick={handlePause}>Resume</button>
                )}
                {isActive && (
                    <button onClick={handleReset}>Reset</button>
                )}
            </div>
        </div>
    );
};

export default Stopwatch;

