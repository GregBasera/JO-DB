export default function headers() {
  let raw = JSON.parse(sessionStorage.getItem("auth"));

  return {
    headers: {
      Authorization: `Bearer ${raw.jwt}`,
    },
  };
}
