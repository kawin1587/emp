import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3">
                    <div>
                        {/* Use Link for routing in React */}
                        <Link className="navbar-brand m-5" to="/">
                            Employee Management System
                        </Link>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
