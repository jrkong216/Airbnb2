import{NavLink} from "react-router-dom"
import "./SpotCard.css"

function SpotCard({spot}) {

    if(spot.avgRating === null){
        spot.avgRating = "NEW"
    }

return(
<NavLink className="spot-cotainer" to={`/spots/${spot.id}`}>
    <div className= "spot-container">
        <div className= "spot-image-container">
             <img className ="spot-image" src={spot.previewImage}/></div>

        <div className= "spot-info-container">
            <div className= "spot-info-text-container">
            <div className= "spot-address"> {spot.address}</div>
                <div className= "spot-city-state"> {spot.city}, {spot.state}</div>
                <div className= "spot-country"> {spot.country}</div>
                <div className= "spot-name"> {spot.name}</div>
            </div>
            <div className= "spot-price-container">
                <div className= "spot-price"> {spot.price}</div>
            </div>
            <div className="spot-review-data-container">
            <div className="spot-star">
              <i className="fa-solid fa-star fa-xs"></i>
            </div>
            <div className="spot-rating">{spot.avgRating}</div>
          </div>
        </div>
    </div>
</NavLink>
)


}

export default SpotCard
