import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const initialFormData = {
    id: "",
    title: "",
    content: "",
    image: "",
    tags: [],
  };

  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const fetchPosts = () => {
    axios
      .get(`${baseApiUrl}/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const imgErrHand = (e) => {
    e.target.src = "https://picsum.photos/100/100";
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(",").map((tag) => tag.trim());
    const newPost = { ...formData, tags: tags };
    axios
      .post(`${baseApiUrl}/posts`, newPost)
      .then((res) => {
        fetchPosts();
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const deleteHand = (id) => {
    axios
      .delete(`${baseApiUrl}/posts/${id}`)
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Elenco Post</h1>
        <div className="row">
          <div className="container mt-4">
            <h3>Inserisci nuovo Post</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-control">
                  Titolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-control">
                  Didascalia
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-control">
                  Link Immagine
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-control">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={inputHandler}
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Vai!
              </button>
            </form>
          </div>
          <div className="container my-4">
            {posts.map((post) => (
              <div className="card" key={post.id}>
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.title}
                  onError={imgErrHand}
                ></img>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <p className="card-text">Tags:{post.tags.join(",")}</p>
                  <a
                    href="#"
                    className="btn btn-warning"
                    onClick={() => deleteHand(post.id)}
                  >
                    Elimina Post
                  </a>
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
