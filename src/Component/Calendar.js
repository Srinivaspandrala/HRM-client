import { useState } from 'react'; 
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import './Calendar.css'; 

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales
});

const eventTypes = {
    Meeting: '#1E90FF',
    Birthday: '#FF4500',
    Holiday: '#32CD32',
    Conference: '#8A2BE2',
    Workshop: '#FFD700',
    Sports: '#FF6347',
    Music: '#FF69B4',
    Other: '#A9A9A9'
};

const MyCalendar = () => {
    const [events, setEvents] = useState([]); //usestate not have been used
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };


    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: '8px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                padding: '5px'
            }
        };
    };

    return (
        <div className='Calender-siderBar'>
            <div style={{ padding: '20px' }} className='calendar-render'>
                <div className="calendar-header">
                    <button className="rbc-btn-group rbc-today-btn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Close Form' : 'Add Event'}
                    </button>
                </div>

                {showForm && (
                    <div className="event-form">
                        <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" />
                        <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
                        <input type="time" name="startTime" value={newEvent.startTime} onChange={handleInputChange} />
                        <input type="time" name="endTime" value={newEvent.endTime} onChange={handleInputChange} />

                        <select name="type" value={newEvent.type} onChange={handleInputChange}>
                            <option value="">Select Type</option>
                            {Object.entries(eventTypes).map(([type]) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <button className="add-event-btn">Add Event</button>
                    </div>
                )}

                <div className="event-type-labels">
                    {Object.entries(eventTypes).map(([type, color]) => (
                        <div key={type} style={{ display: 'inline-flex', alignItems: 'center', margin: '5px 10px' }}>
                            <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '10%', marginRight: '5px' }} />
                            <span>{type}</span>
                        </div>
                    ))}
                </div>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: '20px' }}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </div>
    );
};

export default MyCalendar;
