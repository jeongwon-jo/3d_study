import { useOutlet } from "react-router-dom"
import {useState} from "react"

const AnimatedOutlet = () => {
  const o = useOutlet();
  const [outlet] = useState(o)

  return <>{outlet}</>
}

export default AnimatedOutlet