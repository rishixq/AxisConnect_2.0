const API_BASE_URL =  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

/**
 * Login API
 * @param {string} employeeCode
 * @param {string} email
 */
export async function login(employeeCode,email) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee_code: employeeCode,
      email: email,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }

  return response.json();
}

/**
 * Chat API
 * @param {string} message
 * @param {object} employeeProfile
 * @param {Array} history
 */
export async function chat(message, employeeProfile, history) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      employee_profile: employeeProfile,
      history,
    }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
}
