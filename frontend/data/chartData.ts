import { ChartItemData } from "../components/ChartItem";
import { ArtistData } from "../components/ArtistCard";
import { AlbumData } from "../components/AlbumCard";
//import { axios } from "axios";

export type Country = "worldwide" | "us" | "spain" | "uk" | "italy" | "france" | "mexico" | "argentina" | "japan" | "south-korea";

export const countries = [
  { value: "worldwide", label: "Worldwide", flag: "🌍" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "spain", label: "Spain", flag: "🇪🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "italy", label: "Italy", flag: "🇮🇹" },
  { value: "france", label: "France", flag: "🇫🇷" },
  { value: "mexico", label: "Mexico", flag: "🇲🇽" },
  { value: "argentina", label: "Argentina", flag: "🇦🇷" },
  { value: "japan", label: "Japan", flag: "🇯🇵" },
  { value: "south-korea", label: "South Korea", flag: "🇰🇷" },
] as const;

const img1 = "https://images.unsplash.com/photo-1642552556378-549e3445315e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBwZXJmb3JtZXJ8ZW58MXx8fHwxNzYwNTQzNTczfDA&ixlib=rb-4.1.0&q=80&w=1080";
const img2 = "https://images.unsplash.com/photo-1618107095181-e3ba0f53ee59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHR1cm50YWJsZSUyMG11c2ljfGVufDF8fHx8MTc2MDQ2NTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080";
const img3 = "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYwNTUzMDE4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const img4 = "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzYwNDgyMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const img5 = "https://images.unsplash.com/photo-1727831140213-18650ae7ef36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGd1aXRhciUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MDUyNzg0NXww&ixlib=rb-4.1.0&q=80&w=1080";
const img6 = "https://images.unsplash.com/photo-1564178413634-1ec30062c5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMHZpbnlsJTIwcmVjb3JkfGVufDF8fHx8MTc2MDUwODczOXww&ixlib=rb-4.1.0&q=80&w=1080";

export interface chartData {
  songs: ChartItemData[];
  artists: ArtistData[];
}


export const chartData: Record<Country, chartData> = {
  worldwide: {
    songs: [
      { rank: 1, title: "Starlight Dreams", artist: "Luna Echo", image_url: img1, countries_charted: 45, latest_date: "2025-11-27" },
      { rank: 2, title: "Midnight Vibes", artist: "The Groove Collective", image_url: img2, countries_charted: 42, latest_date: "2025-11-27" },
      { rank: 3, title: "Electric Soul", artist: "Neon Waves", image_url: img3, countries_charted: 38, latest_date: "2025-11-27" },
      { rank: 4, title: "Summer Nights", artist: "Coastal Rhythm", image_url: img4, countries_charted: 35, latest_date: "2025-11-27" },
      { rank: 5, title: "Velvet Horizon", artist: "Luna Echo", image_url: img5, countries_charted: 33, latest_date: "2025-11-27" },
      { rank: 6, title: "Rhythm & Blues", artist: "Soul Train Express", image_url: img6, countries_charted: 31, latest_date: "2025-11-27" },
      { rank: 7, title: "Digital Love", artist: "Synth City", image_url: img1, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 8, title: "Wild Heart", artist: "The Groove Collective", image_url: img2, countries_charted: 26, latest_date: "2025-11-27" },
      { rank: 9, title: "Cosmic Dance", artist: "Stellar Sound", image_url: img3, countries_charted: 24, latest_date: "2025-11-27" },
      { rank: 10, title: "Golden Hour", artist: "Coastal Rhythm", image_url: img4, countries_charted: 22, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Luna Echo", image_url: img1, total_charting_songs: "45", avg_chart_position: "3.2", best_position: "1", countries_charted: "45", genre: "Pop" },
      { name: "The Groove Collective", image_url: img2, total_charting_songs: "38", avg_chart_position: "4.5", best_position: "2", countries_charted: "42", genre: "R&B" },
      { name: "Neon Waves", image_url: img3, total_charting_songs: "32", avg_chart_position: "5.1", best_position: "3", countries_charted: "38", genre: "Electronic" },
      { name: "Coastal Rhythm", image_url: img4, total_charting_songs: "28", avg_chart_position: "6.3", best_position: "4", countries_charted: "35", genre: "Indie" },
      { name: "Soul Train Express", image_url: img5, total_charting_songs: "26", avg_chart_position: "7.2", best_position: "6", countries_charted: "31", genre: "Soul" },
      { name: "Synth City", image_url: img6, total_charting_songs: "24", avg_chart_position: "8.5", best_position: "7", countries_charted: "28", genre: "Synthwave" },
    ]
  },
  us: {
    songs: [
      { rank: 1, title: "American Dream", artist: "Brooklyn Heights", image_url: img2, countries_charted: 38, latest_date: "2025-11-27" },
      { rank: 2, title: "Nashville Nights", artist: "Country Roads", image_url: img4, countries_charted: 35, latest_date: "2025-11-27" },
      { rank: 3, title: "West Coast Vibes", artist: "LA Sunsets", image_url: img1, countries_charted: 32, latest_date: "2025-11-27" },
      { rank: 4, title: "Big City Dreams", artist: "Manhattan Beat", image_url: img3, countries_charted: 30, latest_date: "2025-11-27" },
      { rank: 5, title: "Southern Soul", artist: "Memphis Sound", image_url: img5, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 6, title: "Electric Avenue", artist: "Detroit Pulse", image_url: img6, countries_charted: 25, latest_date: "2025-11-27" },
      { rank: 7, title: "Chicago Blues", artist: "Windy City Band", image_url: img2, countries_charted: 23, latest_date: "2025-11-27" },
      { rank: 8, title: "Texas Swing", artist: "Austin Groove", image_url: img4, countries_charted: 21, latest_date: "2025-11-27" },
      { rank: 9, title: "Miami Heat", artist: "Tropical Beats", image_url: img1, countries_charted: 19, latest_date: "2025-11-27" },
      { rank: 10, title: "Portland Rain", artist: "Pacific Northwest", image_url: img3, countries_charted: 17, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Brooklyn Heights", image_url: img2, total_charting_songs: "52", avg_chart_position: "2.8", best_position: "1", countries_charted: "38", genre: "Hip Hop" },
      { name: "Country Roads", image_url: img4, total_charting_songs: "48", avg_chart_position: "3.5", best_position: "2", countries_charted: "35", genre: "Country" },
      { name: "LA Sunsets", image_url: img1, total_charting_songs: "41", avg_chart_position: "4.2", best_position: "3", countries_charted: "32", genre: "Pop" },
      { name: "Manhattan Beat", image_url: img3, total_charting_songs: "36", avg_chart_position: "5.1", best_position: "4", countries_charted: "30", genre: "R&B" },
      { name: "Memphis Sound", image_url: img5, total_charting_songs: "29", avg_chart_position: "6.4", best_position: "5", countries_charted: "28", genre: "Soul" },
      { name: "Detroit Pulse", image_url: img6, total_charting_songs: "27", avg_chart_position: "7.3", best_position: "6", countries_charted: "25", genre: "Electronic" },
    ]
  },
  spain: {
    songs: [
      { rank: 1, title: "Baila Conmigo", artist: "Madrid Nights", image_url: img1, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 2, title: "Corazón Latino", artist: "Barcelona Beats", image_url: img2, countries_charted: 26, latest_date: "2025-11-27" },
      { rank: 3, title: "Noche de Verano", artist: "Sevilla Sound", image_url: img3, countries_charted: 24, latest_date: "2025-11-27" },
      { rank: 4, title: "Flamenco Fusion", artist: "Andalucía Groove", image_url: img4, countries_charted: 22, latest_date: "2025-11-27" },
      { rank: 5, title: "Mar Mediterráneo", artist: "Valencia Vibes", image_url: img5, countries_charted: 20, latest_date: "2025-11-27" },
      { rank: 6, title: "Ritmo Urbano", artist: "Madrid Nights", image_url: img6, countries_charted: 18, latest_date: "2025-11-27" },
      { rank: 7, title: "Bajo el Sol", artist: "Ibiza Dreams", image_url: img1, countries_charted: 16, latest_date: "2025-11-27" },
      { rank: 8, title: "Pasión Española", artist: "Barcelona Beats", image_url: img2, countries_charted: 15, latest_date: "2025-11-27" },
      { rank: 9, title: "Granada Nights", artist: "Sevilla Sound", image_url: img3, countries_charted: 13, latest_date: "2025-11-27" },
      { rank: 10, title: "Fiesta Total", artist: "Valencia Vibes", image_url: img4, countries_charted: 12, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Madrid Nights", image_url: img1, total_charting_songs: "38", avg_chart_position: "3.5", best_position: "1", countries_charted: "28", genre: "Latin Pop" },
      { name: "Barcelona Beats", image_url: img2, total_charting_songs: "35", avg_chart_position: "4.1", best_position: "2", countries_charted: "26", genre: "Reggaeton" },
      { name: "Sevilla Sound", image_url: img3, total_charting_songs: "29", avg_chart_position: "5.3", best_position: "3", countries_charted: "24", genre: "Flamenco Pop" },
      { name: "Andalucía Groove", image_url: img4, total_charting_songs: "26", avg_chart_position: "6.2", best_position: "4", countries_charted: "22", genre: "Flamenco" },
      { name: "Valencia Vibes", image_url: img5, total_charting_songs: "24", avg_chart_position: "7.0", best_position: "5", countries_charted: "20", genre: "Pop" },
      { name: "Ibiza Dreams", image_url: img6, total_charting_songs: "22", avg_chart_position: "8.5", best_position: "7", countries_charted: "16", genre: "Electronic" },
    ]
  },
  uk: {
    songs: [
      { rank: 1, title: "London Calling", artist: "Thames Collective", image_url: img3, countries_charted: 40, latest_date: "2025-11-27" },
      { rank: 2, title: "Manchester Groove", artist: "Northern Soul", image_url: img2, countries_charted: 37, latest_date: "2025-11-27" },
      { rank: 3, title: "British Invasion", artist: "Liverpool Legends", image_url: img1, countries_charted: 34, latest_date: "2025-11-27" },
      { rank: 4, title: "Edinburgh Dreams", artist: "Scottish Wave", image_url: img4, countries_charted: 31, latest_date: "2025-11-27" },
      { rank: 5, title: "Brixton Beat", artist: "South London Crew", image_url: img5, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 6, title: "Welsh Anthem", artist: "Cardiff Sound", image_url: img6, countries_charted: 25, latest_date: "2025-11-27" },
      { rank: 7, title: "Birmingham Blues", artist: "Midlands Beat", image_url: img3, countries_charted: 22, latest_date: "2025-11-27" },
      { rank: 8, title: "Brighton Nights", artist: "Coastal Vibes UK", image_url: img2, countries_charted: 20, latest_date: "2025-11-27" },
      { rank: 9, title: "Oxford Street", artist: "Thames Collective", image_url: img1, countries_charted: 18, latest_date: "2025-11-27" },
      { rank: 10, title: "Bristol Sound", artist: "West Country", image_url: img4, countries_charted: 16, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Thames Collective", image_url: img3, total_charting_songs: "44", avg_chart_position: "3.0", best_position: "1", countries_charted: "40", genre: "Indie Rock" },
      { name: "Northern Soul", image_url: img2, total_charting_songs: "39", avg_chart_position: "3.8", best_position: "2", countries_charted: "37", genre: "Alternative" },
      { name: "Liverpool Legends", image_url: img1, total_charting_songs: "36", avg_chart_position: "4.5", best_position: "3", countries_charted: "34", genre: "Rock" },
      { name: "Scottish Wave", image_url: img4, total_charting_songs: "31", avg_chart_position: "5.6", best_position: "4", countries_charted: "31", genre: "Indie Pop" },
      { name: "South London Crew", image_url: img5, total_charting_songs: "28", avg_chart_position: "6.8", best_position: "5", countries_charted: "28", genre: "Grime" },
      { name: "Cardiff Sound", image_url: img6, total_charting_songs: "25", avg_chart_position: "7.9", best_position: "6", countries_charted: "25", genre: "Alternative" },
    ]
  },
  italy: {
    songs: [
      { rank: 1, title: "Roma Bella", artist: "Città Eterna", image_url: img1, countries_charted: 25, latest_date: "2025-11-27" },
      { rank: 2, title: "Amore Italiano", artist: "Milano Sound", image_url: img2, countries_charted: 23, latest_date: "2025-11-27" },
      { rank: 3, title: "Dolce Vita", artist: "Napoli Groove", image_url: img3, countries_charted: 21, latest_date: "2025-11-27" },
      { rank: 4, title: "Venezia Nights", artist: "Laguna Dreams", image_url: img4, countries_charted: 19, latest_date: "2025-11-27" },
      { rank: 5, title: "Firenze Passion", artist: "Toscana Beat", image_url: img5, countries_charted: 17, latest_date: "2025-11-27" },
      { rank: 6, title: "Mare Adriatico", artist: "Coastal Italia", image_url: img6, countries_charted: 15, latest_date: "2025-11-27" },
      { rank: 7, title: "Sicilia Soul", artist: "Island Vibes", image_url: img1, countries_charted: 14, latest_date: "2025-11-27" },
      { rank: 8, title: "Torino Nights", artist: "Northern Italy", image_url: img2, countries_charted: 12, latest_date: "2025-11-27" },
      { rank: 9, title: "Bologna Beat", artist: "Emilia Sound", image_url: img3, countries_charted: 11, latest_date: "2025-11-27" },
      { rank: 10, title: "Verona Amore", artist: "Romeo's City", image_url: img4, countries_charted: 10, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Città Eterna", image_url: img1, total_charting_songs: "35", avg_chart_position: "3.8", best_position: "1", countries_charted: "25", genre: "Pop Italiano" },
      { name: "Milano Sound", image_url: img2, total_charting_songs: "32", avg_chart_position: "4.3", best_position: "2", countries_charted: "23", genre: "Pop" },
      { name: "Napoli Groove", image_url: img3, total_charting_songs: "28", avg_chart_position: "5.1", best_position: "3", countries_charted: "21", genre: "Napoletano" },
      { name: "Laguna Dreams", image_url: img4, total_charting_songs: "25", avg_chart_position: "6.0", best_position: "4", countries_charted: "19", genre: "Electronic" },
      { name: "Toscana Beat", image_url: img5, total_charting_songs: "23", avg_chart_position: "6.9", best_position: "5", countries_charted: "17", genre: "Indie" },
      { name: "Island Vibes", image_url: img6, total_charting_songs: "21", avg_chart_position: "8.2", best_position: "7", countries_charted: "14", genre: "Folk Pop" },
    ],
  },
  france: {
    songs: [
      { rank: 1, title: "Paris La Nuit", artist: "Seine Collective", image_url: img2, countries_charted: 32, latest_date: "2025-11-27" },
      { rank: 2, title: "Champs-Élysées", artist: "Parisian Dreams", image_url: img1, countries_charted: 30, latest_date: "2025-11-27" },
      { rank: 3, title: "Côte d'Azur", artist: "Riviera Sound", image_url: img3, countries_charted: 27, latest_date: "2025-11-27" },
      { rank: 4, title: "Marseille Groove", artist: "Mediterranean Beat", image_url: img4, countries_charted: 25, latest_date: "2025-11-27" },
      { rank: 5, title: "Lyon Lights", artist: "Rhône Vibes", image_url: img5, countries_charted: 23, latest_date: "2025-11-27" },
      { rank: 6, title: "Bordeaux Nights", artist: "Wine Country", image_url: img6, countries_charted: 21, latest_date: "2025-11-27" },
      { rank: 7, title: "Provence Dreams", artist: "Lavender Fields", image_url: img2, countries_charted: 19, latest_date: "2025-11-27" },
      { rank: 8, title: "Montmartre", artist: "Seine Collective", image_url: img1, countries_charted: 17, latest_date: "2025-11-27" },
      { rank: 9, title: "Strasbourg Soul", artist: "Alsace Sound", image_url: img3, countries_charted: 15, latest_date: "2025-11-27" },
      { rank: 10, title: "Nice & Easy", artist: "Riviera Sound", image_url: img4, countries_charted: 14, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Seine Collective", image_url: img2, total_charting_songs: "40", avg_chart_position: "3.2", best_position: "1", countries_charted: "32", genre: "French Pop" },
      { name: "Parisian Dreams", image_url: img1, total_charting_songs: "37", avg_chart_position: "3.9", best_position: "2", countries_charted: "30", genre: "Chanson" },
      { name: "Riviera Sound", image_url: img3, total_charting_songs: "33", avg_chart_position: "4.7", best_position: "3", countries_charted: "27", genre: "Electronic" },
      { name: "Mediterranean Beat", image_url: img4, total_charting_songs: "29", avg_chart_position: "5.5", best_position: "4", countries_charted: "25", genre: "Rap" },
      { name: "Rhône Vibes", image_url: img5, total_charting_songs: "26", avg_chart_position: "6.3", best_position: "5", countries_charted: "23", genre: "Indie" },
      { name: "Wine Country", image_url: img6, total_charting_songs: "24", avg_chart_position: "7.1", best_position: "6", countries_charted: "21", genre: "Pop" },
    ]
  },
  mexico: {
    songs: [
      { rank: 1, title: "Ciudad de México", artist: "DF Sound", image_url: img1, countries_charted: 30, latest_date: "2025-11-27" },
      { rank: 2, title: "Guadalajara Nights", artist: "Mariachi Moderno", image_url: img2, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 3, title: "Cancún Dreams", artist: "Caribbean Beats", image_url: img3, countries_charted: 26, latest_date: "2025-11-27" },
      { rank: 4, title: "Monterrey Flow", artist: "Northern México", image_url: img4, countries_charted: 24, latest_date: "2025-11-27" },
      { rank: 5, title: "Tijuana Sound", artist: "Border Vibes", image_url: img5, countries_charted: 22, latest_date: "2025-11-27" },
      { rank: 6, title: "Oaxaca Soul", artist: "Mezcal Dreams", image_url: img6, countries_charted: 20, latest_date: "2025-11-27" },
      { rank: 7, title: "Playa del Carmen", artist: "Caribbean Beats", image_url: img1, countries_charted: 18, latest_date: "2025-11-27" },
      { rank: 8, title: "Puebla Passion", artist: "Central Sound", image_url: img2, countries_charted: 16, latest_date: "2025-11-27" },
      { rank: 9, title: "Veracruz Vibes", artist: "Gulf Coast", image_url: img3, countries_charted: 14, latest_date: "2025-11-27" },
      { rank: 10, title: "San Miguel Nights", artist: "Colonial Dreams", image_url: img4, countries_charted: 13, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "DF Sound", image_url: img1, total_charting_songs: "43", avg_chart_position: "3.1", best_position: "1", countries_charted: "30", genre: "Regional Mexicano" },
      { name: "Mariachi Moderno", image_url: img2, total_charting_songs: "39", avg_chart_position: "3.7", best_position: "2", countries_charted: "28", genre: "Mariachi" },
      { name: "Caribbean Beats", image_url: img3, total_charting_songs: "35", avg_chart_position: "4.5", best_position: "3", countries_charted: "26", genre: "Reggaeton" },
      { name: "Northern México", image_url: img4, total_charting_songs: "31", avg_chart_position: "5.4", best_position: "4", countries_charted: "24", genre: "Norteño" },
      { name: "Border Vibes", image_url: img5, total_charting_songs: "28", avg_chart_position: "6.2", best_position: "5", countries_charted: "22", genre: "Banda" },
      { name: "Mezcal Dreams", image_url: img6, total_charting_songs: "25", avg_chart_position: "7.0", best_position: "6", countries_charted: "20", genre: "Folk" },
    ]
  },
  argentina: {
    songs: [
      { rank: 1, title: "Buenos Aires Beat", artist: "Porteño Sound", image_url: img2, countries_charted: 26, latest_date: "2025-11-27" },
      { rank: 2, title: "Tango Moderno", artist: "Río de la Plata", image_url: img1, countries_charted: 24, latest_date: "2025-11-27" },
      { rank: 3, title: "Mendoza Nights", artist: "Wine Valley", image_url: img3, countries_charted: 22, latest_date: "2025-11-27" },
      { rank: 4, title: "Córdoba Flow", artist: "Central Argentina", image_url: img4, countries_charted: 20, latest_date: "2025-11-27" },
      { rank: 5, title: "Patagonia Dreams", artist: "Southern Sound", image_url: img5, countries_charted: 18, latest_date: "2025-11-27" },
      { rank: 6, title: "Rosario Rhythm", artist: "Paraná Beats", image_url: img6, countries_charted: 16, latest_date: "2025-11-27" },
      { rank: 7, title: "Bariloche Vibes", artist: "Mountain Sound", image_url: img2, countries_charted: 15, latest_date: "2025-11-27" },
      { rank: 8, title: "La Plata Soul", artist: "Porteño Sound", image_url: img1, countries_charted: 13, latest_date: "2025-11-27" },
      { rank: 9, title: "Salta Passion", artist: "Northwest Dreams", image_url: img3, countries_charted: 12, latest_date: "2025-11-27" },
      { rank: 10, title: "Mar del Plata", artist: "Atlantic Coast", image_url: img4, countries_charted: 11, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Porteño Sound", image_url: img2, total_charting_songs: "36", avg_chart_position: "3.6", best_position: "1", countries_charted: "26", genre: "Rock Nacional" },
      { name: "Río de la Plata", image_url: img1, total_charting_songs: "33", avg_chart_position: "4.2", best_position: "2", countries_charted: "24", genre: "Tango" },
      { name: "Wine Valley", image_url: img3, total_charting_songs: "29", avg_chart_position: "5.0", best_position: "3", countries_charted: "22", genre: "Folklore" },
      { name: "Central Argentina", image_url: img4, total_charting_songs: "27", avg_chart_position: "5.9", best_position: "4", countries_charted: "20", genre: "Cuarteto" },
      { name: "Southern Sound", image_url: img5, total_charting_songs: "24", avg_chart_position: "6.7", best_position: "5", countries_charted: "18", genre: "Indie" },
      { name: "Paraná Beats", image_url: img6, total_charting_songs: "22", avg_chart_position: "7.8", best_position: "6", countries_charted: "16", genre: "Cumbia" },
    ]
  },
  japan: {
    songs: [
      { rank: 1, title: "Tokyo Nights", artist: "Shibuya Sound", image_url: img1, countries_charted: 42, latest_date: "2025-11-27" },
      { rank: 2, title: "Sakura Dreams", artist: "J-Pop Stars", image_url: img2, countries_charted: 40, latest_date: "2025-11-27" },
      { rank: 3, title: "Osaka Groove", artist: "Kansai Beat", image_url: img3, countries_charted: 37, latest_date: "2025-11-27" },
      { rank: 4, title: "Kyoto Serenity", artist: "Ancient City", image_url: img4, countries_charted: 34, latest_date: "2025-11-27" },
      { rank: 5, title: "Harajuku Style", artist: "Fashion District", image_url: img5, countries_charted: 31, latest_date: "2025-11-27" },
      { rank: 6, title: "Yokohama Nights", artist: "Bay City Sound", image_url: img6, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 7, title: "Hokkaido Snow", artist: "Northern Japan", image_url: img1, countries_charted: 26, latest_date: "2025-11-27" },
      { rank: 8, title: "Nagoya Beat", artist: "Central Sound", image_url: img2, countries_charted: 24, latest_date: "2025-11-27" },
      { rank: 9, title: "Okinawa Vibes", artist: "Island Paradise", image_url: img3, countries_charted: 22, latest_date: "2025-11-27" },
      { rank: 10, title: "Akihabara Electric", artist: "Tech District", image_url: img4, countries_charted: 20, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "Shibuya Sound", image_url: img1, total_charting_songs: "47", avg_chart_position: "2.8", best_position: "1", countries_charted: "42", genre: "J-Pop" },
      { name: "J-Pop Stars", image_url: img2, total_charting_songs: "42", avg_chart_position: "3.3", best_position: "2", countries_charted: "40", genre: "J-Pop" },
      { name: "Kansai Beat", image_url: img3, total_charting_songs: "38", avg_chart_position: "4.1", best_position: "3", countries_charted: "37", genre: "J-Rock" },
      { name: "Ancient City", image_url: img4, total_charting_songs: "34", avg_chart_position: "5.0", best_position: "4", countries_charted: "34", genre: "Traditional" },
      { name: "Fashion District", image_url: img5, total_charting_songs: "31", avg_chart_position: "5.8", best_position: "5", countries_charted: "31", genre: "Electro Pop" },
      { name: "Bay City Sound", image_url: img6, total_charting_songs: "28", avg_chart_position: "6.6", best_position: "6", countries_charted: "28", genre: "City Pop" },
    ]
  },
  "south-korea": {
    songs: [
      { rank: 1, title: "Seoul Lights", artist: "K-Wave", image_url: img3, countries_charted: 48, latest_date: "2025-11-27" },
      { rank: 2, title: "Gangnam Dreams", artist: "Seoul Sound", image_url: img2, countries_charted: 45, latest_date: "2025-11-27" },
      { rank: 3, title: "Busan Nights", artist: "Coastal Korea", image_url: img1, countries_charted: 42, latest_date: "2025-11-27" },
      { rank: 4, title: "K-Pop Fever", artist: "Idol Group", image_url: img4, countries_charted: 39, latest_date: "2025-11-27" },
      { rank: 5, title: "Hongdae Vibes", artist: "Indie Seoul", image_url: img5, countries_charted: 36, latest_date: "2025-11-27" },
      { rank: 6, title: "Jeju Island", artist: "Paradise Sound", image_url: img6, countries_charted: 33, latest_date: "2025-11-27" },
      { rank: 7, title: "Incheon Flow", artist: "Airport City", image_url: img3, countries_charted: 30, latest_date: "2025-11-27" },
      { rank: 8, title: "Itaewon Nights", artist: "Global District", image_url: img2, countries_charted: 28, latest_date: "2025-11-27" },
      { rank: 9, title: "Daegu Beat", artist: "Central Korea", image_url: img1, countries_charted: 26, latest_date: "2025-11-27" },
      { rank: 10, title: "Han River", artist: "K-Wave", image_url: img4, countries_charted: 24, latest_date: "2025-11-27" },
    ],
    artists: [
      { name: "K-Wave", image_url: img3, total_charting_songs: "51", avg_chart_position: "2.5", best_position: "1", countries_charted: "48", genre: "K-Pop" },
      { name: "Seoul Sound", image_url: img2, total_charting_songs: "46", avg_chart_position: "3.1", best_position: "2", countries_charted: "45", genre: "K-Pop" },
      { name: "Coastal Korea", image_url: img1, total_charting_songs: "41", avg_chart_position: "3.9", best_position: "3", countries_charted: "42", genre: "K-R&B" },
      { name: "Idol Group", image_url: img4, total_charting_songs: "38", avg_chart_position: "4.7", best_position: "4", countries_charted: "39", genre: "K-Pop" },
      { name: "Indie Seoul", image_url: img5, total_charting_songs: "33", avg_chart_position: "5.5", best_position: "5", countries_charted: "36", genre: "K-Indie" },
      { name: "Paradise Sound", image_url: img6, total_charting_songs: "30", avg_chart_position: "6.3", best_position: "6", countries_charted: "33", genre: "K-Hip Hop" },
    ]
  },
};
