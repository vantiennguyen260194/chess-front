import Chess from './Chess';

import "./App.css"

function App() {
  return (
    <div className='w-3/4 p-8 grid grid-cols-1 md:grid-cols-2 m-auto gap-4 md:gap-8'>
      <Chess />
      <div>Setting</div>
    </div>
  );
}

export default App;
