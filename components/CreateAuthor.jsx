import { useState, useEffect } from "react";
import "./CreateAuthor.css";

const CreateAuthor = ({ onCreate, currentAuthor, onUpdate }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    if (currentAuthor) {
      setName(currentAuthor.name);
      setSurname(currentAuthor.surname);
    } else {
      setName("");
      setSurname("");
    }
  }, [currentAuthor]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentAuthor) {
      onUpdate(name, surname);
    } else {
      onCreate(name, surname); 
    }
    setName("");
    setSurname("");
  };

  return (
    <fieldset className="create-author">
      <legend>{currentAuthor ? "Edit Author" : "Create New Author"}</legend>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {currentAuthor ? "Save Changes" : "Create"}
        </button>
      </form>
    </fieldset>
  );
};

export default CreateAuthor;
