import styled from "styled-components";
import { MainCanvas } from './components/MainCanvas';
import { FixedDOM } from "./components/dom/FixedDom";
function App() {

  return (
		<Wrapper>
			<MainCanvas />
			<FixedDOM />
		</Wrapper>
	);
}

export default App

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
overflow: hidden;
`