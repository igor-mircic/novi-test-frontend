import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(firstName, lastName, email, password);
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Registration</h3>

      <label>First name:</label>
      <input
        type="text"
        required
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last name:</label>
      <input
        type="text"
        required
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label>Email address:</label>
      <input
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        required
        minLength={6}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
