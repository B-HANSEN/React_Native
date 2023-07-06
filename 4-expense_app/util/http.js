import axios from 'axios';

const BACKEND_URL =
	'https://expense-app-34bdd-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeExpense(expenseData) {
	const response = await axios.post(
		BACKEND_URL + '/expenses.json', // creates an expenses node in the DB
		expenseData
	);
	const id = response.data.name;
	return id;
}

export async function fetchExpenses() {
	const response = await axios.get(BACKEND_URL + '/expenses.json');

	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		expenses.push(expenseObj);
	}

	return expenses; // transform the data from the db into an array of objects to be handled in the frontend
}

export function updateExpense(id, expenseData) {
	return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
	// not required to set async because not waiting for a result
	return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
