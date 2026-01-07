import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
    <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="about.png" />
        </div>
        <div className="banner">
          <p></p>
          <h3>Who We Are</h3>
          <p>
          In the ever-evolving healthcare landscape, 
          managing patient appointments efficiently is crucial for ensuring high-quality 
          care and smooth operations. The Hospicare Appointments Management is an advanced 
          digital solution designed to streamline appointment scheduling, reduce administrative burden,
           and enhance the patient experience.
            Whether it's a small clinic or a large hospital,
             Hospicare is tailored to meet the needs of healthcare providers and patients alike,
              improving both operational efficiency and satisfaction.
          </p>
          <p></p>
          <p>Benefits of the Hospicare Appointments Management System</p>
          <p>
          
Improved Efficiency & Time Management

By automating scheduling and appointment reminders, the Hospicare AMS reduces manual errors and administrative workload.
Enhanced Patient Experience


Optimized Resource Utilization





Hospicare AMS is designed to grow with your practice. Whether you're running a small clinic or a multi-location hospital, the system scales to accommodate your needs, ensuring consistency and efficiency as you expand.
Secure Data & Compliance

Data security is a top priority for Hospicare. The system complies with healthcare data regulations (such as HIPAA in the U.S.) to ensure patient information is securely stored and protected, giving healthcare providers and patients peace of mind.
          </p>
          <p></p>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default Biography;