
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import './Navbar.css';


const Navbar = ({ settings, onSettingsChange }) => {


    const [isOpen, setIsOpen] = useState(false);



    const handleGroupingChange = (groupBy) => {

        onSettingsChange({ ...settings, groupBy });


    };



    const handleOrderingChange = (orderBy) => {

        onSettingsChange({ ...settings, orderBy });


    };


    return (
        <nav className="navbar">
            <div className="dropdown-container">
                <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
                    <Settings size={16} className="dropdown-icon" />
                    Display <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <div className='nav-top'>
                            <label htmlFor="grouping-select">Grouping:</label>
                            <select
                            id="grouping-select"
                            value={settings.groupBy}
                            onChange={(e) => handleGroupingChange(e.target.value)}
                        >
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                            </select>
                        </div>


                        <div className='nav-top'>
                            <label htmlFor="ordering-select">Ordering:</label>
                            <select
                            id="ordering-select"
                            value={settings.orderBy}
                            onChange={(e) => handleOrderingChange(e.target.value)}
                        >
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>

                            </select>
                        </div>
                    </div>
                )}

            </div>

        </nav>
    );
};

export default Navbar;