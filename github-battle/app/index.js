import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'

// Component
// State
// Lifecycle
// UI

// How to DEFINE component
class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Popular />
            </div>
        )  // JSX - Babel compiles into regular JS
        // Regular JS looks like:
            // return React createElement(
            //     "div",
            //     null,
            //     "Hello World!"
            // )
    }
}

// How to USE component
ReactDOM.render(
    // 1. React Element
    // 2. Where to render the Element to 
    <App />,
    document.getElementById('app')
)