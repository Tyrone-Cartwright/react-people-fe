import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

const Main = (props) => {
  // Declaring state
  const [people, setPeople] = useState(null);
  // URL
  const URL = 'https://people-backend-react.herokuapp.com/people';

  // Get People
  const getPeople = async () => {
    const data = await fetch(URL).then((res) => res.json());
    // const response = await fetch(URL);
    // const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create People
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    // update list of People
    getPeople();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path='/'>
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route path='/people/:id' render={(rp) => <Show {...rp} />} />
      </Switch>
    </main>
  );
};

export default Main;
