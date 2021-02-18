import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

// import { messages as espanolMessages } from '../../helpers/calendar-messages-es';
// import 'moment/locale/es'; // to put the dates of the moment in Spanish
// moment.locale('es'); // to put the dates of the moment in Spanish

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const onDoubleClick = () => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (event) => {
        dispatch(eventSetActive(event));
    };

    const onViewChange = (event) => {
        setLastView(event);
        localStorage.setItem('lastView', event);
    };

    const onSelectSlot = () => {
        dispatch(eventClearActiveEvent());
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
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{ event: CalendarEvent }}
                // messages={espanolMessages}
            />
            <CalendarModal />
            <AddNewFab />
            {activeEvent && <DeleteEventFab />}
        </div>
    );
};
