export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://127.0.0.1:1337';
