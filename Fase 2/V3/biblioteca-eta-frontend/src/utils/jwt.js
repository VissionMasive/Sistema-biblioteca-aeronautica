export function base64UrlDecode(input) {
  if (!input || typeof input !== "string") return null;
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  try {
    return atob(base64);
  } catch (e) {
    return null;
  }
}

export function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payload = parts[1];

    const decoded = base64UrlDecode(payload);
    if (!decoded) return null;

    const jsonPayload = decodeURIComponent(
      decoded
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    try {
      const parts = token.split(".");
      const alt = atob(parts[1]);
      return JSON.parse(alt);
    } catch (err2) {
      console.error("decodeJwt error:", err);
      return null;
    }
  }
}
