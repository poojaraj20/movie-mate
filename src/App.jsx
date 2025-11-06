
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddMovies from './pages/AddMovies'
import MovieDetails from './pages/MovieDetails'
import Edit from './pages/Edit'




function App() {


  return (
    <>
<Routes>
 <Route path="" element={<Home />} />
  <Route path="addmovies" element={<AddMovies />} />
   <Route path="/movie/:id" element={<MovieDetails />} />
   <Route path="/edit/:id" element={<Edit />} />
</Routes>
    </>
  )
}

export default App
