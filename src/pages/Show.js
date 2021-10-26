import { useState } from 'react';

const Show = (props) => {
  const id = props.match.params.id;
  const people = props.people;
  const person = people.find((p) => p._id === id);

  // state for form
  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (evt) => {
    setEditForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  // handleSubmit for form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.updatePeople(editForm, person._id);
    // redirect people back to index page
    props.history.push('/'); // allows us to push locations into the browser's history
    // programmatically route us back to the homepage
  };

  // delete function to remove a Person
  const removePerson = (evt) => {
    props.deletePeople(person._id);
    props.history.push('/');
  };

  return (
    <div className='person'>
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button id='delete' onClick={removePerson}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={editForm.name}
          name='name'
          placeholder='name'
          onChange={handleChange}
        />
        <input
          type='text'
          value={editForm.image}
          name='image'
          placeholder='image URL'
          onChange={handleChange}
        />
        <input
          type='text'
          value={editForm.title}
          name='title'
          placeholder='title'
          onChange={handleChange}
        />
        <input type='submit' value='Update Person' />
      </form>
    </div>
  );
};

export default Show;
