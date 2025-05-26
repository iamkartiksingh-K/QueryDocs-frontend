const api_url = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  const response = await fetch(`${api_url}/auth/login`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
