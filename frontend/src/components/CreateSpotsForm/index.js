import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"


function SpotForm() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageurl, setImageUrl] = useState('')

  const [validationErrors, setValidationErrors] = useState([])
  const dispatch = useDispatch();


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
    name,
    address,
    city,
    state,
    country,
    latitude,
    longitude,
    price,
    description,
    price,
    imageurl
}

useEffect(() => {
    dispatch(createSpot(payload))
}, [dispatch])
  history.push('/')

}

  return (
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <h2>Create a Spot</h2>
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
          value={latitude}
        />
      </label>
      <label>
      Longitude
        <input
          type="text"
          name="longitude"
          onChange={(e)=> setLongitude(e.target.value)}
          value={longitude}
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
      Image Url
        <input
          type="text"
          name="imageurl"
          onChange={(e)=> setImageUrl(e.target.value)}
          value={imageurl}
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
