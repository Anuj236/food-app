import { useState } from "react";
import ItemList from "./ItemList";
const RestaurantCategory = ({ data,showItems,setShowIndex }) => {
  const handleClick=()=>{
   setShowIndex();
  }
  return (
    <div>
      <div className="w-6/12  mx-auto shadow-lg my-4 p-4 ">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
          <span className="font-semibold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span className=" text-lg">⌄</span>
        </div>
       {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
