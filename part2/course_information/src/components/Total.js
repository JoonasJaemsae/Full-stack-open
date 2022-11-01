const Total = (props) => {
    const exercises = props.content.map(part => part.exercises)
    return (
        <p><b>total of {exercises.reduce((s, p) => s + p)} exercises</b></p>
    )
}

export default Total