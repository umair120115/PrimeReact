import Page from "./components/Page"
import { PrimeReactProvider } from 'primereact/api';
// import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
  const value = {
    cssTransition: true,
  
};
  

  return (
    <>
      <PrimeReactProvider value={value}>
        <Page/>
      </PrimeReactProvider>
    </>
  )
}

export default App
