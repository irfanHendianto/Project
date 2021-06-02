import React, { useState, createContext } from "react";

export const ComponentContext = createContext();

export const ComponentProvider = props => {
  const tempMovie = {
    id:null,
    description:'',
    duration: 0,
    genre: '',
    rating: 0,
    review: '',
    title: '',
    year: 0,
    image_url:''
  }

  const tempGame ={
    id:null,
    name: '',
    genre:'',
    singlePlayer: '',
    multiplayer: '',
    platform: '',
    release:0,
    image_url:''
  }
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const currentMovie = JSON.parse(localStorage.getItem("movie"))
  const currentGame = JSON.parse(localStorage.getItem("game"))
  const currentLocation = localStorage.getItem("location")
  const currentLocationSub = localStorage.getItem("locationSub")
  const iniateUser = currentUser ? currentUser : null
  const iniateMovie = currentMovie ? currentMovie : tempMovie
  const iniateGame = currentMovie ? currentGame : tempGame
  const iniateLocation = currentLocation ? currentLocation : ""
  const iniateLocationSub = currentLocationSub ? currentLocationSub : ""
  const [user, setUser] = useState(iniateUser);
  const [globaMovie, setGlobalMovie] = useState(iniateMovie)
  const [globalGames, setGlobalGames] = useState(iniateGame)
  const [locationMenu, setLocationMenu] = useState(iniateLocation)
  const [locationMenuSub, setLocationMenuSub] = useState(iniateLocationSub)

  return (
    <ComponentContext.Provider value={{user, setUser, globaMovie, setGlobalMovie,globalGames, setGlobalGames,locationMenu, setLocationMenu,locationMenuSub, setLocationMenuSub}}>
      {props.children}
    </ComponentContext.Provider>
  );
};