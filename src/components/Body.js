import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer  from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText,setSearchText]=useState("");
  const [filteredRestaurants,setFilteredRestaurants]=useState([]);

  const RestaurantPromoted=withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants( json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  

  const onlineStatus=useOnlineStatus();
  if(onlineStatus=== false) return <h1>Looks like you're offline!! Please check your internet connection.</h1>

    return (listOfRestaurants?.length===0)?(<Shimmer />):
    (
    <div className="body bg-slate-white">
      <div className="filter flex justify-center items-center">
        <div className="search m-4 p-4 ">
        <input type="text" className="w-[400px]  border-b-2 border-b-gray-200  outline-0 hover:text-yellow-500 hover:font-bold " placeholder="Search a restaurant...." value={searchText}
         onChange={(e)=>{
           setSearchText(e.target.value);
        }}/>
        <button className="px-4 py-2 m-4 hover:text-yellow-500 hover:font-bold " onClick={()=>{
        const filteredRestaurants= listOfRestaurants.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredRestaurants(filteredRestaurants);

        }}>Search</button>
        </div>
      <div className="search m-4 p-4 flex ">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:text-yellow-500 hover:font-bold "
          onClick={() => {
            const filteredresList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredresList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      </div>
      <div className="flex flex-wrap h-screen flex-shrink-0 justify-center items-center  ">
        {filteredRestaurants?.map((restaurant) => (
         <Link key={restaurant?.info?.id} to={"/restaurants/"+ restaurant?.info?.id}> {restaurant?.data?.promoted ? (<RestaurantPromoted resData={restaurant} />) : (<RestaurantCard  resData={restaurant} />)}</Link>
        ))}
      </div>
    </div>
    );
};


export default Body;
