import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../ui/Navbar';

// import { messages as espanolMessages } from '../helpers/calendar-messages-es';
// import 'moment/locale/es'; // to put the dates of the moment in Spanish
// moment.locale('es'); // to put the dates of the moment in Spanish

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Cumpleaños de Andy',
        start: moment().toDate(),
        end: moment().add(1, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'comprar el pastel',
    },
];

export const CalendarScreen = () => {
    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event, start, end, isSelected);

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };

        return { style };
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                className="rbc-calendar"
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                // messages={espanolMessages}
            />
        </div>
    );
};
