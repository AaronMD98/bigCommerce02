'use client';
import React, { FormEvent, useState } from 'react';
import { Button } from '../ui/button';

function Subscribe({ source = 'storefront' }: { source: string }) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit behavior

    // console.log('Email:', email);
    // console.log('Firstname:', firstName);
    // Setup the request options
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        source: source,
      }),
    };

    try {
      const response = await fetch('/api/subscribe', requestOptions);

      const data = await response.json();

      //   console.log(data);

      if (response.ok) {
        alert('Thank you for subscribing!');
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="newsletter-form"
      className="mb-12 flex w-full flex-col items-center justify-center gap-12 rounded-md border-2 py-12 shadow-md"
    >
      <h1 className="text-2xl font-semibold md:text-4xl">Subscribe to our emailing list!</h1>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="w-3/4 rounded-md border-2 px-4 py-2"
        required
        autoComplete="additional-name"
      />{' '}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-3/4 rounded-md border-2 px-4 py-2"
        required
        autoComplete="email"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      >
        Subscribe
      </button>
    </form>
  );
}

export default Subscribe;
