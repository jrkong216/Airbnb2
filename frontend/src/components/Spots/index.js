import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllSpots} from '../../store/spotsReducer'


const GetAllSpots = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [])

    const allSpots = useSelector(state => state.spots)

    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return

        <h1>SHOWCASE ALL SPOTS</h1>
    

}

export default GetAllSpots
