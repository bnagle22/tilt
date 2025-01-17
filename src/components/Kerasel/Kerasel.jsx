import React from 'react';
import GameShow from './GameShow';
import * as rawgService from "../../services/rawgService"
import { useState } from 'react';
import { useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Kerasel = ({genre}) => {
  
  const [games, setGames] = useState([])
  

  useEffect(() => {
    const getGenre = async () => {
    const data = await rawgService.gamesGenre(genre)
    setGames(data.results)
    }
  getGenre()
}, [genre])


return (
  <div>
    <Carousel 
    responsive={responsive}
    ssr
    
    >
      {games.map((game) => (
        <GameShow 
        key={game.id} 
        game={game}/>
      ))}
    </Carousel>
  </div>
)
}

export default Kerasel 