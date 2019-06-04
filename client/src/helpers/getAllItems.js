import axios from "axios";

function getAllItems() {
  const items = axios
    .get("/api/products/all")
    .then(res => res.data)
    .catch(err => console.log(err));

  return items;
}

export default getAllItems;
