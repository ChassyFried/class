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
      <Address street="Shaul Hamelech 37" city="Jerusalem" country="Israel" zip="9993537" />
      <Address street="1491 E 33rd" city="Brooklyn" country="NY" zip="11234" />

    </>
  );
}

export default App;
