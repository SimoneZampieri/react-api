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

  const imgErrHand = (e) => {
    e.target.src = "https://picsum.photos/200/300";
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    const tags = formData.tags.split(",").map((tag) => tag.trim());
    const newPost = { ...formData, tags: tags };
    axios.post(`${baseApiUrl}/posts`, newPost);
    .then(res => {
      fetchPosts()
      setFormData(initialFormData)
    })
  };

  const deleteHand = (id) =>{
    axios.delete(`${baseApiUrl}/posts/${id}`)
    .then(() => {
      fetchPosts();
    });
  }

  useEffect(() =>{
    fetchPosts()
  }, [])

  return (
    <>
      <div className="container">
        <h1>Elenco Post</h1>
        <div className="row">
          <div className="container mt-4">
            <h3>Inserisci nuovo Post</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="titolo" className="form-control">Titolo</label>
              <input type="text" className="form-control" id="titolo" name="titolo" value={formData.titolo}/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
