import React from 'react'
// import logo from './logo.svg';
import './App.css'
import Row from './components/Row.js'
import requests from './requests.js'
import Banner from './components/Banner.js'
import Nav from './components/Nav.js'

function App() {
    return (
        <div className="App">
            <Nav />
            <Banner fetchUrl={requests.fetchNetflixOriginals} />
            <Row
                title="Netflix originals"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Trending now" fetchUrl={requests.fetchTrending} />
            <Row title="Top rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Docos" fetchUrl={requests.fetchDocumentaries} />
        </div>
    )
}

export default App
