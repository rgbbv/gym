import React from 'react'

export class Redirect extends React.Component {

    CheckRedirect = (props) => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Redirect;