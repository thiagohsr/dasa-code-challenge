import axios from "axios";

const getRepositories = async url =>
  await axios
    .get(url)
    .then(result => result)
    .catch(error => error);

export { getRepositories };
