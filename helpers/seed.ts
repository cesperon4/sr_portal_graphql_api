export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomSantaRosaCoords() {
  return {
    lat: Number((Math.random() * (38.515 - 38.405) + 38.405).toFixed(6)),
    lon: Number((Math.random() * (-122.62 + 122.82) - 122.82).toFixed(6)),
  };
}

export const categories = [
  "violence_assault",
  "theft_burglary",
  "traffic_incident",
  "public_disturbance",
  "fraud_scams",
  "environmental_hazard",
] as const;

export function randomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}
