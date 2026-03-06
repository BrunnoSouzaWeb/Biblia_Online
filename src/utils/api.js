export const API_BASE_URL = "https://bible-api.com";
export const TRANSLATION = "almeida";

export async function fetchVerse(verse) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/${verse}?translation=${TRANSLATION}`,
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchRandomVerse() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/?random=verse&translation=${TRANSLATION}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}
