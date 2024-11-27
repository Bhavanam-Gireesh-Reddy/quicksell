
import React from 'react';
import Card from '../Card/Card';
import './Column.css';
import StatusIcon from '../StatusIcon/StatusIcon';

const Column = ({ title, tickets, grouping }) => {
    const numTickets = tickets.length;
    const priority = tickets?.length > 0 ? tickets[0]?.priority : undefined;
    const user = tickets[0]?.assignees?.[0];

    const renderHeaderContent = () => {
        if (grouping === "user") {
            return (
                <div className='priority'>
                    <div className='priority-left'>
                        {user?.image && <img src={user.image} alt={user.name} className="user-avatar" />}
                        <span className="column-title">{user?.name || title}</span>
                        <span className="ticket-count">{numTickets}</span>
                    </div>
                    <div className='priority-right'>
                        <span className="add-button">+</span>
                        <span className="more-options">...</span>
                    </div>
                </div>
            );
        } else if (grouping === "priority") {
            return (
                <div className='header'>
                    <div className='header-left'>
                        <StatusIcon priority={priority} />
                        <span className="column-title">{title}</span>
                        <span className="ticket-count">{numTickets}</span>
                    </div>
                    <div className='header-right'>
                        <span className="add-button">+</span>
                        <span className="more-options">...</span>
                    </div>
                </div>
            );
        }

        
        return (
            <div className='header'>
                <div className='header-left'>
                    <StatusIcon status={title} />
                    <span className="column-title">{title}</span>
                    <span className="ticket-count">{numTickets}</span>
                </div>
                <div className='header-right'>
                    <span className="add-button">+</span>
                    <span className="more-options">...</span>
                </div>
            </div>
        );
    };

    return (
        <div className="column-container">
            <div className="column-header">
                {renderHeaderContent()}
            </div>
            <div className="card-list">
                {tickets.map((ticket) => (
                    <Card key={ticket.id} ticket={ticket} grouping={grouping} />
                ))}
            </div>
        </div>
    );
};

export default Column;