import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import ShowSingleRecipe from './components/recipes/ShowSingleRecipe';
import Header from './components/Header';
import './App.scss';

const App: React.FC = () => {

  const [partyEvents, setPartyEvents] = useState<any>([]);

  const ShowRecipeComponentWrapper = () => {
    const recipeId = useParams().recipe_id || '';
    return <ShowSingleRecipe recipeId={recipeId} />;
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <CreateEvent
                  partyEvents={partyEvents}
                  setPartyEvents={setPartyEvents}
                />
              }
            />
            <Route
              path="/:party_id"
              element={
                <EventDetails
                  partyEvents={partyEvents}
                />
              }
            />
            <Route
              path="/:party_id/dishes/:recipe_id"
              element={
                <ShowRecipeComponentWrapper />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
