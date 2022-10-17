import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {getOneSpot} from '../../store/spotsReducer'
import {UpdateSpot} from '../../store/spotsReducer'
import "./UpdateSpotForm.css"

function UpdateSpotForm() {
const { spotId } = useParams()

  const history = useHistory()
  const dispatch = useDispatch();

  const spotInfo = useSelector(state => state.spots[spotId])

 const [name, setName] = useState("")
 const [address, setAddress] = useState("")
 const [city, setCity] = useState("")
 const [state, setState] = useState("")
 const [country, setCountry] = useState("")
 const [lat, setLatitude] = useState("")
 const [lng, setLongitude] = useState("")
 const [description, setDescription] = useState("")
 const [price, setPrice] = useState("")
 // const [url, setImageUrl] = useState(spotInfo.previewImage)
 const [validationErrors, setValidationErrors] = useState([])


useEffect(() => {
  dispatch(getOneSpot(spotId))
}, [dispatch])

useEffect(() => {
  setName(spotInfo && spotInfo.name)
  setAddress(spotInfo && spotInfo.address)
  setCity(spotInfo && spotInfo.city)
  setState(spotInfo && spotInfo.state)
  setCountry(spotInfo && spotInfo.country)
  setLatitude(spotInfo && spotInfo.lat)
  setLongitude(spotInfo && spotInfo.lng)
  setDescription(spotInfo && spotInfo.description)
  setPrice(spotInfo && spotInfo.price)
}, [spotInfo])
// console.log("This is being ran on line 34", name)

if(!spotInfo) return null

// console.log("This is being ran on line 40", name)
// if (!isLoaded){
//   return (<div>Loading...</div>)
//   }

// if(!getOneSpot(spotId)) return null

// const allSpots = useSelector(state => state.spots)
// const allSpotsArray = Object.values(allSpots)
// console.log("this is allSpotsArray", allSpotsArray)
// const lastCreated = allSpotsArray.length
// console.log("Is this going to be integer 6", lastCreated)

const submitHandler = async (e) => {
  e.preventDefault()
  const errors = []

  if (!name.length) errors.push("Please provide a name")
  if (!address.length) errors.push("Please provide an address");
  if (!city.length) errors.push("Please provide a city");
  if (!state.length) errors.push("Please provide a state")
  if (!country.length) errors.push("Please provide a country")
  if (lat < -90 || lat > 90) errors.push("Please provide a valid latitude between -90 to 90")
  if (lng < -180 || lng > 180) errors.push("Please provide a valid longitude between -180 to 180")
  if (!description) errors.push("Please provide a description")
  if (price < 0) errors.push("Please set price above 0");
  if (description.length > 254) errors.push("You can only provide 255 or less characters as a description")

  // if (!url) errors.push("Please provide a image");


setValidationErrors(errors)
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
    description,
    // url
}
if(errors.length){
  return null
}

let createdSpot;

createdSpot = dispatch(UpdateSpot(payload))

  history.push(`/spots/${spotId}`)

}

  return (
    <div className="Outer-Update-Container">
        <div className="Inner-Update-Container">
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <div className="title-update-box">
      <h2>Edit this Spot</h2>
      </div>
      <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <div key={error}>{error}</div>
        )}
      </div>
      <div className="form-Update-container">
      <label>
        Name
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="name"
          onChange={(e)=> setName(e.target.value)}
          // placeholder= {spotInfo.name}
          value={name}
        />
      </label>
      <label>
        Address
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="address"
          onChange={(e)=> setAddress(e.target.value)}
          // placeholder= {spotInfo.address}
          value={address}
        />
      </label>
      <label>
        City
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="city"
          onChange={(e)=> setCity(e.target.value)}
          // placeholder= {spotInfo.city}
          value={city}
        />
      </label>
      <label>
        State
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="state"
          onChange={(e)=> setState(e.target.value)}
          // placeholder= {spotInfo.state}
          value={state}
        />
      </label>
      <label>
        Country
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="country"
          onChange={(e)=> setCountry(e.target.value)}
          // placeholder= {spotInfo.country}
          value={country}
        />
      </label>
      <label>
      Latitude
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="latitude"
          onChange={(e)=> setLatitude(e.target.value)}
          // placeholder= {spotInfo.lat}
          value={lat}
        />
      </label>
      <label>
      Longitude
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="longitude"
          onChange={(e)=> setLongitude(e.target.value)}
          // placeholder= {spotInfo.lng}
          value={lng}
        />
      </label>
      <label>
      Description
        <input
        required
        className="form-Update-inputs"
          type="text"
          name="description"
          onChange={(e)=> setDescription(e.target.value)}
          // placeholder= {spotInfo.description}
          value={description}
        />
      </label>
      <label>
      Price
        <input
        required
        className="form-Update-inputs"
          type="number"
          name="price"
          onChange={(e)=> setPrice(e.target.value)}
          // placeholder= {spotInfo.price}
          value={price}
        />
      </label>
      {/* <label>
      Url
        <input
        className="form-inputs"
        required
          type="text"
          name="url"
          onChange={(e)=> setImageUrl(e.target.value)}
          value={url}
          placeholder="URL"
        />
      </label> */}
      </div>
      {/* <label>
      Url
        <input
          type="text"
          name="url"
          onChange={(e)=> setImageUrl(e.target.value)}
          value={url}
        />
      </label> */}
      <div className="button-Update-container">
      <button className="Update-Button"
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        UPDATE SPOT
      </button>
      </div>
    </form>
    </div>
    </div>
  );
}

export default UpdateSpotForm;
