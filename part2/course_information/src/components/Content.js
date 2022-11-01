import Part from './Part'

const Content = (props) => {
    return (
        <div>
            {props.content.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

export default Content