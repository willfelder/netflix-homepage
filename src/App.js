import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/index';
import FeaturedMovie from './components/FeaturedMovie/index';
import Header from './components/Header/index';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect (() => {
  
    const loadAll = async () => {
       
      // Taking the total list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Taking the featured 
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    loadAll();
  }, []);


  // This useEffect is to appear the navbar when scroll the page
  
  useEffect(() => {
    const scrowListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrowListener);

    return () => {
      window.removeEventListener('scroll', scrowListener);
    }

  }, []);

  return (
    
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
      <FeaturedMovie item={featuredData} />
      }


       <section className="lists">
         {movieList.map((item, key) => (
           <MovieRow key={key} title={item.title} items={item.items} />
         ))}
       </section>

       <footer>
         This Project was create for purposes of studying, all rights reserved by Netflix&copy;<br />
         All data movies were taken from Themoviedb.org
       </footer>

       {movieList.length <= 0 &&
          <div className="loading">
             <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Loading" />
          </div>
       }

    </div>
  );
}