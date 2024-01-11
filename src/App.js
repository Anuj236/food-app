import React,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider,Outlet} from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// JSX=> React.createElement=> JSObject=> HTMLElemnet(render)
// React Component

// Any Javascript Expression in the curly braces


const AppLayOut = () => {
  return <div className="app">
    <Provider store ={appStore}>
    <Header />
    <Outlet />
    </Provider>
  </div>;
};

const About=lazy(()=> import ("./components/About"));

const appRouter=createBrowserRouter([
  {
    path:"/",
    element: <AppLayOut />,
    children: [
      {
        path:"/",
        element:<Body />,
      },
      {
        path:"/about",
        element: <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>,
      },
    
      {
        path:"/contact",
        element: <Contact />,
      },
      {
        path:"/cart",
        element:<Cart />,
      },
      {
        path:"/restaurants/:resId",
        element: <RestaurantMenu />,
      }
    ],
    errorElement: <Error />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
