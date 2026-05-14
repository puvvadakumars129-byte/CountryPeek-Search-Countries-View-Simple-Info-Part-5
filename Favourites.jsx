import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

function CountryCard({ country }) {
  const {
    name,
    flags,
    population,
    region,
    capital,
    cca3,
  } = country

  const { favourites, dispatch } = useFavourites()
  const isSaved = favourites.some((f) => f.cca3 === cca3)

  function handleFavouriteClick(e) {
    e.stopPropagation()
    if (isSaved) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: cca3 })
    } else {
      dispatch({ type: 'ADD_FAVOURITE', payload: country })
    }
  }

  return (
    <Link to={`/country/${cca3}`} className="card">
      <img
        src={flags?.svg || flags?.png}
        alt={`Flag of ${name?.common}`}
        className="card__flag"
      />
      <div className="card__body">
        <h2 className="card__name">{name?.common}</h2>
        <p><strong>Population:</strong> {population?.toLocaleString()}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Capital:</strong> {capital?.[0] ?? 'N/A'}</p>
        <button
          className={`fav-btn${isSaved ? ' fav-btn--saved' : ''}`}
          onClick={handleFavouriteClick}
          aria-label={isSaved ? `Remove ${name?.common} from favourites` : `Save ${name?.common} to favourites`}
        >
          {isSaved ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
    </Link>
  )
}

export default CountryCard
