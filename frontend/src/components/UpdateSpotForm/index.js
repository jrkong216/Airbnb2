import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {CreateSpot} from "../../store/spotsReducer"
import {getAllSpots} from '../../store/spotsReducer'
import {UpdateSpot} from '../../store/spotsReducer'

function UpdateSpotForm() {
const { spotId } = useParams()
  const history = useHistory()
  const spotInfo = useSelector(state => state.spots[spotId])
  const dispatch = useDispatch();
  const [name, setName] = useState(spotInfo.name)
  const [address, setAddress] = useState(spotInfo.address)
  const [city, setCity] = useState(spotInfo.city)
  const [state, setState] = useState(spotInfo.state)
  const [country, setCountry] = useState(spotInfo.country)
  const [lat, setLatitude] = useState(spotInfo.lat)
  const [lng, setLongitude] = useState(spotInfo.lng)
  const [description, setDescription] = useState(spotInfo.description)
  const [price, setPrice] = useState(spotInfo.price)
  // const [url, setImageUrl] = useState('')

  const [validationErrors, setValidationErrors] = useState([])
 //GOING TO HAVE TO MAKE SOME SORT OF USER MUST BE LOGGED IN REFERRENCE

  useEffect(() => {
    dispatch(getAllSpots())
}, [dispatch])

// const allSpots = useSelector(state => state.spots)
// const allSpotsArray = Object.values(allSpots)
// console.log("this is allSpotsArray", allSpotsArray)
// const lastCreated = allSpotsArray.length
// console.log("Is this going to be integer 6", lastCreated)

useEffect(() => {
    const errors = []

    if (!name) errors.push("Please provide a name")
    if (!address) errors.push("Please provide an address");
    if (!city) errors.push("Please provide a city");
    if (!state) errors.push("Please provide a state")
    if (!country) errors.push("Please provide a country")
    if (lat < -90 || lat > 90) errors.push("Please provide a valid latitude between -90 to 90")
    if (lng < -180 || lng > 180) errors.push("Please provide a valid longitude between -180 to 180")
    if (!description) errors.push("Please provide a description")
    if (price < 0) errors.push("Please set price above 0");
    // if (!url) errors.push("Please provide a image");


setValidationErrors(errors)

}, [name, address, city, state, country, lat, lng, description, price])

const submitHandler = async (e) => {
  e.preventDefault()

  const payload = {
    id: spotId,
    name,
    address,
    city,
    state,
    country,
    lat,
    lng,
    price,
    description
}

let createdSpot;

createdSpot = dispatch(UpdateSpot(payload))

  history.push(`/spots/${spotId}`)

}

  return (
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <h2>Edit this Spot</h2>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <li key={error}>{error}</li>
        )}
      </ul>
      <label>
        Name
        <input
          type="text"
          name="name"
          onChange={(e)=> setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        Address
        <input
          type="text"
          name="address"
          onChange={(e)=> setAddress(e.target.value)}
          value={address}
        />
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          onChange={(e)=> setCity(e.target.value)}
          value={city}
        />
      </label>
      <label>
        State
        <input
          type="text"
          name="state"
          onChange={(e)=> setState(e.target.value)}
          value={state}
        />
      </label>
      <label>
        Country
        <input
          type="text"
          name="country"
          onChange={(e)=> setCountry(e.target.value)}
          value={country}
        />
      </label>
      <label>
      Latitude
        <input
          type="text"
          name="latitude"
          onChange={(e)=> setLatitude(e.target.value)}
          value={lat}
        />
      </label>
      <label>
      Longitude
        <input
          type="text"
          name="longitude"
          onChange={(e)=> setLongitude(e.target.value)}
          value={lng}
        />
      </label>
      <label>
      Description
        <input
          type="text"
          name="description"
          onChange={(e)=> setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label>
      Price
        <input
          type="text"
          name="price"
          onChange={(e)=> setPrice(e.target.value)}
          value={price}
        />
      </label>
      {/* <label>
      Url
        <input
          type="text"
          name="url"
          onChange={(e)=> setImageUrl(e.target.value)}
          value={url}
        />
      </label> */}
      <button
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        UPDATE SPOT
      </button>
    </form>
  );
}

export default UpdateSpotForm;
