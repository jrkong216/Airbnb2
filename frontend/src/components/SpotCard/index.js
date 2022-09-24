import{NavLink} from "react-router-dom"


function SpotCard({spot}) {




return(
<NavLink className="spot-cotainer" to={`/spots/${spot.id}`}>
        <div className="spot-card-info-container">
            <div className= "spot-image"> <img src={spot.previewImage}/></div>
            <div className= "spot-card-location"> {spot.city}, {spot.state}</div>
            <div className= "spot-country"> {spot.country}</div>
            <div className= "spot-name"> {spot.name}</div>
            <div className= "spot-price"> {spot.price}</div>
            <div className= "spot-rating"> {spot.avgRating}</div>
        </div>

    </NavLink>
)


}

export default SpotCard
