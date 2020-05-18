export const TOKEN_KEY = "@chat-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;