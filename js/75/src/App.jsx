import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Address from './assets/Address'

const person = {
  first: 'Shlomo',
  last: 'Fried'
};


function App() {
  return (
    <>
      <h1>
        Hello {person.first} {person.last} !!
      </h1>
      <Address street="123 Main Street" city="Orlando" state="Florida" zip="11145" />
    </>
  );
}

export default App;
