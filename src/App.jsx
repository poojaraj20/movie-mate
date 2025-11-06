
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddMovies from './pages/AddMovies'


function App() {


  return (
    <>
<Routes>
 <Route path="" element={<Home />} />
  <Route path="addmovies" element={<AddMovies />} />
</Routes>
    </>
  )
}

export default App
