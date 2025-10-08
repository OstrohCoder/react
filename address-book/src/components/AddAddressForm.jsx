import { useState } from "react";

const AddAddressForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    ["firstName", "lastName", "phone"].forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = `The ${field.replace(/[A-Z]/g, (m) => " " + m.toLowerCase())} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ firstName: "", lastName: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First name"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      {errors.firstName && <div style={{ color: "red" }}>{errors.firstName}</div>}

      <input
        type="text"
        placeholder="Last name"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      {errors.lastName && <div style={{ color: "red" }}>{errors.lastName}</div>}

      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}

      <button type="submit" disabled={loading}>Add contact</button>
    </form>
  );
};

export default AddAddressForm;
