import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {CreateSpot} from "../../store/spotsReducer"
import {getAllSpots} from '../../store/spotsReducer'

function SpotForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLatitude] = useState('')
  const [lng, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [url, setImageUrl] = useState('')
  const[preview, setPreview] = useState(false)
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
        if (!url) errors.push("Please provide a image");


    setValidationErrors(errors)

  }, [name, address, city, state, country, lat, lng, description, price, url])

const submitHandler = async (e) => {
  e.preventDefault()

  const payload = {
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

const imagePayload = {
  url,
  preview
}

let createdSpot;

createdSpot = dispatch(CreateSpot(payload, imagePayload))
// console.log("THIS IS OUR CREATED SPOT", createdSpot)
//WHY IS HISTORY NOT WORKING
  history.push("/")
  // history.push(`/api/spots/${createdSpot.id}`)
}
//return spot from teh THUNK



  return (
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <h2>Create a Spot</h2>
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
      <label>
      Url
        <input
          type="text"
          name="url"
          onChange={(e)=> setImageUrl(e.target.value)}
          value={url}
        />
      </label>
      <label>
      Set Preview for your Spot?
        <input
          type="checkbox"
          name="preview"
          onChange={(e)=> setPreview(!preview)}
          value={preview}
        />
      </label>
      <button
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          disabled={!!validationErrors.length}
      >
        Create Spot
      </button>
    </form>
  );
}

export default SpotForm;
