import React, { Component } from 'react';
class BestScore extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        let storage = window.localStorage;
        let bestScore = storage.getItem('bestScore');
        if (!bestScore) {
            storage.setItem('bestScore',0);
        }
        console.log('bestScore' + bestScore);
        this.state = {
            bestScore : bestScore
        }
    }

    componentDidUpdate =(prevProps) => {
        if (this.props.currentScore > prevProps.currentScore) {
            let storage = window.localStorage;
            storage.setItem('bestScore',this.props.currentScore)
            this.setState(()=> {
                return ({
                    bestScore : this.props.currentScore
                })
            })
        }
    }

    render() {
        return (
            <span> Best Score {this.state.bestScore}</span>
        );
    }

}

export default BestScore;