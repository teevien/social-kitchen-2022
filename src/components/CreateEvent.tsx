import React, { useState, useEffect, useRef } from 'react';
import { PartyEvent } from '../partyEvent';
import { v4 as uuidv4 } from 'uuid';
import DisplayEvents from '../components/DisplayEvents';

interface Props {
  partyEvents: PartyEvent[];
  setPartyEvents: React.Dispatch<React.SetStateAction<PartyEvent[]>>;
}

const CreateEvent: React.FC<Props> = ({
  partyEvents,
  setPartyEvents
}: Props ) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [makePartyName, setMakePartyName] = useState<string>('');
  const [makePartyDate, setMakePartyDate] = useState<string>('');
  const [makePartyEmail, setMakePartyEmail] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const makePartyId = uuidv4();
    const parties = partyEvents;
    const newParty = {
      makePartyName,
      makePartyDate,
      makePartyEmail,
      makePartyId
    }

    parties.push(newParty);
    setPartyEvents(parties);
    window.localStorage.setItem('partyEvents', JSON.stringify(parties));


    setMakePartyName('');
    setMakePartyDate('');
    setMakePartyEmail('');
  }

  const handleChange = (e: any) => {
    if (e.target.id === 'makePartyName') {
      setMakePartyName(e.target.value);
    } else if (e.target.id === 'makePartyDate') {
      setMakePartyDate(e.target.value);
    } else if (e.target.id === 'makePartyEmail') {
      setMakePartyEmail(e.target.value);
    }
  }

  useEffect(() => {
    console.log('getitems', JSON.parse(window.localStorage.getItem('partyEvents') || ''));
    setPartyEvents(JSON.parse(window.localStorage.getItem('partyEvents') || ''));
  }, []);

  return (
    <div className="wrapper">
      <div className="create-display-event">
        <div className="create-event">
          <h2 className="crate-event__title">Create Event</h2>
          <form className="create-event__form" onSubmit={handleSubmit}>
            <div className="create-event__form-container">
              <label className="create-event__label" htmlFor="makePartyName">Event Name</label>
              <input
                ref={inputRef}
                type="text"
                className="create-event__input create-event__input--name"
                id="makePartyName"
                required
                onChange={handleChange}
                value={makePartyName}
                placeholder="Event Name"
              />

              <label className="create-event__label" htmlFor="makePartyDate">Event Date</label>
              <input
                ref={inputRef}
                type="date"
                className="create-event__input create-event__input--date"
                id="makePartyDate"
                required
                onChange={handleChange}
                value={makePartyDate}
                placeholder="yyyy-mm-dd"
              />

              <label className="create-event__label" htmlFor="makePartyEmail">Guests</label>
              <input
                ref={inputRef}
                type="text"
                className="create-event__input create-event__input--email"
                id="makePartyEmail"
                required
                onChange={handleChange}
                value={makePartyEmail}
                placeholder="Guest Emails (comma separated)"
              />
            </div>
            <input type="submit" value="Create Event" className="create-event__submit" />
          </form>
        </div>
        <DisplayEvents
          partyEvents={partyEvents}
          setPartyEvents={setPartyEvents}
         />
      </div>
    </div>
    // <div className="createEvent">
    //   <div className="wrapper">
    //     <h2>
    //       Create Event
    //     </h2>

    //     <form className="createCookingParty" onSubmit={handleSubmit}>
    //       <input
    //         ref={inputRef}
    //         type="text"
    //         className="partyForm partyName"
    //         id="makePartyName"
    //         required
    //         onChange={handleChange}
    //         value={makePartyName}
    //         placeholder="Event Name"
    //       />
    //       <label htmlFor="makePartyName" />

    //       <input
    //         ref={inputRef}
    //         type="date"
    //         className="partyForm"
    //         id="makePartyDate"
    //         required
    //         onChange={handleChange}
    //         value={makePartyDate}
    //         placeholder="yyyy-mm-dd"
    //       />
    //       <label htmlFor="makePartyDate" />

    //       <input
    //         ref={inputRef}
    //         type="text"
    //         className="partyForm partyEmail"
    //         id="makePartyEmail"
    //         required
    //         onChange={handleChange}
    //         value={makePartyEmail}
    //         placeholder="Guest Emails (comma separated)"
    //       />
    //       <label htmlFor="makePartyEmail" />

    //       <input type="submit" value="Create Event" className="BTN__submit--createEvent" />
    //     </form>

    //     <DisplayEvents
    //       partyEvents={partyEvents}
    //       setPartyEvents={setPartyEvents}
    //     />
    //   </div>
    // </div>
  )
}

export default CreateEvent;