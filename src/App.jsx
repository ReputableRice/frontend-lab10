import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const DATA_URL = "https://restcountries.com/v3.1/all"
  const [data, setData] = useState([])

  useEffect(() => {

  })

  async function fetchData() {
    try {
      const response = await fetch(DATA_URL);
      console.log(response);
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
      console.log("error message")
      setErrorDisplay(<p>Error Message!</p>)
    }
  }

  return (
    <div className='home'>
      <div className='m-auto'>
        <h1 className='font-black text-5xl'>Countries of the World</h1>
        <div className='flex mt-6 mb-6'>
          <div className='border-2 border-black m p-3 flex items-center space-x-3'>
            <input type='checkbox' />
            <p>Alpha</p>
          </div>

          <div className='border-2 border-black m p-3 flex flex-col space-x-3'>
            <p>Top 10</p>
            <div className='flex space-x-6'>
              <input type='checkbox' />
              <p>By Population</p>
            </div>

            <div className='flex space-x-6'>
              <input type='checkbox' />
              <p>By Area</p>
            </div>
          </div>

          <div className='border-2 border-black p-3 '>
            <p>By Continent</p>
            <select name="subregions">
              <option value="test">test</option>
            </select>
          </div>

          <div className='border-2 border-black p-3'>
            <p>By Subregion</p>
            <select name="subregions">
              <option value="test">test</option>
            </select>
          </div>
        </div>
        <button onClick={() => fetchData()}>Fetch Locations</button>
        <div>{data.name}</div>
        {data.length > 0 ? (
          data.map((country, index) => (
            <div key={index}>{country.name.common}</div>
          ))
        ) : (
          <div>loading</div>
        )}
      </div>

    </div>
  )
}

export default App


/*

"use client"
//API Page Declaration
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const DATA_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5";
    const [data, setData] = useState(null);
    const [errorDisplay, setErrorDisplay] = useState(null)

    async function fetchData() {
        try {
            const response = await fetch(DATA_URL);
            console.log(response);
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log(error)
            console.log("error message")
            setErrorDisplay(<p>Error Message!</p>)
        }
        //add try catch function here
    }

    const DisplayMedia = () => {
        if (data) {

            const mediaList = [];
            data.forEach((media, index) => {



                mediaList.push(
                    <li key={index} className="w-3/4 m-auto">
                        <img className="rounded-lg m-auto mb-5 mt-10" src={media.url} />
                        <h2 className="font-bold">{media.title}</h2>
                        <p>{media.date}</p>
                        <p>{media.explanation}</p>
                    </li>
                )
            });

            return (
                <div className="">
                    <ul >
                        {mediaList}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="border-4 border-black p-4 mb-4">
                    <ul >
                        Nothing
                    </ul>
                </div>
            )
        }
    }

    return (
        <div className="p-4 w-11/12 m-auto">
            <header className="border-4 border-black p-4 mb-4 bg-yellow-300">
                <h1>Welcome to my Images Page</h1>
                <button
                    className="border-neutral-200 bg-white bh-black px-6 rounded-md"
                    onClick={() => fetchData()}
                >Fetch Images</button>
            </header>
            Welcome to my API Page
            <DisplayMedia />
            {errorDisplay}
        </div>
    );
}

*/