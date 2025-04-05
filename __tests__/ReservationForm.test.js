// __tests__/ReservationFeature.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMocks } from 'node-mocks-http';

// ------------------------------------------------------------------
// 1. Reservation Page Tests (from page.js)
// ------------------------------------------------------------------

// Import the Reservation Page component.
// Adjust the path below to match your project structure.
const ReservationPage = require('../src/app/reservation/page').default;

describe('Reservation Page', () => {
  test('renders reservation form fields and submit button', () => {
    render(<ReservationPage />);
    
    // Check for the presence of form fields. Adjust labels as needed.
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    
    // Check for the submit button (assumed to have text "Reserve")
    expect(screen.getByRole('button', { name: /reserve/i })).toBeInTheDocument();
  });

  test('submits the reservation form successfully', async () => {
    render(<ReservationPage />);
    
    // Fill out the form fields with valid data.
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2025-05-01' },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: '18:00' },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '3' },
    });
    
    // Click the "Reserve" button.
    fireEvent.click(screen.getByRole('button', { name: /reserve/i }));
    
    // Wait for and check that a success message appears.
    expect(await screen.findByText(/reservation successful/i)).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------
// 2. Reservation API Route Tests (from route.js)
// ------------------------------------------------------------------

// Import the reservation API route handler.
// Adjust the path below to match your project structure.
const reservationRoute = require('../src/app/reservation/route').default;

describe('Reservation API Route', () => {
  test('returns a success message on valid POST request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        date: '2025-05-01',
        time: '18:00',
        guests: 3,
      },
    });
    
    // Call the API route handler with the mocked request and response.
    await reservationRoute(req, res);
    
    // Expect a 200 status code.
    expect(res._getStatusCode()).toBe(200);
    
    // Parse the response and verify the success message.
    const data = JSON.parse(res._getData());
    expect(data.message).toMatch(/reservation successful/i);
  });
});
