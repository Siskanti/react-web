import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/back2.jpg";
import "../Styles/Toko.css";
import "../Styles/Form.css";

function Home() {
  return (
    <div>
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <p> WELCOME TO SISKASHOP</p>
        <Link to="/detailtoko">
          <button> Detail Product </button>
        </Link>  
      </div>
    </div>

    <div>
      <br></br>
    <h2>ORDER? ISI FORM DIBAWAH</h2>
    <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">No whatsApp</label>
          <input name="no whatsApp" placeholder="Enter no whatsApp..." type="no whatsApp" />
          <label htmlFor="product name">Product Name</label>
          <input name="product name" placeholder="Enter product name..." type="product name" />
          <label htmlFor="Amount">Amount</label>
          <input name="Amount" placeholder="Enter Amount..." type="Amount" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
    </div>

    </div>
    
    

    

  );
}

export default Home;