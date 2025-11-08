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
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
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

    // Simulate submission
    alert("Application submitted successfully!");
    console.log("Form Data:", formData);

    // Optionally redirect back or to thank you page
    // router.push("/thank-you");
  };

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
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.firstName ? styles.errorInput : ""
                  }`}
                  placeholder="John"
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
                  placeholder="Doe"
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
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Upload CV (PDF) *</label>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  id="cv"
                  accept=".pdf"
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