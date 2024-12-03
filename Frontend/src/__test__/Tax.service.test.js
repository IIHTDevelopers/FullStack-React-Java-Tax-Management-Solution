import TaxService from '../services/Tax.service';

describe('functional', () => {
  const mockApiUrl = 'http://127.0.0.1:8081/taxmanagement/api/taxes';
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  test('TaxService functional getAllTaxes calls fetch and returns data correctly', async () => {
    const mockResponse = [{ taxFormId: 1, formType: 'Test Form', filingDate: '2021-12-01', totalTaxAmount: 100, userId: 1 }];
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const taxes = await TaxService.getAllTaxes();
    expect(fetchSpy).toHaveBeenCalledWith(mockApiUrl);
    expect(taxes).toEqual(mockResponse);
  });

  test('TaxService functional getTaxById calls fetch with correct URL and returns data', async () => {
    const taxId = 1;
    const mockResponse = { taxFormId: 1, formType: 'Test Form', filingDate: '2021-12-01', totalTaxAmount: 100, userId: 1 };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const tax = await TaxService.getTaxById(taxId);
    expect(fetchSpy).toHaveBeenCalledWith(`${mockApiUrl}/${taxId}`);
    expect(tax).toEqual(mockResponse);
  });

  test('TaxService functional createTax calls fetch with correct options and returns created tax', async () => {
    const newTax = { formType: 'Test Form', filingDate: '2021-12-01', totalTaxAmount: 100, userId: 1 };
    const mockResponse = { ...newTax, taxFormId: 1 };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const createdTax = await TaxService.createTax(newTax);
    expect(fetchSpy).toHaveBeenCalledWith(mockApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTax)
    });
    expect(createdTax).toEqual(mockResponse);
  });

  test('TaxService functional updateTax calls fetch with correct options and returns updated tax', async () => {
    const taxId = 1;
    const updatedTax = { taxFormId: 1, formType: 'Updated Form', filingDate: '2021-12-01', totalTaxAmount: 150, userId: 1 };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTax
    });

    const result = await TaxService.updateTax(taxId, updatedTax);
    expect(fetchSpy).toHaveBeenCalledWith(`${mockApiUrl}/${taxId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTax)
    });
    expect(result).toEqual(updatedTax);
  });

  test('TaxService functional deleteTax calls fetch with correct options', async () => {
    const taxId = 1;
    fetchSpy.mockResolvedValueOnce({ ok: true });

    await TaxService.deleteTax(taxId);
    expect(fetchSpy).toHaveBeenCalledWith(`${mockApiUrl}/${taxId}`, {
      method: 'DELETE'
    });
  });

  test('TaxService functional throws error when fetch fails', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false });

    await expect(TaxService.getAllTaxes()).rejects.toThrow('Error fetching taxes');
  });
});
