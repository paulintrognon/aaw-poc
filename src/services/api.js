import axios from 'axios';
import config from 'config';

export const api = axios.create({
  baseURL: config.api.host,
  withCredentials: true,
});

export function createNewPlayer(name) {
  return api.post('/game/player', { name });
}

export function fetchPlayerBoard() {
  return api.get('/board/get');
}

export function moveOwnPlayer(coordinates) {
  return api.post('/players/own/move', { coordinates });
}
