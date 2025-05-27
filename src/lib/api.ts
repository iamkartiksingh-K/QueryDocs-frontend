import { setLoggedIn } from "@/app/_utils/auth-client";
const api_url = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  const response = await fetch(`${api_url}/auth/login`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  console.log(response.headers);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  const data = await response.json();
  const status = await setLoggedIn(true, data.access_token);

  return status;
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${api_url}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  const data = await response.json();
  const status = await setLoggedIn(true, data.access_token);

  return status;
};

export const getProfile = async () => {
  const response = await fetch("/api/profile");
  const data = await response.json();
  return data;
};
