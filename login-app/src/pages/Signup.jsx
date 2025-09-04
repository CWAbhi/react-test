import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name must contain only alphabets and spaces.';
        }
        break;
      case 'username':
        if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)) {
          error = 'Username must be alphanumeric with special characters.';
        }
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = 'Invalid email format.';
        }
        break;
      case 'phone':
        if (!/^\+\d{1,3}\s?\d{4,14}$/.test(value)) {
          error = 'Phone must include country code (e.g., +1 1234567890).';
        }
        break;
      case 'password':
        if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)) {
          error = 'Password must be alphanumeric with special characters.';
        } else if (value === formData.username) {
          error = 'Password cannot be the same as username.';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      validateField(key, formData[key]);
    });
    return { ...errors, ...newErrors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      // Simulate successful signup
      alert('Signup successful! Redirecting to login.');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Create New Account</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label="Phone No."
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormInput
          label="New Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showToggle={true}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          showToggle={true}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;