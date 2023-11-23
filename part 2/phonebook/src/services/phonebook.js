import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  console.log(request);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      setError(
        `Information of ${newObject.name} has already been removed from the server`
      );
      setTimeout(() => {
        setError(null);
      }, 5000);
    });
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
