// pages/registration/index.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import styles from "./Registration.module.scss";

const Registration = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cv: null,
      });
  const [errors, setErrors] = useState({});

  // Detect mobile (same logic as your other pages)
  React.useEffect(() => {
    const check = () => {
      const mobile =
        /Android|iPhone|iPad/i.test(navigator.userAgent) ||
        window.innerWidth <= 1440;
      setIsMobile(mobile);
    };
    check(); //The function to call when resize happens

    window.addEventListener("resize", check);    //listening for window size changes
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleInputChange = (e) => { //function that runs when user types in an input field
    const { name, value } = e.target;// This is equivalent to:  const name = e.target.name;   const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, cv: file }));
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: "" }));
  };

 const validate = () => {
  const newErrors = {};
  const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
  const phoneRegex = /^\+962[789]\d{8}$/; // +962 then 7/8/9 then 8 more digits
  
  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
  } else if (!nameRegex.test(formData.firstName.trim())) {
    newErrors.firstName = "First name should only contain letters";
  }
  
  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  } else if (!nameRegex.test(formData.lastName.trim())) {
    newErrors.lastName = "Last name should only contain letters";
  }
  
  if (!formData.email.trim()) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Email is invalid";
    
  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
  } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
    newErrors.phoneNumber = "Phone must be +962 followed by 7/8/9 and 8 digits";
  }
  
  if (!formData.cv) newErrors.cv = "CV is required";
  return newErrors;
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Application submitted successfully!");
    console.log("Form Data:", formData);


  };
//noValidate → disables default HTML5 validation
  return (
    <>
      {isMobile ? <MobileNavBar /> : <DesktopNavBar />}

      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Apply for this role</h1>
            <p className={styles.subtitle}>
              We’re excited you’re interested in joining us. Please fill out the
              form below.
            </p>
          </div>
  

          
          <form onSubmit={handleSubmit} className={styles.form} noValidate>  
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>First Name *</label>
                <input
                  type="text"   //means it’s a normal text box
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.firstName ? styles.errorInput : ""
                  }`}
                  placeholder="Mahmoud"
                />
                {errors.firstName && (
                  <span className={styles.error}>{errors.firstName}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.lastName ? styles.errorInput : ""
                  }`}
                  placeholder="Moath"
                />
                {errors.lastName && (
                  <span className={styles.error}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  errors.email ? styles.errorInput : ""
                }`}
                placeholder="Mahmoud.doe@example.com"
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      errors.phoneNumber ? styles.errorInput : ""
                    }`}
                    placeholder="+962791234567"
                  />
                  {errors.phoneNumber && (
                    <span className={styles.error}>{errors.phoneNumber}</span>
                  )}
                </div>
            <div className={styles.field}>
              <label className={styles.label}>Upload CV (PDF) *</label>
              <div className={styles.fileUpload}>
                <input
                  type="file" //file selector
                  id="cv"
                  accept=".pdf" // Only allows PDF files to be selected
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <label htmlFor="cv" className={styles.fileLabel}>
                  {formData.cv ? (
                    <span className={styles.fileName}>
                      {formData.cv.name}
                    </span>
                  ) : (
                    <>
                      <span className={styles.uploadText}>
                        Drag & drop or click to upload
                      </span>
                      <span className={styles.uploadSubtext}>
                        PDF up to 10MB
                      </span>
                    </>
                  )}
                </label>
              </div>
              {errors.cv && <span className={styles.error}>{errors.cv}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;