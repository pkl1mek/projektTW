import { useEffect, useState } from "react";
import CreateAuthor from "./components/CreateAuthor";
import AuthorsList from "./components/AuthorList";
import "./styles.css";

const API_URL = "http://localhost:8000";

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error("Error fetching authors:", error));
  };

  const onDeleteAuthorClickHandler = (id) => {
    fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setAuthors((prevAuthors) =>
            prevAuthors.filter((author) => author.id !== id)
          );
        } else {
          console.error("Failed to delete author:", res.statusText);
        }
      })
      .catch((error) => console.error("Error deleting author:", error));
  };

  const onCreateAuthorClickHandler = (name, surname) => {
    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to create author");
        }
      })
      .then((data) => {
        setAuthors((prevAuthors) => [...prevAuthors, data]);
        console.log("New author created:", data);
      })
      .catch((error) => console.error("Error creating author:", error));
  };

  const onEditAuthorClickHandler = (author) => {
    setCurrentAuthor(author);
  };

  const onUpdateAuthorClickHandler = (name, surname) => {
    fetch(`${API_URL}/authors/${currentAuthor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Author updated successfully", data);
        setCurrentAuthor(null); 
        fetchAuthors(); 
      })
      .catch((error) => console.error("Error updating author:", error));
  };

  return (
    <div className="app">
      <div style={{ marginBottom: "50px" }}>
        <CreateAuthor
          onCreate={onCreateAuthorClickHandler}
          currentAuthor={currentAuthor}
          onUpdate={onUpdateAuthorClickHandler}
        />
      </div>
      <AuthorsList
        authors={authors}
        onDelete={onDeleteAuthorClickHandler}
        onEdit={onEditAuthorClickHandler}
      />
    </div>
  );
}
