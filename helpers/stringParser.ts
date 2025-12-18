type ParsedLocation = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export function parseLocation(locationName?: string): ParsedLocation {
  //update to use regex
  if (!locationName) return {};

  const parts = locationName
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 6) {
    return {
      street: parts[0],
      city: parts[1],
      state: parts[3],
      zip: parts[4],
    };
  }

  if (parts.length === 7) {
    return {
      street: `${parts[0]} ${parts[1]}`,
      city: parts[2],
      state: parts[4],
      zip: parts[5],
    };
  }

  return {};
}
