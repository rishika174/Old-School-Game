'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

type FormData = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Message sent!", {
      description: "We’ll get back to you as soon as possible.",
      duration: 3000
    });
    reset();
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", padding: 20, fontFamily: "Arial, sans-serif", background: "#fff", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ fontSize: 24, marginBottom: 20 }}>Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">Name *</label><br />
          <input
            id="name"
            {...register("name", { 
              required: "Name is required", 
              minLength: { value: 2, message: "Name must be at least 2 characters" } 
            })}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
            placeholder="Your name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email *</label><br />
          <input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" }
            })}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
            placeholder="Your email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="reason">Reason *</label><br />
          <select
            id="reason"
            defaultValue=""
            {...register("reason", { required: "Please select a reason" })}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          >
            <option value="" disabled>Select reason</option>
            <option value="feedback">Feedback</option>
            <option value="ideas">Ideas</option>
            <option value="contributions">Contributions</option>
          </select>
          {errors.reason && <p style={{ color: "red" }}>{errors.reason.message}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="message">Message *</label><br />
          <textarea
            id="message"
            {...register("message", { 
              required: "Message is required",
              maxLength: { value: 500, message: "Message cannot exceed 500 characters" }
            })}
            rows={5}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
            placeholder="Your message"
          />
          {errors.message && <p style={{ color: "red" }}>{errors.message.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: "10px 20px", 
            fontSize: 16, 
            cursor: isSubmitting ? "not-allowed" : "pointer",
            background: isSubmitting ? "#6ba5ff" : "#1d4ed8", 
            color: "#fff",
            border: "none",
            borderRadius: 4 
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>

      <Toaster />
    </div>
  );
}
