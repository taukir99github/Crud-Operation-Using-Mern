import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import EditForm from "./Components/EditForm";

axios.defaults.baseURL = "http://localhost:8000/";

const App = () => {
  const [close, setClose] = useState(false);
  const [editSection, setEditSection] = useState(false);

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formdataedit, setFormdataedit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [datalist, setDatalist] = useState([]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/create", formdata);
      console.log(data);

      if (data.data.success) {
        setClose(false);
        // alert(data.data.message);
        setFormdata({
          name: "",
          email: "",
          mobile: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get("/");
      console.log(data);
      if (data.data.success) {
        setDatalist(data.data.data);
        getFetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  console.log(datalist);

  const handleDelete = async (id) => {

    console.log("Delete")
    try {
      const data = await axios.delete("/delete/" + id);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = async (e) => {

    console.log("Edit")
    e.preventDefault();
    const data = await axios.put("/update/", formdataedit);
    if (data.data.success) {
      console.log(data);
      getFetchData();
      // alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditchange = async (e) => {
    const { name, value } = e.target;
    setFormdataedit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEditForm = (el) => {
    setFormdataedit(el);
    setEditSection(true);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setClose(true)}>
          Add
        </button>

        {close && (
          <EditForm
            handleSubmit={handleSubmit}
            handlechange={handlechange}
            handleclose={() => setClose(false)}
            rest={formdata}
          />
        )}
        {editSection && (
          <EditForm
            handleSubmit={handleEdit}
            handlechange={handleEditchange}
            handleclose={() => setEditSection(false)}
            rest={formdataedit}
          />
        )}

        {datalist.length > 0 && (
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {datalist.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditForm(el)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-del"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {datalist.length === 0 && (
          <p style={{ textAlign: "center", fontSize: "25px" }}>No Data</p>
        )}
      </div>
    </>
  );
};

export default App;
