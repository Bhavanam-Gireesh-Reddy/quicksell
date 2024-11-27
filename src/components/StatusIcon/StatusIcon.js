
import React from 'react';
import './StatusIcon.css';


import todoIcon from '../../assets/To-do.svg';
import inProgressIcon from '../../assets/in-progress.svg';
import backlogIcon from '../../assets/Backlog.svg';
import doneIcon from '../../assets/Done.svg';
import cancelledIcon from '../../assets/Cancelled.svg';
import noPriorityIcon from '../../assets/No-priority.svg';
import urgentIcon from '../../assets/SVG - Urgent Priority colour.svg';
import highIcon from '../../assets/Img - High Priority.svg';
import mediumIcon from '../../assets/Img - Medium Priority.svg';
import lowIcon from '../../assets/Img - Low Priority.svg';


const StatusIcon = ({ status, priority }) => {
    let icon;

    if (priority !== undefined) {
        switch (priority) {
            case 4: icon = urgentIcon; break;
            case 3: icon = highIcon; break;
            case 2: icon = mediumIcon; break;
            case 1: icon = lowIcon; break;
            default: icon = noPriorityIcon; break; 
        }
    } else if (status) {
        switch (status) {
            case 'Todo': icon = todoIcon; break;
            case 'In Progress': icon = inProgressIcon; break;
            case 'Backlog': icon = backlogIcon; break;
            case 'Done': icon = doneIcon; break;
            case 'Cancelled': icon = cancelledIcon; break;
            default: icon = noPriorityIcon; break; 
        }
    }

    return icon ? <img src={icon} alt={status || `Priority ${priority}`} className="status-icon" /> : null;
};

export default StatusIcon;