import React from 'react';
import { PartyEvent } from '../partyEvent';
import { Link } from 'react-router-dom';

interface Props {
  partyEvents: PartyEvent[],
  setPartyEvents: React.Dispatch<React.SetStateAction<PartyEvent[]>>
}

const DisplayEvents: React.FC<Props> = ( {
  partyEvents,
  setPartyEvents
}: Props ) => {

  const deleteParty = (id: string) => {
    const newParties = partyEvents.filter(party => party.makePartyId !== id);
    setPartyEvents(newParties);
    window.localStorage.setItem('partyEvents', JSON.stringify(newParties));
  }
  return (
    <div className="display-event">
      <h2 className="display-event__heading">Events</h2>
      {
        partyEvents.map((party) => {
          return (
            <div className="event__container" key={party.makePartyId}>
              <Link className="event__link" to={`/${party.makePartyId}`}>
                {party.makePartyName}
              </Link>
              <button
                className="event__delete-button"
                id={party.makePartyId}
                onClick={() => deleteParty(party.makePartyId)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default DisplayEvents