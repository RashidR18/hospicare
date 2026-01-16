import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";

const AppointmentForm = () => {
  const { token } = useContext(Context); // 🔥 Get token from context

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 HEADER-BASED AUTH
            },
          }
        );
        setDoctors(data.doctors);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch doctors");
      }
    };

    if (token) fetchDoctors(); // only fetch if logged in
  }, [token]);

  const handleAppointment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointment/post`,
        {
          firstName,
          lastName,
          email,
          phone,
          adhar,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔥 HEADER-BASED AUTH
          },
        }
      );

      toast.success(data.message);

      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdhar("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Contact */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* DOB / ADHAR */}
        <div>
          <input
            type="number"
            placeholder="ADHAR NUMBER"
            value={adhar}
            onChange={(e) => setAdhar(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            max={new Date(
              new Date().setFullYear(new Date().getFullYear() - 18)
            )
              .toISOString()
              .split("T")[0]}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Gender / Appointment Date */}
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            min={new Date(
              new Date().setDate(new Date().getDate() + 1)
            )
              .toISOString()
              .split("T")[0]}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        {/* Department / Doctor */}
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((dep, i) => (
              <option value={dep} key={i}>
                {dep}
              </option>
            ))}
          </select>
          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [first, last] = e.target.value.split(" ");
              setDoctorFirstName(first);
              setDoctorLastName(last);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((d) => d.doctorDepartment === department)
              .map((d, i) => (
                <option key={i} value={`${d.firstName} ${d.lastName}`}>
                  {d.firstName} {d.lastName}
                </option>
              ))}
          </select>
        </div>

        {/* Address */}
        <textarea
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        {/* Previous Visit */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ width: "25px" }}
          />
        </div>

        <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
