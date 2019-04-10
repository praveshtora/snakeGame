import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const board = [];
    for (let row =0; row <20;row++) {
      const cols =[];
      for (let col =0;col<20;col++) {
        cols.push({
          row,col
        });
      }
      board.push(cols);
    }
    this.state={
      board,
      food : {
        row : Math.floor(Math.random()*20),
        column :Math.floor(Math.random()*20)
      },
      snake : {
        head : {
          row : 10,
          col : 10
        },
        tail :[],
        speed : {
          x : 1,
          y : 0
        }
      }
    }
  }
  
  getRandomFood = ()=> {
    console.log("in random food function")
    const newFood = {
      row : Math.floor(Math.random()*20),
      column :Math.floor(Math.random()*20)
    }
    return newFood;
  }
  
  componentDidMount = () => {
    setTimeout(()=> {
      this.gameLoop()
    },800);
  }

  gameLoop = () => {
      this.setState(({snake,food}) => {
        const hasEatenFood = this.hasEatenFood();
        console.log(hasEatenFood);
        const nextState = {
          snake : {
            ...snake,
            head : {
              row : snake.head.row + snake.speed.y,
              col : snake.head.col + snake.speed.x
            },
            tail :[snake.head,...snake.tail]
            },
          food : hasEatenFood ? this.getRandomFood() : food
          };
          if (!hasEatenFood) nextState.snake.tail.pop();
          return nextState;
        },() =>{
          const { snake } = this.state;
          if (this.hitsEdge()) {
            this.setState({
              gameOver: true,
            });
            return;
          }
          setTimeout(()=> {
            this.gameLoop();
          },400)
        });
  }

  hitsEdge = () => {
    const { snake } = this.state;

    if (snake.head.col > 19
      || snake.head.col < 0
      || snake.head.row > 19
      || snake.head.row < 0) {
        return true;
      }
  }
  
  hasEatenFood = () => {
    const { food, snake } = this.state;
    return food.row === snake.head.row
      && food.column === snake.head.col;
  }
  
  isHead = (cell) => {
    const {snake} = this.state;
    return snake.head.row === cell.row &&
          snake.head.col === cell.col ;
  }
  
  isFood = (cell) => {
    const {food} = this.state;
    return food.row === cell.row &&
          food.column === cell.col ;
  }

  isTail = (cell) => {
    const { snake } = this.state;
    return snake.tail.find(inTail => inTail.row === cell.row && inTail.col === cell.col);
  }

  setDirection = (e) => {
    const {snake} = this.state
    if (e.keyCode === 38) { //upwards
      this.setState(({snake}) => {
        let newSnake = {
          snake : {
            ...snake,
            speed : {
              x : 0,
              y :-1
            }
          }
        }
        return newSnake;
      })
    } else if (e.keyCode === 40) { //downwards
      this.setState(({snake}) => {
        let newSnake = {
          snake : {
            ...snake,
            speed : {
              x : 0,
              y : 1
            }
          }
        }
        return newSnake;
      })
      } else if (e.keyCode === 39) { // rightwards
        this.setState(({snake}) => {
          let newSnake = {
            snake : {
              ...snake,
              speed : {
                x : 1,
                y : 0
              }
            }
          }
          return newSnake;
        })
      } else if (e.keyCode === 37) { //left
        this.setState(({snake}) => {
          let newSnake = {
            snake : {
              ...snake,
              speed : {
                x : -1,
                y : 0
              }
            }
          }
          return newSnake;
        })
      }
}

  render() {
    const {board,gameOver} = this.state;
    return (
      <div  className="App">
      {
        gameOver ? <h1>Game Over !!!</h1> :
      <section tabIndex="0" onKeyDown={this.setDirection} className='board'>
      {
        board.map((row,i) => (
          row.map( (cell) => {
            return (
            <div className={`cell 
            ${
              this.isHead(cell) ? 'head' :
              this.isFood(cell) ? 'food':
              this.isTail(cell) ? 'tail' :
              ''
            }`
            }>
          </div>
          )}
        ))
        )
      }
      </section>
      }
      </div>
    );
}
}

export default App;
