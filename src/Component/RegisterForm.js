import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Importing necessary libraries for routing and navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling
import Cookies from 'js-cookie';

import "./RegisterForm.css"; 

const RegisterForm = () => {
  // Define state using useState hook for the form fields
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [gender, setGender] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [Aboutyourself, setAboutyourself] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false); // Flag to show error message
  const [errorMsg, setErrorMsg] = useState(''); // To store the error message
  const [redirectToHome, setRedirectToHome] = useState(false); // Flag to trigger redirection to login page

  // Handler functions to update state for each form field
  const handleFullNameChange = (event) => setFullname(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleCompanyChange = (event) => setCompany(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleDateOfBirthChange = (event) => setDateOfBirth(event.target.value);
  const handleCountryChange = (event) => setCountry(event.target.value);
  const handleAboutYourselfChange = (event) => setAboutyourself(event.target.value);

  // Function to handle successful form submission and redirect to login page
  const handleFormSubmitSuccess = () => setRedirectToHome(true);

  // Function to handle failure in form submission and display error message
  const handleFormSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  // Submit form handler function - Sends data to the backend
  const handleFormSubmission = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    // Check if any required field is empty and show an error message if so
    if (!fullname || !email || !company || !gender || !dateofbirth || !country || !Aboutyourself) {
      handleFormSubmitFailure("All fields are required.");
      return;
    }

    // Prepare user data to be sent to the server
    const userDetails = { fullname, email, company, gender, dateofbirth, country, Aboutyourself };

    // Define the API endpoint and request options
    const url = 'http://localhost:5000/signup';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify that we're sending JSON data
      },
      body: JSON.stringify(userDetails), // Convert the user details to JSON
    };

    // Make the POST request to the backend
    const response = await fetch(url, options);
    const data = await response.json(); // Parse the JSON response

    // Handle response based on status
    if (response.ok) {
      handleFormSubmitSuccess(); // On success, redirect to login page
    } else {
      handleFormSubmitFailure(data.message || "Something went wrong."); // Show error message on failure
    }
  };

  // If the form submission was successful and the user should be redirected
  const navigate = useNavigate()
  const onHandlelogin = () =>{
    navigate('/')

  }
 

  return (
    <div className="register-form-wrapper">
      <div className="register-form-content">
        <div className="register-form-left">
          <h1 className="form-title">Sign up</h1>
          <p className="form-description">Already have an account?<span className="login-link " onClick={onHandlelogin}>Sign in here</span></p>
        </div>
        <form className="register-form" onSubmit={handleFormSubmission}>
          <hr className="form-separator" />
          {showSubmitError && <p className="form-error-message">{errorMsg}</p>} {/* Display error message if submission failed */}
          <div className="form-input-group">
            <label className="input-label" htmlFor="fullname">FULLNAME</label>
            <input
              type="text"
              id="fullname"
              className="input-field"
              value={fullname}
              onChange={handleFullNameChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label className="input-label" htmlFor="email">WORK EMAIL</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label className="input-label" htmlFor="gender">GENDER</label>
            <select
              id="gender"
              className="select-field"
              value={gender}
              onChange={handleGenderChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-input-group">
            <label className="input-label" htmlFor="dateofbirth">DATE OF BIRTH</label>
            <input
              type="date"
              id="dateofbirth"
              className="input-field"
              value={dateofbirth}
              onChange={handleDateOfBirthChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label className="input-label" htmlFor="country">COUNTRY</label>
            <input
              type="text"
              id="country"
              className="input-field"
              value={country}
              onChange={handleCountryChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label className="input-label" htmlFor="company">COMPANY</label>
            <input
              type="text"
              id="company"
              className="input-field"
              value={company}
              onChange={handleCompanyChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label className="input-label" htmlFor="aboutyourself">ABOUT YOURSELF</label>
            <textarea
              id="aboutyourself"
              className="textarea-field"
              value={Aboutyourself}
              onChange={handleAboutYourselfChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Register</button> {/* Submit button */}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm; // Export the component for use in other parts of the app
