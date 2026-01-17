import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/message/getall`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    fetchMessages();
  }, [token]);

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div className="card" key={msg._id}>
              <div className="details">
                <p>First Name: <span>{msg.firstName}</span></p>
                <p>Last Name: <span>{msg.lastName}</span></p>
                <p>Email: <span>{msg.email}</span></p>
                <p>Phone: <span>{msg.phone}</span></p>
                <p>Message: <span>{msg.message}</span></p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
