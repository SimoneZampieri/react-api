import { useState, useEffect } from "react";
import axios from ('axios')

function App() {

  const initialFormData = {
    id: "",
    titolo: "",
    didascalia: "",
    categoria: "",
    immagini: "",
    tags: [],
    stato: "",
  };

  const baseApiUrl = import.meta.VITE_BASE_API_URL;
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState(initialFormData)
  
  return (
    <>
    </>
  );
}

export default App;
