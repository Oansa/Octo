import { useState } from 'react';
import { Octo_backend } from 'declarations/Octo_backend';
import Login from '../../../Octo_frontend/src/Login';


function App() {
  const [principal, setPrincipal] = useState(null);
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    Octo_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  if (!principal) {
    return <Login onAuthenticated={setPrincipal} />;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <div style={{ margin: '1rem 0', color: '#1a7f37' }}>
        <strong>Logged in as:</strong> {principal.toString()}
      </div>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
