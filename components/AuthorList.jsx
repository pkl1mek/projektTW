import "./AuthorsList.css";

import React from "react";

const AuthorsList = ({ authors, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>{author.surname}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(author)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(author.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuthorsList;
