const URL = "https://api.github.com/orgs/adalab/members?per_page=25";

const getDataList = () => {
  return fetch(URL).then(res => res.json());
};
export default getDataList;
