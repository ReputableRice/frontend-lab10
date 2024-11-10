export default function Country({ data }) {

    return (
        <>
            {data.length ? (
                data.map((country, index) => (
                    <div key={index} className='countries m-1'>
                        <div className='w-96'>
                            <div className='flex bg-gray-500 font-bold text-2xl h-16'>
                                <img src={country.flags.png} />
                                <div>{country.name.common}</div>
                            </div>
                            <div className='bg-white text-black h-64 p-2'>
                                <div><span className='font-bold'>Official Name:</span> {country.name.official}</div>
                                <div><span className='font-bold'>Capital:</span> {country.capital}</div>
                                <div><span className='font-bold'>Population:</span> {country.population}</div>
                                <div><span className='font-bold'>Currency:</span>
                                    {
                                        country.currencies
                                            ? Object.values(country.currencies).map((currency, i) =>
                                                <div key={i}>{currency.name} ({currency.symbol})</div>
                                            )
                                            : 'N/A'
                                    }
                                </div>
                                <div><span className='font-bold'>Area:</span> {country.area}</div>
                                <div><span className='font-bold'>Subregion:</span> {country.subregion}</div>
                                <div><span className='font-bold'>Continent:</span> {country.region}</div>
                                <a className='text-blue-600 font-bold' href={country.maps.googleMaps}>
                                    Show on Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>loading</div>
            )}
        </>
    )
}

