import React from 'react'

function Header() {
    return (
        <header style={headerStyle}>
            <h1>TodoList</h1>
        </header>
    )
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const headerStyle = {
    background: '#555',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    borderWidth: '5px',
    borderStyle: 'dotted solid'
}

export default Header