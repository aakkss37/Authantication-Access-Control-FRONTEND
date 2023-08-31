import { createContext, useState } from "react";

const userDataContext = createContext(null);

export const UserDataProvider = (children) => {
	const [userGeneralInfo, setUserGeneralInfo] = useState(null);
	const [accessToken, setAccessToken] = useState("");

	const userContextValue = {
		userGeneralInfo,
		setUserGeneralInfo,
		accessToken,
		setAccessToken,
	};
	return (
		<userDataContext.Provider value={userContextValue}>
			{children}
		</userDataContext.Provider>
	);
};
