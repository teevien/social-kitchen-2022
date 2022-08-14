import React, { useState, useEffect } from 'react'
import PartyEvent from '../partyEvent';
import PartyDish from '../partyDish';
import { Link, useParams } from 'react-router-dom';
import SearchForRecipe from './recipes/SearchForRecipe';

interface Props {
  partyEvents: PartyEvent[],
}

const EventDetails: React.FC<Props> = ( {
  partyEvents
}: Props ) => {
  const [currentEvent, setCurrentEvent] = useState<any>({});
  const [activePage, setActivePage] = useState<string>('dishes');
  const [partyDishes, setPartyDishes] = useState<PartyDish[]>([]);
  const [partyId, setPartyId] = useState<string>('');
  const paramsPartyId = useParams().party_id;
  
  useEffect(() => {
    setPartyId(paramsPartyId || '');
    const event = partyEvents.find(party => party.makePartyId === paramsPartyId);
    setCurrentEvent(event);
    setPartyDishes(JSON.parse(window.localStorage.getItem('partyDishes') || ''));
  }, []);

  const deleteDish = (id: string) => {
    const newDishes = partyDishes.filter(dish => dish.id !== id);
    setPartyDishes(newDishes);
    window.localStorage.setItem('partyDishes', JSON.stringify(newDishes));
  }

  return (
    <div className="event-details">
      <div className="wrapper">
        <div className="event-details__container">
          <aside className="event-details-aside">
            <div className="wrapper">
              <h2 className="event-details-aside__title">{currentEvent.makePartyName}</h2>
              <p className="event-details-aside__creator">
                <span>Created by: </span>
                {currentEvent.makePartyEmail}
              </p>
              <p className="event-details-aside__date">
                <span>Date: </span>
                {currentEvent.makePartyDate}
              </p>
            </div>
          </aside>
          <main className="event-details-main">
            <nav className="event-details-main-nav">
              <ul className="event-details-main-nav__list">
                <li className="event-details-main-nav__item">
                  <button
                    className="event-details-main-nav__button"
                    value="dishes"
                    onClick={() => setActivePage('dishes')}
                  >Dishes</button>
                </li>
                <li className="event-details-main-nav__item">
                  <button
                    className="event-details-main-nav__button"
                    value="recipes"
                    onClick={() => setActivePage('recipes')}
                  >Recipes</button>
                </li>
              </ul>
            </nav>
            <section className="dish-list">
              <h2 className="event-details-main__title">Dishes</h2>
              { activePage === 'dishes' ? 
                partyDishes.length > 0 ? 
                partyDishes.map((dish: any) => {
                  if (dish.partyId === partyId) {
                    return (
                      <div className="dish-list__dish" key={dish.id}>
                        <Link
                          to={`/${partyId}/dishes/${dish.id}`}
                          className="dish-list__link"
                        >{dish.title}</Link>
                        <button
                          onClick={() => deleteDish(dish.id)}
                          id={dish.id}
                          className="dish-list__delete-button"
                        >
                          <i className="fas fa-times" id={dish.id}></i>
                        </button>
                      </div>
                    )
                  }
                })
                :
                <p>This event has no dishes. Let's add some!</p> :
                <SearchForRecipe
                  partyDishes={partyDishes}
                  setPartyDishes={setPartyDishes}
                  partyId={partyId}
                />
              }
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
