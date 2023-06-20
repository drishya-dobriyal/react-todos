const getRequest = async function (req) {
  try {
    const response = await fetch(req.url);
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error(err);
  }
};

const postRequest = async function (req) {
  try {
    const response = await fetch(req.url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error(err);
  }
};

const deleteRequest = async function (req) {
  try {
    const response = await fetch(req.url, {
      method: "DELETE",
    });
    return response;
  } catch (err) {
    return new Error(err);
  }
};

const putRequest = async function (req) {
  try {
    const response = await fetch(req.url, {
      method: "PATCH",
      body: JSON.stringify(req.body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error(err);
  }
};

module.exports = { getRequest, postRequest, deleteRequest, putRequest };
