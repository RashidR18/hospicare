import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, admin, token } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) return; // skip if not authenticated

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/appointment/getall`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(data.appointments);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch appointments");
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [token]); // re-fetch if token changes

  const handleUpdateStatus = async (appointmentId, status) => {
    if (!token) return;

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>U Are Landed On Admin DashBoard.</p>
          </div>
        </div>
      </div>

      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
  {appointments.length > 0 ? (
    appointments.map((appointment) => (
      <tr key={appointment._id}>
        <td colSpan="6" className="row-scroll-wrapper">
          <div className="row-scroll">
            <div className="cell">{appointment.firstName} {appointment.lastName}</div>
            <div className="cell">{appointment.appointment_date.substring(0, 16)}</div>
            <div className="cell">
              {appointment.doctor.firstName} {appointment.doctor.lastName}
            </div>
            <div className="cell">{appointment.department}</div>
            <div className="cell">
              <select
                className={
                  appointment.status === "Pending"
                    ? "value-pending"
                    : appointment.status === "Accepted"
                    ? "value-accepted"
                    : "value-rejected"
                }
                value={appointment.status}
                onChange={(e) =>
                  handleUpdateStatus(appointment._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="cell">
              {appointment.hasVisited ? (
                <GoCheckCircleFill className="green" />
              ) : (
                <AiFillCloseCircle className="red" />
              )}
            </div>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No Appointments Found!
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </section>
  );
};

export default Dashboard;
