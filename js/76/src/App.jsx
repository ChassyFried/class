import './App.css';
import Header from './Header';
import NoWeather from './NoWeather';
import Weather from './Weather';

export default function App() {

  const zip = 11230;

  return (
    <>
      <Header />

      <NoWeather zip={zip} />

      <Weather zip={zip} />

    </>
  );
}