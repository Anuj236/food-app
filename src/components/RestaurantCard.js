import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData?.info;

  return (
    <div className=" p-2 m-2 w-64 h-screen max-h-[450px] bg-gray-100 rounded-sm shadow-lg hover:bg-gray-300 border border-collapse ">
      <img className="rounded-lg  " src={CDN_URL + cloudinaryImageId} /> 
      <h3 className="font-bold py-4">{name}</h3>
      <h4 className="truncate">{cuisines.join(",")}</h4>
      <h4>{avgRating}*</h4>
      <h4>{costForTwo} </h4>
      <h4>{sla?.deliveryTime} minutes</h4>
      </div>
   
  );
};

export const withPromotedLabel=(RestaurantCard)=>{
  return (props)=>{
      return (
        <div>
          <label className="absolute bg-black text-white m-2 p-2">Promoted</label>
          <RestaurantCard {...props} />
        </div>
      )
  }
};

export default RestaurantCard;
