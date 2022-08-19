import React from "react";

function ContactUs() {
  return (
    <div className="contact-us-container">
      <h1>contact us</h1>
      <div className="contact-us">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          earum excepturi accusamus cupiditate! Pariatur sint molestiae ab
          tempora a aliquid expedita, labore consectetur eum voluptates, quos
          qui dignissimos fugiat quae.
        </p>
        <div className="contact-us-form">
          <input type="text" placeholder="enter your name" />
          <input type="email" placeholder="enter your email" />
          <input type="text" placeholder="about yourself" />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
