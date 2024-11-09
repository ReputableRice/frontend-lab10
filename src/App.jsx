import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Country from './components/Country'

function App() {
  const DATA_URL = "https://restcountries.com/v3.1/all"
  const [data, setData] = useState([])
  //Regions
  const [region, setRegion] = useState('')
  const [subregion, setSubregion] = useState('')
  // Alphabet Filter
  const [alphaCheck, setAlphaCheck] = useState(false)
  // Top Ten Filters
  const [populationCheck, setPopulationCheck] = useState(false)
  const [areaCheck, setAreaCheck] = useState(false)

  useEffect((() => {
    fetchData()
  }), []);

  useEffect(() => {
    toggleAlpha()
  }, [alphaCheck])

  useEffect(() => {
    topTenFilter()
  }, [populationCheck, areaCheck])

  async function fetchData() {
    try {
      const response = await fetch(DATA_URL);
      console.log(response);
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
      console.log("error message")
    }
  }

  function toggleAlpha() {
    if (alphaCheck) {
      const alphaCountries = [...data]
      alphaCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))
      // sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      setData(alphaCountries)
    } else {
      fetchData()
    }
  }

  function topTenFilter(category) {
    let sortingCountries = [...data]

    switch (category) {
      case "all":
        setData(data);
        break;
      case "population":
        setAreaCheck(false)
        break; 
      case "area":
        setPopulationCheck(false)
        break;
    }
  }

  function handleContinent(e) {
    e.preventDefault()
  }

  // https://stackoverflow.com/questions/35976167/find-unique-values-from-an-array-in-react-js
  const uniqueRegions = Array.from(new Set(data.map((country) => country.region)));

  const uniqueSubregions = Array.from(new Set(data.map((country) => country.subregion)));


  return (
    <div className='home'>
      <span>
      </span>
      <h1 className='m-auto font-black text-5xl'>Countries of the World</h1>
      <div className='m-auto flex mt-6 mb-6'>
        <div className='border-2 border-black m p-3 flex items-center space-x-3'>
          <input
            type='checkbox'
            onChange={() => 
              setAlphaCheck(!alphaCheck)}
            checked={alphaCheck}
          />
          <p>Alpha</p>
        </div>

        <div className='border-2 border-black m p-3 flex flex-col space-x-3'>
          <p>Top 10</p>
          <div className='flex space-x-6'>
            <input
              type='checkbox'
              onChange={() => topTenFilter("population")}
              checked={populationCheck}
            />
            <p>By Population</p>
          </div>

          <div className='flex space-x-6'>
            <input 
            type='checkbox'
            onChange={() => topTenFilter("area")}
            checked={areaCheck}
            />
            <p>By Area</p>
          </div>
        </div>

        <div className='border-2 border-black p-3 '>
          <p>By Continent</p>
          <select name="regions" className='drop-shadow-lg border-neutral-700 border-2' onChange={e => setRegion(e.target.value)}>
            <option> All </option>
            {uniqueRegions.length ? (
              uniqueRegions.map((region, index) => (
                <option key={index} className='options' value={region}>
                  {region}
                </option>
              ))
            ) : (
              <option>No regions available</option>
            )}
          </select>
        </div>

        <div className='border-2 border-black p-3'>
          <p>By Subregion</p>
          <select name="subregions" className='drop-shadow-lg border-neutral-700 border-2' onChange={e => setSubregion(e.target.value)}>
            <option> Choose region </option>
            {uniqueSubregions.length ? (
              uniqueSubregions.map((subregion, index) => (
                <option key={index} className='' value={subregion}>
                  {subregion}
                </option>
              ))
            ) : (
              <option>No regions available</option>
            )}
          </select>
        </div>
      </div>

      <div className='countryContent'>
        <Country data={data} />
      </div>
    </div>
  )
}

export default App
