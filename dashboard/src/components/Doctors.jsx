import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, token } = useContext(Context); // get token from context

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!token) return; // skip if not authenticated
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, [token]); // refetch if token changes

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors.length > 0 ? (
          doctors.map((element) => (
            <div className="card" key={element._id}>
              <img src={element.docAvatar?.url} alt="doctor avatar" />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>Email: <span>{element.email}</span></p>
                <p>Phone: <span>{element.phone}</span></p>
                <p>DOB: <span>{element.dob?.substring(0, 10)}</span></p>
                <p>Department: <span>{element.doctorDepartment}</span></p>
                <p>Adhar: <span>{element.adhar}</span></p>
                <p>Gender: <span>{element.gender}</span></p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
