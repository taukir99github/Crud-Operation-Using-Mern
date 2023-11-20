import React from "react";
import "../App.css";
import { AiOutlineClose } from "react-icons/ai";

const EditForm = ({ handleSubmit, handlechange, handleclose, rest }) => {
  return (
    <div className="Add-container">
      <form onSubmit={handleSubmit}>
        <div className="icons" onClick={handleclose}>
          <AiOutlineClose />
        </div>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handlechange}
          value={rest.name}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handlechange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile:</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handlechange}
          value={rest.mobile}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
