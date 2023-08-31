import { useContext } from "react";
import { UserDataProvider } from "./ContextAPI/userDataProvider";
const Home = () => {
	const userContextData = useContext(UserDataProvider);

	return (
		<div>
			<h1>Sucessfully login</h1>
			<p>user Deratil: </p>
			<span>{userContextData?.userGeneralInfo.role ?? ""}</span>
			<span>{userContextData?.userGeneralInfo.user ?? ""}</span>
		</div>
	);
};

export default Home;
