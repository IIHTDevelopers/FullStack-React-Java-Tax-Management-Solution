class TaxService {
    constructor() {
        this.apiUrl = 'http://127.0.0.1:8081/taxmanagement/api/taxes';
    }

    async getAllTaxes() {
        try {
            const response = await fetch(`${this.apiUrl}`);
            if (!response.ok) {
                throw new Error('Error fetching taxes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getAllTaxes:', error);
            throw error;
        }
    }

    async getTaxById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching tax');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in getTaxById:', error);
            throw error;
        }
    }

    async createTax(tax) {
        try {
            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tax),
            });
            if (!response.ok) {
                throw new Error('Error creating tax');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in createTax:', error);
            throw error;
        }
    }

    async updateTax(id, tax) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tax),
            });
            if (!response.ok) {
                throw new Error('Error updating tax');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in updateTax:', error);
            throw error;
        }
    }

    async deleteTax(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting tax');
            }
        } catch (error) {
            console.error('Error in deleteTax:', error);
            throw error;
        }
    }
}

export default new TaxService();
