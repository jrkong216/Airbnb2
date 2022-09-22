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
  // const [imageurl, setImageUrl] = useState('')

  const [validationErrors, setValidationErrors] = useState([])
 //GOING TO HAVE TO MAKE SOME SORT OF USER MUST BE LOGGED IN REFERRENCE

  useEffect(() => {
    dispatch(getAllSpots())
}, [dispatch, spotId])

// const allSpots = useSelector(state => state.spots)
// const allSpotsArray = Object.values(allSpots)
// console.log("this is allSpotsArray", allSpotsArray)
// const lastCreated = allSpotsArray.length
// console.log("Is this going to be integer 6", lastCreated)

//   useEffect(() => {
//     const errors = []

    // if(name.length < 3) {
    //   errors.push("Name must be 3 or more characters")
    // } else if (name.length > 20) {
    //   errors.push("Name must be 20 characters or less")
    // }
    // if(fruits.find(fruits => fruits.name === name)) {
    //   errors.push("Name already exists.")
    // }

    // if (sweetness < 1 || sweetness > 10){
    //   errors.push("Sweetness must be between 1 and 10")
    // }

//     setValidationErrors(errors)

//   }, [name, sweetness, fruits])

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

  history.push("/")

}

  return (
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <h2>UPDATE a Spot</h2>
      {/* <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <li key={error}>{error}</li>
        )}
      </ul> */}
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
      Image Url
        <input
          type="text"
          name="imageurl"
          onChange={(e)=> setImageUrl(e.target.value)}
          value={imageurl}
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
