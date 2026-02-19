import { useState, useEffect } from 'react' 
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(() => { 
    axios .get('https://studies.cs.helsinki.fi/restcountries/api/all') 
    .then(response => { 
      setCountries(response.data) 
    }) 
  }, [])






  return (
    <div>
      find countries <input/>
    </div>
  )
}

export default App