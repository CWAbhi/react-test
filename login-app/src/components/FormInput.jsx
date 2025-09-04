import { useState } from 'react';

const FormInput = ({ label, type, name, value, onChange, error, showToggle = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className={showToggle ? 'password-wrapper' : ''}>
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {showToggle && (
          <span className="eye-icon" onClick={togglePassword}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormInput;