import { useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'

import  Chatbot  from './components/ChatBot/ChatBot.jsx'

function App() {
  const [count, setCount] = useState(0)

return <Chatbot/>
}

export default App
