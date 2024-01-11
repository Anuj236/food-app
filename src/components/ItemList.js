import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const ItemList = ({ items }) => {
  const dispatch=useDispatch();

  const handleaddItem=(item)=>{
    dispatch(addItem(item));
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 text-left border-gray-200 border-b-2 justify-between  flex"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className="font-semibold">{item.card.info.name}</span>
              <span> - ₹{item.card.info.price / 100}</span>
            </div>
            <p className="text-xs ">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button className="p-2 my-16 font-semibold text-xs mx-8 rounded-lg border-2px  bg-white text-green-700  shadow-lg" onClick={()=>handleaddItem(item)}>ADD +</button>
            </div>
            <img src={CDN_URL + item.card.info.imageId} />{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
