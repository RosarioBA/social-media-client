import * as auth from "../../api/auth/index.js";
import { updateLoginVisibility } from "../../ui/auth.js";

export async function loginListener(event) {
	event.preventDefault();
	const form = event.target;
	const data = new FormData(form);
	const email = data.get("email");
	const password = data.get("password");
	const errorDiv = document.getElementById('loginError');

	try {
		const { name } = await auth.login(email, password);
		// Clear any existing error message
		errorDiv.classList.add('d-none');
		errorDiv.textContent = '';
		
		updateLoginVisibility();
		location.href = `./?view=profile&name=${name}`;
	} catch {
		// Show error message in the form
		errorDiv.textContent = "Either your username was not found or your password is incorrect";
		errorDiv.classList.remove('d-none');
	}
}