import React from 'react'
import { HashRouter, Route } from "react-router-dom"
import About from "./routes/About"
import Home  from "./routes/Home"
import Detail  from "./routes/Detail"
import Search  from "./routes/Search"
import Test  from "./routes/Test"
import Lotto  from "./routes/Lotto"
import Navigation from "./components/Navigation"
import "./App.css"


function App(){
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About}/>
      <Route path="/movie/:id" component={Detail}/>
      <Route path="/search" component={Search}/>
      <Route path="/test" component={Test}/>
      <Route path="/lotto" component={Lotto}/>
    </HashRouter>
  )
}

export default App