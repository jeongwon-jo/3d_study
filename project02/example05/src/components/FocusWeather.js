import { useBounds } from "@react-three/drei"
import { useLocation } from "react-router-dom";
import {useEffect} from "react"

export function FocusWeather({ children }) {
  const location = useLocation()
  const bounds = useBounds()
  const handleClick = (e) => {
      e.stopPropagation();
      bounds.refresh(e.object).fit();
  };

  useEffect(() => {
    if(location.pathname == "/") {
      bounds.refresh().fit()
    }
  }, [bounds, location.pathname])


  return (
    <group 
      onClick={handleClick} 
      onPointerMissed={(e) => e.button === 0 && bounds.refresh().fit()}>
      {children}
    </group>
  )
  }
  