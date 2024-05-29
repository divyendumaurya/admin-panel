import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';

function ContactForm() {
  const [state, handleSubmit] = useForm("mbjnenjg");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (state.succeeded) {
    return (
      <div>
        {showSuccessMessage ? (
          <p className="text-green-500">Your message has reached us!</p>
        ) : (
          <p className="text-green-500">Thanks for joining!</p>
        )}
        <Link
          className="text-blue-500 underline"
          to="/contact"
          onClick={() => {
            state.resetForm();
            setShowSuccessMessage(false);
          }}
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-500 text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-500 text-sm"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <ContactForm />
    </div>
  );
}

export default Contact;