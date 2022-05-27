export default function headers() {
  let raw = JSON.parse(sessionStorage.getItem("auth") ?? localStorage.getItem("auth"));

  return {
    headers: {
      Authorization: `Bearer ${raw.jwt}`,
    },
  };
}
