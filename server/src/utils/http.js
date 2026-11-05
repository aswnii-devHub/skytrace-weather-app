export async function getJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15000),
    headers: {
      "User-Agent": "SKYTRACE-weather-app/1.0",
      ...(options.headers || {}),
    },
  });
  if (!response.ok)
    throw new Error(`Upstream returned HTTP ${response.status}`);
  return response.json();
}
