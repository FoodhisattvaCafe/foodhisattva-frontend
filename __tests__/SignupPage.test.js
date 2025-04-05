// __tests__/SignupPage.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the SignupPage component.
// Adjust the path as needed to match your project structure.
const SignupPage = require('../src/app/signup/page').default;

describe('Signup Page', () => {
  // Test case 1: Verify that the signup form renders the required fields.
  test('renders signup form with required fields and signup button', () => {
    render(<SignupPage />);
    
    // Check for the presence of form fields. Adjust these labels if necessary.
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    
    // Check for the signup button (assumes the button text includes "Sign Up").
    expect(screen.getByRole('button', { name: /sign ?up/i })).toBeInTheDocument();
  });

  // Test case 2: Ensure that validation errors are shown when the form is submitted empty.
  test('displays validation errors when form is submitted empty', async () => {
    render(<SignupPage />);
    
    // Click the signup button without filling in the form.
    fireEvent.click(screen.getByRole('button', { name: /sign ?up/i }));
    
    // Check for validation error messages.
    // Adjust these messages to match your component's error texts.
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/confirm password is required/i)).toBeInTheDocument();
  });

  // Test case 3: Verify successful signup when valid data is provided.
  test('submits the form successfully with valid input', async () => {
    render(<SignupPage />);
    
    // Fill in the signup form with valid data.
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    
    // Click the signup button.
    fireEvent.click(screen.getByRole('button', { name: /sign ?up/i }));
    
    // Expect a success message to be displayed.
    // Adjust the success message as needed.
    expect(await screen.findByText(/signup successful/i)).toBeInTheDocument();
  });
});
