
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: new Date()}
    }
    render() {
        return (
            <React.Fragment>
                <h1>The time is {this.state.date.toLocaleTimeString()}.</h1>
            </React.Fragment>
        )
    }
}