
import React from 'react';
import './Card.css';

const Card = ({ ticket, grouping }) => {
    if (!ticket) {
        return <div className="card-error">Ticket data missing</div>;
    }

    const assignee = ticket.assignees?.[0];
    const avatar = assignee?.image ? (
        <img src={assignee.image} alt={assignee.name} className="assignee-avatar" />
    ) : null;

    const renderFooterContent = () => {
        if (grouping === 'user') {
            return avatar;
        } else if (grouping === 'status') {
            return (
                <div className="card-footer-content">
                    {avatar}
                    <div className="tag-container">
                        {ticket.tag?.map(t => (
                            <span key={t.id} className="tag">{t.name}</span>
                        ))}
                    </div>
                </div>
            );
        }
        return null; 
    };

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-id">{ticket.id}</span>
            </div>
            <p className="card-title">{ticket?.title || "Untitled Ticket"}</p>
            <div className="card-footer">
                {renderFooterContent()}
            </div>
        </div>
    );
};

export default Card;