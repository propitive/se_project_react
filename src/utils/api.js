import { processServerResponse } from "./weatherApi";

const baseUrl = "http://localhost:3001";

const getItemList = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};

const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(processServerResponse);
};

const removeItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};

export const api = {
  getItemList,
  addItem,
  removeItem,
};
