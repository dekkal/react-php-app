import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
function ListStudent() {
  const [students, setStudents] = useState([]); // liste des étudiants

  // Charger les étudiants au montage
  useEffect(() => {
    loadUsers();
  }, []);


 const navigate = useNavigate();
  // Fonction pour charger les étudiants
  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/phpmysql-crud/view.php");
      setStudents(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      setStudents([]);
    }
  };

  // Fonction pour supprimer un étudiant
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const result = await axios.post("http://localhost:8080/phpmysql-crud/delete.php", { id });
        if (result.data.status === "valid") {
          loadUsers(); // recharge la liste après suppression
        } else {
          alert("Erreur lors de la suppression : " + result.data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 text-center mb-3">
          <h1>Student List</h1>
        </div>
      </div>

      {/* entête */}
      <div className="row fw-bold border-bottom py-2">
        <div className="col-md-1">#</div>
        <div className="col-md-3">First name</div>
        <div className="col-md-3">Last name</div>
        <div className="col-md-3">Email</div>
        <div className="col-md-2">Actions</div>
      </div>

      {/* lignes étudiants */}
      {students.length > 0 ? (
        students.map((stu, index) => (
          <div className="row py-2 border-bottom" key={stu.id}>
            <div className="col-md-1">{index + 1}</div>
            <div className="col-md-3">{stu.first_name}</div>
            <div className="col-md-3">{stu.last_name}</div>
            <div className="col-md-3">{stu.email}</div>
            <div className="col-md-2">
                  <button
    className="btn btn-primary btn-sm me-2"
    onClick={() => navigate(`/EditStudent/${stu.id}`)}
  >
    Edit
  </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteStudent(stu.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="row mt-3">
          <div className="col-md-12 text-center">No students found</div>
        </div>
      )}
    </div>
  );
}

export default ListStudent;
