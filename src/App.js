import { Component, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoadingBar from "react-top-loading-bar";
import News from './components/News';






const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)


  return (

    <Router>
      <Navbar />

      <LoadingBar
        color="#f11946"
        progress={progress}
      />

      <Routes>


        <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgress} key={"sports"} category="sports" />} />
        <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key={"business"} category="business" />} />
        <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key={"entertainment"} category="entertainment" />} />
        <Route exact path='/general' element={<News apiKey={apiKey} setProgress={setProgress} key={"general"} category="general" />} />
        <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key={"health"} category="health" />} />
        <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key={"science"} category="science" />} />
        <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key={"sports"} category="sports" />} />
        <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key={"technology"} category="technology" />} />



      </Routes>
    </Router>
  )
}

export default App;


