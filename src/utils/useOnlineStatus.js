import { useState,useEffect } from "react";
const useOnlineStatus = () => {
   const [onlineStatus,setOnlineStatus]=useState(true);
   //check if online ,we use eventlistener-online event
     window.addEventListener("offline",()=>{
       setOnlineStatus(false);
     });

     window.addEventListener("online",()=>{
      setOnlineStatus(true);
    });

  //Boolean Value
     return onlineStatus;
}

export default useOnlineStatus;