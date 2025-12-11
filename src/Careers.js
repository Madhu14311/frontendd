// src/Careers.js
import React, { useState } from "react";
import image2 from "./image2.jpg";
import axios from "axios";
import { FaFacebookF, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Careers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    message: "",
    file: null,
  });

  const openModal = (job) => {
    setCurrentJob(job);
    setFormData({ ...formData, job: job });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentJob("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("job", formData.job);
    fd.append("message", formData.message);
    fd.append("file", formData.file);

    try {
      await axios.post("https://bliss-3.onrender.com/formData", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowPopup(true);
      setModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        job: "",
        message: "",
        file: null,
      });
    } catch (err) {
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <>
      {/* STYLES */}
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Roboto',sans-serif;}
        body { background:#f3f4f6; color:#111827; }
        a { text-decoration:none; color:inherit; }

        .hero {
          background-color:#022158;
          color:#fff;
          text-align:center;
          padding:40px 20px;
        }
        .hero h1 { font-family:'Montserrat',sans-serif; font-size:36px; margin-bottom:10px; }
        .hero p { font-size:20px; opacity:0.9; }

        .why-work { padding:80px 5%; background:#f8f9fc; }

        .why-container { max-width:1200px; margin:10px auto; display:flex; gap:20px; flex-wrap:wrap; }
        .why-text { flex:1; }
        .why-text h2 { font-size:36px; color:#1e3a8a; margin-bottom:10px; }
        .why-text p { font-size:18px; line-height:1.8; }

        .why-image img { width:100%; max-width:450px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); }

        @media(max-width:900px){
          .why-container{ flex-direction:column; text-align:center; }
        }

        .jobs { text-align:center; font-size:28px; color:#1e3a8a; margin-top:20px; }
        .open-positions { max-width:1200px; margin:60px auto; display:flex; flex-wrap:wrap; gap:30px; padding:0 20px; }
        .job-card {
          background:#fff;
          flex:1 1 300px;
          max-width:350px;
          padding:30px 20px;
          border-radius:12px;
          box-shadow:0 4px 12px rgba(0,0,0,0.1);
          text-align:center;
          transition:0.3s;
        }
        .job-card:hover { transform:translateY(-8px); }

        .apply-btn {
          padding:12px 25px;
          background:green;
          color:#fff;
          border-radius:8px;
          font-weight:bold;
          cursor:pointer;
          transition:0.2s;
        }

        .modal {
          display:${modalOpen ? "flex" : "none"};
          position:fixed;
          top:0; left:0; width:100%; height:100%;
          background:rgba(0,0,0,0.7);
          justify-content:center;
          align-items:center;
          z-index:1000;
          padding:20px;
        }

        .modal-content {
          background:#fff;
          width:100%;
          max-width:600px;
          padding:25px;
          border-radius:12px;
          position:relative;
        }

        .close { font-size:28px; cursor:pointer; position:absolute; right:20px; top:10px;}

        .popup-bg {
          position:fixed;
          top:0; left:0; width:100%; height:100%;
          background:rgba(0,0,0,0.6);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:2000;
        }

        .popup-box {
          background:#fff;
          padding:25px 30px;
          border-radius:15px;
          text-align:center;
          width:85%;
          max-width:350px;
          box-shadow:0 4px 20px rgba(0,0,0,0.2);
          animation:pop 0.3s ease;
        }
        @keyframes pop { from{transform:scale(0.8); opacity:0;} to{transform:scale(1); opacity:1;} }

        .apply-form { display:flex; flex-direction:column; gap:15px; margin-top:10px; }
        .apply-form input, .apply-form select, .apply-form textarea {
          padding:12px;
          border:1px solid #ccc;
          border-radius:8px;
          background:#fafafa;
        }

        .apply-form button {
          padding:12px;
          background:#1e3a8a;
          color:#fff;
          border:none;
          border-radius:8px;
          font-size:16px;
          cursor:pointer;
        }
      `}</style>

      {/* HEADER */}
      <section className="hero">
        <h1>Careers at BlissSierra</h1>
        <p>Join our team and help us secure the digital horizon</p>
      </section>

      {/* WHY WORK WITH US */}
      <section className="why-work">
        <div className="why-container">
          <div className="why-text">
            <h2>Why Work With Us</h2>
            <p>
              At BlissSierra, we foster innovation, collaboration, and growth.
              Our employees work on cutting-edge projects in cybersecurity,
              web development, and digital solutions. Join us and make an impact.
            </p>
          </div>
          <div className="why-image">
            <img src={image2} alt="Work With Us" />
          </div>
        </div>
      </section>

      {/* JOB CARDS */}
      <section className="jobs">
        <h2>Open Positions</h2>
        <div className="open-positions">
          {[
            { title: "Cybersecurity Analyst", desc: "Monitor & secure digital systems." },
            { title: "Java Developer", desc: "Develop scalable Java applications." },
            { title: "Web Developer", desc: "Create responsive, modern websites." },
          ].map((job, idx) => (
            <div key={idx} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.desc}</p>
              <button className="apply-btn" onClick={() => openModal(job.title)}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Apply for {currentJob}</h3>

            <form className="apply-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
              <select name="job" value={formData.job} onChange={handleChange}>
                <option value="">Select Job Position</option>
                <option>Cybersecurity Analyst</option>
                <option>Java Developer</option>
                <option>Web Developer</option>
              </select>
              <textarea name="message" rows="4" placeholder="Why should we hire you?" required value={formData.message} onChange={handleChange}></textarea>
              <input type="file" name="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} />
              <button type="submit">Submit Application</button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-bg">
          <div className="popup-box">
            <h3>Application Submitted!</h3>
            <p>Our team will get back to you soon.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#022158", color: "#fff", padding: "40px 20px" }}>
        <div className="footer-container">
          <div className="footer-col">
            <h3>BlissSierra</h3>
            <p>We deliver the best services for your business.</p>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/who-we-are">Who We Are</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/insights">Insights</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Us</h3>
            <p>KSR Nest, Kakateeya Hills, Madhapur, Hyderabad</p>
            <p>Email: <a href="mailto:blisssierra177@gmail.com">blisssierra177@gmail.com</a></p>
            <p>Phone: <a href="tel:+91-9848532222">+91-9848532222</a></p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61584931498008"><FaFacebookF /></a>
              <a href="https://www.instagram.com/blisssierra1/"><FaInstagram /></a>
              <a href="https://www.linkedin.com/feed/"><FaLinkedin /></a>
              <a href="https://wa.me/919848532222"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Careers;
