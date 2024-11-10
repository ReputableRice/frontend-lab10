import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Country from './components/Country'

function App() {
  const DATA_URL = "https://restcountries.com/v3.1/all"
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = ([])
  const [staticData, setStaticData] = useState([]) //For Select Menu
  //Regions
  const [region, setRegion] = useState('')
  const [subregion, setSubregion] = useState('')
  // Alphabet Filter
  const [alphaCheck, setAlphaCheck] = useState(false)
  // Top Ten Filters
  const [populationCheck, setPopulationCheck] = useState(false)
  const [areaCheck, setAreaCheck] = useState(false)


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [alphaCheck, populationCheck, areaCheck, region, subregion]);


  async function fetchData() {
    try {
      const response = await fetch(DATA_URL)
      const countries = await response.json()
      setData(countries)
      setStaticData(countries)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  function applyFilters() {
    let filteredCountries = [...staticData]

    if (region && region !== "All") {
      filteredCountries = filteredCountries.filter(country => country.region === region)
    }

    if (subregion && subregion !== "Choose region") {
      filteredCountries = filteredCountries.filter(country => country.subregion === subregion);
    }

    if (alphaCheck) {
      filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    }

    if (populationCheck) {
      filteredCountries = filteredCountries.sort((a, b) => b.population - a.population).slice(0, 10)
    } else if (areaCheck) {
      filteredCountries = filteredCountries.sort((a, b) => b.area - a.area).slice(0, 10)
    }

    setData(filteredCountries)
  }

  // https://stackoverflow.com/questions/35976167/find-unique-values-from-an-array-in-react-js
  const uniqueRegions = Array.from(new Set(staticData.map((country) => country.region)))

  const uniqueSubregions = Array.from(new Set(staticData.map((country) => country.subregion).filter((subregion) => subregion && subregion.length > 0)))

  return (
    <div className='home'>
      <h1 className='m-auto font-black text-5xl'>Countries of the World</h1>
      <div className='m-auto flex flex-col items-center mt-6'>
        <div>Filters & Sorting</div>
        <div className='m-auto flex mb-6'>
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
                onChange={() => {
                  setPopulationCheck(!populationCheck);
                  setAreaCheck(false)
                }}
                checked={populationCheck}
              />
              <p>By Population</p>
            </div>

            <div className='flex space-x-6'>
              <input
                type="checkbox"
                onChange={() => {
                  setAreaCheck(!areaCheck);
                  setPopulationCheck(false)
                }}
                checked={areaCheck}
              />
              <p>By Area</p>
            </div>
          </div>

          <div className='border-2 border-black p-3 '>
            <p>By Continent</p>
            <select
              name="regions"
              className='drop-shadow-lg border-neutral-700 border-2'
              value={region}
              onChange={e => {
                setRegion(e.target.value)
                setSubregion("Choose region")
              }}>
              <option value="All">All</option>
              {uniqueRegions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className='border-2 border-black p-3'>
            <p>By Subregion</p>
            <select
              name="subregions"
              className='drop-shadow-lg border-neutral-700 border-2'
              value={subregion}
              onChange={(e) => {
                setSubregion(e.target.value)
                setRegion("All")
              }}>
              <option>Choose region</option>
              {uniqueSubregions.map((subregion, index) => (
                <option key={index} value={subregion}>
                  {subregion}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='countryContent'>
        <Country data={data} />
      </div>
    </div>
  )
}

export default App
