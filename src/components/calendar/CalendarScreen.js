import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';

// import { messages as espanolMessages } from '../helpers/calendar-messages-es';
// import 'moment/locale/es'; // to put the dates of the moment in Spanish
// moment.locale('es'); // to put the dates of the moment in Spanish

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add(1, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'comprar el pastel',
        user: {
            _id: '123',
            name: 'Andy',
        },
    },
];

export const CalendarScreen = () => {
    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const onDoubleClick = (event) => {
        console.log('onDoubleClick', event);
    };

    const onSelect = (event) => {
        console.log('onSelect', event);
    };

    const onViewChange = (event) => {
        setLastView(event);
        localStorage.setItem('lastView', event);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);

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
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                view={lastView}
                components={{ event: CalendarEvent }}
                // messages={espanolMessages}
            />
            <CalendarModal />
        </div>
    );
};
