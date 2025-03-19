'use client';

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", status: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>RSVP for the Event</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          required 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          required 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        />
        <select 
          required 
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option value="">Select</option>
          <option value="confirmed">Confirm</option>
          <option value="declined">Decline</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
