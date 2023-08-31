import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Signin from "./Signin";
import Home from "./Home";

function App() {
	return (
		<main style={{ maxWidth: "800px", margin: "auto" }}>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Signin />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</main>
	);
}

export default App;
