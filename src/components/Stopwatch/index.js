import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  tick = () => {
    this.setState(prev => ({
      timeElapsedInSeconds: prev.timeElapsedInSeconds + 1,
    }))
  }

  onStartTimer = () => {
    this.timerId = setInterval(this.tick, 1000)
    this.setState({isTimerRunning: true})
  }

  onStopTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false})
  }

  onResetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
    })
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)

    if (minutes <= 9) {
      return `0${minutes}`
    }
    return minutes
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    if (seconds <= 9) {
      return `0${seconds}`
    }
    return seconds
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="app-con">
        <div className="stopwatch-con">
          <h1 className="title">Stopwatch</h1>
          <div className="card-con">
            <div className="timer-con">
              <img
                className="img-sty"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-sty">Timer</p>
            </div>
            <h1 className="display-time">{time}</h1>
            <div className="timer-buttons">
              <button
                type="button"
                className="start-button button"
                onClick={this.onStartTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-button button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
