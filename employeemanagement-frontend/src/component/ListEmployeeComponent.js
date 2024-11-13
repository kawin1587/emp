import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const ListEmployeeComponent = () => {
    const [employeeArray, setEmployeeArray] = useState([]);

    // Fetch the employee data when the component mounts
    useEffect(() => {
        getAllEmployee();
    }, []);

    // Fetch all employees
    function getAllEmployee() {
        EmployeeService.getAllEmployee()
            .then(res => {
                setEmployeeArray(res.data);
                console.log(res);
            })
            .catch(e => console.log(e));
    }

    // Delete an employee
    function deleteEmployee(e, id) {
        e.preventDefault(); // Prevent default anchor behavior
        EmployeeService.deleteEmployee(id)
            .then(() => getAllEmployee())  // Fetch updated list after deletion
            .catch(e => console.log(e));
    }

    return (
        <div className="container">
            <Link to="/add-employee" className="btn btn-primary mb-2 mt-3">
                Add Employee
            </Link>
            <h2 className="text-center mb-4">List Employee</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeArray.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                {/* Use Link for navigation */}
                                <Link to={`/add-employee/${employee.id}`} className="btn btn-info">
                                    Update
                                </Link>
                                {" "}
                                {/* Use button for delete action */}
                                <button
                                    onClick={(e) => deleteEmployee(e, employee.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
