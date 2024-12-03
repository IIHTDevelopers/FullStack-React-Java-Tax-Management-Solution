import React, { useEffect, useState } from 'react';
import TaxService from '../services/Tax.service.js';

const TaxManagement = () => {
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState(createEmptyTax());

  useEffect(() => {
    loadTaxes();
  }, []);

  const loadTaxes = async () => {
    try {
      const taxesData = await TaxService.getAllTaxes();
      setTaxes(taxesData);
    } catch (error) {
      console.error('Error loading taxes:', error);
    }
  };

  const addTax = async () => {
    try {
      await TaxService.createTax(selectedTax);
      loadTaxes();
      setSelectedTax(createEmptyTax()); // Clear the form
    } catch (error) {
      console.error('Error adding tax:', error);
    }
  };

  const showUpdateForm = (id) => {
    const tax = taxes.find((t) => t.taxFormId === id);
    if (tax) {
      setSelectedTax({ ...tax });
    }
  };

  const updateTax = async () => {
    try {
      await TaxService.updateTax(selectedTax.taxFormId, selectedTax);
      loadTaxes();
      setSelectedTax(createEmptyTax()); // Clear the form
    } catch (error) {
      console.error('Error updating tax:', error);
    }
  };

  const deleteTax = async (id) => {
    try {
      await TaxService.deleteTax(id);
      loadTaxes();
      setSelectedTax(createEmptyTax()); // Clear the form
    } catch (error) {
      console.error('Error deleting tax:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTax({ ...selectedTax, [name]: value });
  };

  function createEmptyTax() {
    return {
      taxFormId: 0,
      formType: '',
      filingDate: '',
      totalTaxAmount: 0,
      userId: 0
    };
  }

  return (
    <div>
      <h2>Tax Management</h2>
      <button onClick={loadTaxes}>Refresh Taxes</button>

      <ul>
        {taxes.map((tax) => (
          <li key={tax.taxFormId}>
            {tax.formType} - {new Date(tax.filingDate).toLocaleDateString()} - {tax.totalTaxAmount}
            <button onClick={() => setSelectedTax(tax)}>Select</button>
            <button onClick={() => showUpdateForm(tax.taxFormId)}>Update</button>
            <button onClick={() => deleteTax(tax.taxFormId)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>{selectedTax.taxFormId ? 'Update' : 'Add'} Tax</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="formType">Form Type:</label>
          <input
            type="text"
            id="formType"
            name="formType"
            value={selectedTax.formType}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="filingDate">Filing Date:</label>
          <input
            type="date"
            id="filingDate"
            name="filingDate"
            value={selectedTax.filingDate}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="totalTaxAmount">Total Tax Amount:</label>
          <input
            type="number"
            id="totalTaxAmount"
            name="totalTaxAmount"
            value={selectedTax.totalTaxAmount}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={selectedTax.userId}
            onChange={handleInputChange}
            required
          />

          <button type="button" onClick={() => (selectedTax.taxFormId ? updateTax() : addTax())}>
            {selectedTax.taxFormId ? 'Update' : 'Add'} Tax
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaxManagement;
