export const API_URL =
  'https://project-happy-thoughts-api-363is6kojq-uc.a.run.app/thoughts';

export const LIKES_URL = (thoughtId) =>
  `https://project-happy-thoughts-api-363is6kojq-uc.a.run.app/thoughts/${thoughtId}/like`;

export const DELETE_URL = (thoughtId) =>
  `https://project-happy-thoughts-api-363is6kojq-uc.a.run.app/thoughts/${thoughtId}`;
