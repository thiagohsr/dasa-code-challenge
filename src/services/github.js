import axios from "axios";
import { GITHUB_USER_REPOS } from "@/constants/urls";

const getUserRepositories = async user =>
  await axios
    .get(GITHUB_USER_REPOS.replace("{{username}}", user))
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
