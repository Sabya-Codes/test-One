import { useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'

import { Dropdown } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
  
<Dropdown />
   
  )
}

export default App
