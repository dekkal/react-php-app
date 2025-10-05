import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function EditStudent() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/phpmysql-crud/view.php`);
      const stu = result.data.find((s) => s.id === parseInt(id));
      if (stu) setStudent(stu);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/phpmysql-crud/update.php", { id, ...student });
      if (result.data.status === "valid") {
        navigate("/ListStudent");
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Student</h1>
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            value={student.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            value={student.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={student.email}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
