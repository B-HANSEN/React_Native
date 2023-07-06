import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: token => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState();

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem('token', token); // AsyncStorage: store token on device to avoid re-logging in when user closes app
	}

	function logout() {
		setAuthToken(null); // clear token when logging out
		AsyncStorage.removeItem('token');
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate, // point to function and make it available anywhere in the app
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
