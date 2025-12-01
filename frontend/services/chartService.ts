import axios from "axios";
import type { chartData } from "../data/chartData";

const API_BASE = "http://localhost:8080"; // Replace with real URL

// Fetch songs + artists together for a country
export const fetchTop50 = async (countryCode: string): Promise<chartData> => {
  const [songsRes, artistsRes] = await Promise.all([
    axios.get(`${API_BASE}/top50/${countryCode}`),
    axios.get(`${API_BASE}/topArtistsByCountry/${countryCode}`),
  ]);
  return {
    songs: songsRes.data,
    artists: artistsRes.data,
  };
};

// Special case for worldwide (your current endpoints)
export const fetchWorldwideCharts = async (): Promise<chartData> => {
  const [songsRes, artistsRes] = await Promise.all([
    axios.get(`${API_BASE}/global50`),
    axios.get(`${API_BASE}/topArtists`), // or /topArtists/worldwide
  ]);
  return {
    songs: songsRes.data,
    artists: artistsRes.data,
  };
};