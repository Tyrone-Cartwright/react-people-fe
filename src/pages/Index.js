import { useState } from 'react';
import { Link } from 'react-router-dom';

const Index = (props) => {
  // state to hold data
  const [newForm, setNewForm] = useState(getNewState());

  // handleChange function for form
  const handleChange = (evt) => {
    setNewForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  // handleSubmit function for form submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.createPeople(newForm);
    setNewForm(getNewState());
  };

  function getNewState() {
    return {
      name: '',
      image: '',
      title: '',
    };
  }
  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className='person'>
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img
          style={{ height: 100, width: 100, borderRadius: '50%' }}
          src={person.image}
          alt={person.name}
        />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return (
    <section>
      <form className='Form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={newForm.name}
          name='name'
          placeholder='name'
          onChange={handleChange}
        />
        <input
          type='text'
          value={newForm.image}
          name='image'
          placeholder='image URL'
          onChange={handleChange}
        />
        <input
          type='text'
          value={newForm.title}
          name='title'
          placeholder='title'
          onChange={handleChange}
        />
        <input type='submit' value='Create Person' />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
};

export default Index;
