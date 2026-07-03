const API_BASE_URL = "http://localhost:8080";

export function createBasicAuthToken(username, password) {
  return "Basic " + btoa(`${username}:${password}`);
}

export async function getAdminBookings(authToken) {
  const response = await fetch(`${API_BASE_URL}/api/admin/demo-bookings`, {
    method: "GET",
    headers: {
      Authorization: authToken
    }
  });

  if (!response.ok) {
    throw new Error("Invalid admin login or access denied");
  }

  return response.json();
}