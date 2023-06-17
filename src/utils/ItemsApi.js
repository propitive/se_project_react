export default function itemsApi(currentUser) {
  function _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error${res.status}`);
  }

  const baseUrl = "http://localhost:3001";

  const token = localStorage.getItem("jwt");

  // console.log(currentUser);

  return {
    get: () => {
      return fetch(`${baseUrl}/items`)
        .then(_checkResponse)
        .then((data) => {
          const cards = data.data;
          return cards.map((card) => ({
            ...card,
          }));
        });
    },

    add: (name, imageUrl, weather) => {
      const body = {
        name,
        imageUrl,
        weather,
        owner: currentUser._id,
        likes: [],
      };
      return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }).then(console.log(body));
    },
    remove: (id) => {
      return fetch(`${baseUrl}/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(_checkResponse);
    },
    addCardLike: (id, userId) => {
      console.log({ id, userId });
      const body = { likes: [] };

      body.likes.push(userId);

      return fetch(`${baseUrl}/items/${id}/likes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }).then(_checkResponse);
    },
    removeCardLike: (id) => {
      return fetch(`${baseUrl}/items/${id}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ likes: [] }),
      }).then(_checkResponse);
    },
  };
}
