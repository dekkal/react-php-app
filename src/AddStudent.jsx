import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });

    let newErrors = { ...errors };

    if (name === "first_name") {
      if (!value.trim()) newErrors.first_name = "First name is required";
      else delete newErrors.first_name;
    }

    if (name === "last_name") {
      if (!value.trim()) newErrors.last_name = "Last name is required";
      else delete newErrors.last_name;
    }

    if (name === "email") {
      if (!value.trim()) newErrors.email = "Email is required";
      else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors.email = "Invalid email format";
        else delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };


  const validate = () => {
    let newErrors = {};
    if (!student.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!student.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!student.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(student.email)) {
        newErrors.email = "Invalid email format";
      }
    }
    return newErrors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const result = await axios.post(
        "http://localhost:8080/phpmysql-crud/insert.php",
        student
      );

      if (result.data.status === "valid") {
        navigate("/listStudent");
      } else {
        alert("There is a problem in adding, please try again");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error, please try later");
    }
  };

  const getInputClass = (field) => {
    if (errors[field]) return "form-control is-invalid";
    if (student[field].trim() !== "") return "form-control is-valid";
    return "form-control";
  };

  return (
    <form onSubmit={submitForm}>
      <div className="box_size">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Add Student</h1>
          </div>
        </div>

        {/* First Name */}
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="first_name">First name</label>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              id="first_name"
              name="first_name"
              className={getInputClass("first_name")}
              value={student.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
            {errors.first_name ? (
              <div className="invalid-feedback">{errors.first_name}</div>
            ) : (
              student.first_name.trim() !== "" && (
                <div className="valid-feedback">Looks good!</div>
              )
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="last_name">Last name</label>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              id="last_name"
              name="last_name"
              className={getInputClass("last_name")}
              value={student.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
            />
            {errors.last_name ? (
              <div className="invalid-feedback">{errors.last_name}</div>
            ) : (
              student.last_name.trim() !== "" && (
                <div className="valid-feedback">Looks good!</div>
              )
            )}
          </div>
        </div>

        {/* Email */}
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-md-6">
            <input
              type="email"
              id="email"
              name="email"
              className={getInputClass("email")}
              value={student.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email ? (
              <div className="invalid-feedback">{errors.email}</div>
            ) : (
              student.email.trim() !== "" && (
                <div className="valid-feedback">Looks good!</div>
              )
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="row mt-3">
          <div className="col-md-12">
            <input
              type="submit"
              className="btn btn-warning"
              value="Add Student"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddStudent;
