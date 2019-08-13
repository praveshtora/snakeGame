import React, { useState, useEffect } from 'react';
const BestScore = (props) => {
    let storage = window.localStorage;
    let bestScoreLocal = storage.getItem('bestScore');
    if (!bestScoreLocal) {
        storage.setItem('bestScore', 0);
        bestScoreLocal = 0;
    }
    const [bestScore, setBestScore] = useState(bestScoreLocal);

    useEffect(() => {
        let storage = window.localStorage;
        let bestScore = storage.getItem('bestScore');
        if (props.currentScore > bestScore) {
            let storage = window.localStorage;
            storage.setItem('bestScore', props.currentScore)
            setBestScore(props.currentScore);
        }
    })

    return (
        <span> Best Score {bestScore}</span>
    );

}

export default BestScore;