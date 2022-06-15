import { Hotel } from "../../models/HotelModel";

const HotelCard = ({city,price,name,available_on}: Hotel) => {
    return (
        <div className="border-2 border-gray-400 p-5 m-2">
            <div className="title">Name: {name}</div>
            <div className="title">Price: {price}</div>
            <div className="title">City: {city}</div>
            <div className="title">available_on: {available_on}</div>

        </div>
    )
}
export default HotelCard;