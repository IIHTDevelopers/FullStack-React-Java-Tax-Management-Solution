import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaxManagement from '../components/TaxManagement';

describe('boundary', () => {
    test('TaxManagementComponent boundary renders without crashing', () => {
        render(<TaxManagement />);
    });

    test('TaxManagementComponent boundary displays "Tax Management" heading', () => {
        render(<TaxManagement />);
        expect(screen.queryAllByText('Tax Management').length).toBeGreaterThan(0);
    });

    test('TaxManagementComponent boundary displays the add tax form by default', () => {
        render(<TaxManagement />);
        expect(screen.queryAllByText('Add Tax').length).toBeGreaterThan(0);
    });

    test('TaxManagementComponent boundary renders Refresh Taxes button', () => {
        render(<TaxManagement />);
        expect(screen.getByText('Refresh Taxes')).toBeInTheDocument();
    });

    test('TaxManagementComponent boundary renders input fields for adding or updating tax', () => {
        render(<TaxManagement />);
        expect(screen.getByLabelText('Form Type:')).toBeInTheDocument();
        expect(screen.getByLabelText('Filing Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('Total Tax Amount:')).toBeInTheDocument();
        expect(screen.getByLabelText('User ID:')).toBeInTheDocument();
    });

    test('TaxManagementComponent boundary handles input changes correctly', () => {
        render(<TaxManagement />);
        const formTypeInput = screen.getByLabelText('Form Type:');
        fireEvent.change(formTypeInput, { target: { value: 'New Tax Form' } });
        expect(formTypeInput.value).toBe('New Tax Form');
    });
});
