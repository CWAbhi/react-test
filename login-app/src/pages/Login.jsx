import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'username') {
      if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)) {
        error = 'Username must be alphanumeric with special characters.';
      }
    } else if (name === 'password') {
      if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)) {
        error = 'Password must be alphanumeric with special characters.';
      } else if (value === formData.username) {
        error = 'Password cannot be the same as username.';
      }
    }
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    Object.keys(formData).forEach(key => validateField(key, formData[key]));
    return { ...errors, ...newErrors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      alert('Login successful!'); // Placeholder for actual login logic
      // Navigate to a dashboard or stay, as not specified
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Login</h2>
        <p>Sign in to continue</p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showToggle={true}
        />
        <button type="submit">Login</button>
      </form>
      <div className="link">
        Don't have an account? <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Login;