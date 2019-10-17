import axios from "axios";
import { USER_REPOS_URL } from "@/constants/urls";

const getUserRepositories = async user =>
  await axios
    .get(USER_REPOS_URL.replace("{{username}}", user))
    .then(result => result)
    .catch(error => error);

const getRepositories = async url =>
  await axios
    .get(url)
    .then(result => result)
    .catch(error => error);

const getRepositoriesFromPagination = async url =>
  await axios
    .get(url)
    .then(result => result)
    .catch(error => error);

export { getRepositories, getUserRepositories, getRepositoriesFromPagination };
