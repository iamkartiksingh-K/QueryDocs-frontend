export async function setLoggedIn(status: boolean, token?: string) {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      token: token,
    }),
  });
  const data = await response.json();
  return data;
}
export async function logOut() {
  const response = await fetch("http://localhost:3000/api/logout", {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  return data;
}
