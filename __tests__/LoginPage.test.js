// __tests__/LoginPage.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the LoginPage component.
// Adjust the path as needed to point to your login page implementation.
const LoginPage = require('../src/app/login/page').default;

describe('Login Page', () => {
  // Test case 1: Verify that the login form renders with the necessary fields.
  test('renders login form with email and password fields and a login button', () => {
    render(<LoginPage />);
    
    // Verify the email and password fields exist (assumes they have accessible labels).
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Verify the login button exists (assumes it has text like "Login").
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // Test case 2: Ensure that validation errors are shown when submitting empty fields.
  test('displays validation errors when form is submitted empty', async () => {
    render(<LoginPage />);
    
    // Simulate clicking the login button without filling in any fields.
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Check for validation error messages.
    // Adjust these texts to match what your component renders.
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  // Test case 3: Verify successful submission when valid credentials are provided.
  test('submits the form successfully with valid input', async () => {
    render(<LoginPage />);
    
    // Fill in valid credentials.
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    
    // Click the login button.
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Expect a success message to be displayed.
    // Adjust the expected text as needed.
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });
});
