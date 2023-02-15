export const API_URL =
  'https://project-happy-thoughts-api-production.up.railway.app/thoughts';

export const LIKES_URL = (thoughtId) =>
  `https://project-happy-thoughts-api-production.up.railway.app/thoughts/${thoughtId}/like`;

export const DELETE_URL = (thoughtId) =>
  `https://project-happy-thoughts-api-production.up.railway.app/thoughts/${thoughtId}`;
