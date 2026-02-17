import Home from "../pages/index"
import Seoul from "../pages/Seoul"
import Hochimin from "../pages/Hochimin";
import Losangeles from "../pages/Losangeles";
import NewYork from "../pages/NewYork";
import Osaka from "../pages/Osaka";
import { getCityWeather } from "./weatherApi"

export const routerInfo = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "seoul",
        element: <Seoul />,
        errorElement: <div className="layout-detail">Error</div>,
        loader: async() => {
          return getCityWeather("Seoul")
        }
      },
      {
        path: "hochiminhcity",
        element: <Hochimin />,
        loader: async () => {
            return getCityWeather('Ho Chi Minh City')
        },
    },
    {
        path: "newyork",
        element: <NewYork />,
        loader: async () => {
            return getCityWeather('New York')
        },
    },
    {
        path: "osaka",
        element: <Osaka />,
        loader: async () => {
            return getCityWeather('Osaka')
        },
    },
    {
        path: "losangeles",
        element: <Losangeles />,
        loader: async () => {
            return getCityWeather('Los Angeles')
        },
    },
    ]
  },
]