import axios from "axios";

const BASE_URL = "http://98.80.6.60:8080/employee";

class EmployeeService {

    // Method to get all employees
    getAllEmployee() {
        return axios.get(BASE_URL)
            .catch(error => {
                console.error("Error fetching employees:", error);
                throw error; // Re-throw error for component handling
            });
    }

    // Method to save an employee
    saveEmployee(employeeData) {
        return axios.post(BASE_URL, employeeData)
            .catch(error => {
                console.error("Error saving employee:", error);
                throw error;
            });
    }

    // Method to update an employee by ID
    updateEmployee(id, employeeData) {
        return axios.put(`${BASE_URL}/${id}`, employeeData)
            .catch(error => {
                console.error(`Error updating employee with ID ${id}:`, error);
                throw error;
            });
    }

    // Method to get an employee by ID
    getEmployeeById(id) {
        return axios.get(`${BASE_URL}/${id}`)
            .catch(error => {
                console.error(`Error fetching employee with ID ${id}:`, error);
                throw error;
            });
    }

    // Method to delete an employee by ID
    deleteEmployee(id) {
        return axios.delete(`${BASE_URL}/${id}`)
            .catch(error => {
                console.error(`Error deleting employee with ID ${id}:`, error);
                throw error;
            });
    }
}

// Assign the instance to a variable
const employeeService = new EmployeeService();

// Export the instance
export default employeeService;
