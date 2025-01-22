import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const initialFormData = {
    id: "",
    titolo: "",
    didascalia: "",
    immagini: "",
    tags: [],
  };

  const baseApiUrl = import.meta.VITE_BASE_API_URL;
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const fetchPosts = () =>
    axios.get(`${baseApiUrl}/posts`).then((res) => setPosts(res.data));

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="container">
        <h1>Elenco Post</h1>
        <div className="row"></div>
      </div>
    </>
  );
}

export default App;
