import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('boundary', () => {
  test('AppComponent boundary renders without crashing', () => {
    render(<App />);
  });

  test('AppComponent boundary contains "Tax Management" heading', () => {
    render(<App />);
    expect(screen.queryAllByText('Tax Management').length).toBeGreaterThan(0);
  });

  test('AppComponent boundary renders TaxManagement component', () => {
    render(<App />);
    expect(screen.queryAllByText('Add Tax').length).toBeGreaterThan(0);
  });
});
