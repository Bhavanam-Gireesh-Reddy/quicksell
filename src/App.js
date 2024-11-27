// src/App.js
import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import Navbar from './components/Navbar/Navbar';
import './responsive.css';
import { fetchData } from './utils/api';
import './App.css';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [settings, setSettings] = useState({
        groupBy: localStorage.getItem('grouping') || 'status',
        orderBy: localStorage.getItem('sorting') || 'priority',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()
            .then(data => setTickets(data.tickets))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        localStorage.setItem('grouping', settings.groupBy);
        localStorage.setItem('sorting', settings.orderBy);
    }, [settings]);

    const handleSettingsChange = (newSettings) => {
        setSettings(newSettings);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="app-container">
            <Navbar settings={settings} onSettingsChange={handleSettingsChange} />
            <Board tickets={tickets} settings={settings} />
        </div>
    );
};

export default App;