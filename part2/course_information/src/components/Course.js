import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    return (
        <div>
            <Header header={props.name} />
            <Content content={props.parts} />
            <Total content={props.parts} />
        </div>
    )
}

export default Course