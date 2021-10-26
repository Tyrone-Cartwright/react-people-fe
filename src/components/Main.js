import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

const Main = (props) => {
  const [people, setPeople] = useState([]); // NOTE: normally I would set this to an empty array

  // const URL = 'https://people-backend-react.herokuapp.com/people';
  const URL = 'http://localhost:3001/people/'; // Production

  // helper functions for getting and creating people
  const getPeople = async () => {
    // alternative syntax for resolving all promises
    // const data = await fetch(BASE_URL).then(response => response.json());
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(person),
    });

    getPeople(); // get people and update state after creating a person
  };

  const updatePeople = async (person, id) => {
    await fetch(URL + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(person),
    });
    getPeople(); // why should we call getPeople() ?
  };

  const deletePeople = async (id) => {
    await fetch(URL + id, { method: 'DELETE' });
    getPeople();
  };

  // make sure we get people when the application loads
  // in other words, we need a side effect to occur as a result of the page loading
  // we will use the useEffect hook to have it's effect function run on page load

  // useEffect(() => getPeople()) // why does this syntax create an infinite loop
  useEffect(() => getPeople(), []); // run once on page load, but not for any subsequent state changes

  return (
    <main>
      <Switch>
        <Route exact path='/'>
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path='/people/:id'
          render={(rp) =>
            // render props or "rp" for short
            // includes three objects => Location, Match, History
            people.length ? (
              <Show
                {...rp}
                people={people}
                updatePeople={updatePeople}
                deletePeople={deletePeople}
              />
            ) : (
              <Redirect to='/' />
            )
          }
        />
      </Switch>
    </main>
  );
};

export default Main;
