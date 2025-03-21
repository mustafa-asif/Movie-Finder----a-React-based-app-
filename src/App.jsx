import React,{useState,useEffect} from 'react'
import {useDebounce } from 'react-use'
import Search from './Components/Search'
import Spinner from './Components/Spinner'
import Cards from './Components/Cards';

const API_BASE_URL='https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={ method:'GET',
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] =useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [debounceTerm,setDebounceTerm]=useState('');

  // debounce search term helps to prevent making apis calls on every key stroke
  // this will make the api call after the user has stopped typing for 500ms
  useDebounce( () => {
      setDebounceTerm(searchTerm);
    },
    700,
    [searchTerm]
  );

  const fetchMovies=async( query= '')=>{
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint= query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error('fetching movies failed');
      }
      const data = await response.json();
      console.log(data);
      if(data.response==='False'){
        setErrorMessage(data.Error || 'Something went wrong!');
        setMoviesList([]);
        return
      }
      setMoviesList(data.results) || [];
     
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('error fetching movies try again!!!');
      
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchMovies(debounceTerm);
  }
  ,[debounceTerm]);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2>all movies</h2>
          { isLoading ?(
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) :(
            <ul>
              {moviesList.map((movie) => (
               <Cards key={movie.id} movie={movie} />
              ))}
            </ul>
          )
            }
       
        </section>

     
      </div>
    </main>

  )
}

export default App
