import '../styles/App.css';

import { BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// import components
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/quiz" element={<CheckUserExist><Quiz/></CheckUserExist>}/>
        <Route exact path="/result" element={<CheckUserExist><Result/></CheckUserExist>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
