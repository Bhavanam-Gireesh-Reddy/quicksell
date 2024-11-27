// src/components/Board/Board.jsx
import React from 'react';
import Column from '../Column/Column.js';
import './Board.css';

const allStatuses = ["Todo", "In Progress", "Backlog", "Done", "Cancelled"];

const Board = ({ tickets, settings }) => {
    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 4: return 'Urgent';
            case 3: return 'High';
            case 2: return 'Medium';
            case 1: return 'Low';
            case 0: default: return 'No priority';
        }
    };

    const groupedTickets = (() => {
        switch (settings.groupBy) {
            case 'status': return groupBy(tickets, 'status');
            case 'user': return groupBy(tickets, 'userId', [], (tickets, userId) => tickets.filter(ticket => ticket.userId === userId));
            case 'priority': {
                const priorityOrder = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
                const grouped = groupBy(tickets, 'priority', priorityOrder);
                const doneTickets = tickets.filter(ticket => ticket.status === 'Done');
                const cancelledTickets = tickets.filter(ticket => ticket.status === 'Cancelled');
                if (doneTickets.length) grouped['Done'] = doneTickets;
                if (cancelledTickets.length) grouped['Cancelled'] = cancelledTickets;
                return grouped;
            }
            default: return groupBy(tickets, 'status');
        }
    })();

    const sortedTickets = sortTickets(groupedTickets, settings.orderBy);

    function groupBy(tickets, property, priorityOrder = [], filterFn = () => []) {
        const grouped = {};
        if (property === 'priority') {
            priorityOrder.forEach(priorityLabel => {
                const ticketsForPriority = tickets.filter(ticket => getPriorityLabel(ticket.priority) === priorityLabel);
                if (ticketsForPriority.length) {
                    grouped[priorityLabel] = ticketsForPriority;
                }
            });
        } else if (property === 'status') {
            allStatuses.forEach(status => {
                const ticketsForStatus = tickets.filter(ticket => ticket.status === status);
                if (ticketsForStatus.length) {
                    grouped[status] = ticketsForStatus;
                }
            });
        } else {
            const uniqueIds = [...new Set(tickets.map(ticket => ticket[property]))];
            uniqueIds.forEach(id => {
                const items = filterFn(tickets, id);
                if (items.length) {
                    grouped[id] = items;
                }
            });
        }
        return grouped;
    }

    function sortTickets(groupedTickets, sorting) {
        const sorted = {};
        for (const key in groupedTickets) {
            sorted[key] = [...groupedTickets[key]];
            sorted[key].sort((a, b) => {
                if (sorting === 'priority') {
                    return b.priority - a.priority;
                } else if (sorting === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        }
        return sorted;
    }

    const columnsToDisplay = Object.entries(sortedTickets).map(([key, tickets]) => ({
        title: key,
        tickets
    }));

    return (
        <div className="kanban-board">
            {columnsToDisplay.map(({ title, tickets }) => (
                <Column key={title} title={title} tickets={tickets} grouping={settings.groupBy} />
            ))}
        </div>
    );
};

export default Board;