import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1> {props.header} </h1>
    </div>
  )
}

const Average = (props) => {
  const clicks = props.clicks
  if (clicks.all !== 0) {
    return ((clicks.good * 1 + clicks.bad * -1) / clicks.all)
  }
  return (0);
}

const Positive = (props) => {
  const good = props.clicks.good
  const all = props.clicks.all
  if (all !== 0) {
    const positives = `${(good / all) * 100} %`
    return (positives)
  } else {
    return ('0 %');
  }
}

const StatisticsLine = ({ text, value }) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Statistics = (props) => {
  const clicks = props.clicks
  if (clicks.all !== 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={clicks.good} />
          <StatisticsLine text='neutral' value={clicks.neutral} />
          <StatisticsLine text='bad' value={clicks.bad} />
          <StatisticsLine text='all' value={clicks.all} />
          <StatisticsLine text='average' value={<Average clicks={clicks} />} />
          <StatisticsLine text='positive' value={<Positive clicks={clicks} />} />
        </tbody>
      </table>
    )
  } else {
    return 'No feedback given'
  }
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, all: 0
  })
  const header1 = 'give feedback'
  const header2 = 'statistics'

  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      all: clicks.all + 1,
      good: clicks.good + 1
    }
    setClicks(newClicks)
  }

  const handleNeutralClick = () => {
    const newClicks = {
      ...clicks,
      all: clicks.all + 1,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks)
  }

  const handleBadClick = () => {
    const newClicks = {
      ...clicks,
      all: clicks.all + 1,
      bad: clicks.bad + 1
    }
    setClicks(newClicks)
  }

  return (
    <div>
      <Header header={header1} />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header header={header2} />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App;
