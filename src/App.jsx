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
              <div className="mb-3">
                <label htmlFor="titolo" className="form-control">Titolo</label>
                <input type="text" className="form-control" id="titolo" name="titolo" value={formData.titolo} onChange={inputHandler}/> 
              </div>
              <div className="mb-3">
                <label htmlFor="didascalia" className="form-control">Didascalia</label>
                <input type="text" className="form-control" id="didascalia" name="didascalia" value={formData.didascalia} onChange={inputHandler}/>
              </div>
              <div className="mb-3">
                <label htmlFor="immagini" className="form-control">Link Immagine</label>
                <input type="text" className="form-control" id="immagini" name="immagini" value={formData.immagini} onChange={inputHandler}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-control">Tags</label>
                <input type="text" className="form-control" id="tags" name="tags" value={formData.tags} onChange={inputHandler}/>
              </div>
              <button type="submit" className="btn btn-warning">Vai!</button>
            </form>
          </div>
          <div className="container my-4">
            {posts.map(post => (
              <div className="card" key={post.id}>
              <img src={post.immagini} className="card-img-top" alt={post.titolo} onError={imgErrHand}>
              <div className="card-body">
                <h5 className="card-title">{post.titolo}</h5>
                <p className="card-text">{post.didascalia}</p>
                <p className="card-text">Tags:{post.tags.join(',')}</p>
                <a href="#" class="btn btn-warning" onClick={() => deleteHand(post.id)}>Elimina Post</a>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
