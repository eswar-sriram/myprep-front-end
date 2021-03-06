import './App.css';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import Header from './components/Header';
import About  from './components/About';
import Signin from './components/Signin';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Tasks from './components/Tasks';
import SubTasks from './components/SubTasks';
import Notes from './components/Notes';

function App() {

  return (
    <div className="App">
      <Router>
      <Header/>
      <div className='Maindiv'>
        <Routes>
          <Route exact path='/' element={<Signin/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
          <Route exact path='/about' element ={<About/>}/>
          <Route exact path='/signup' element ={<Signup/>} />
          <Route exact path='/tasks' element={<Tasks/>} />
          <Route exact path='/subtasks' element={<SubTasks/>}/>
          <Route exact path='/notes' element={<Notes/>}/>
        </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
