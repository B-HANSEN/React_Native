import axios from 'axios';

const API_KEY = 'AIzaSyDrXuLET2oJCoq5z_tUXqxaU5nOYKIHyhY'; // from Firebase, project overview, Web API key

async function authenticate(mode, email, password) {
	// mode: signInWithPassword or signUp
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true,
	});

	const token = response.data.idToken;

	return token;
}

export function createUser(email, password) {
	return authenticate('signUp', email, password); // return the function which yields the token
}

export function login(email, password) {
	return authenticate('signInWithPassword', email, password);
}
