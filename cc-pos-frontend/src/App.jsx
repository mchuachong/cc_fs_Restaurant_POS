
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import {Home,Menu,Authentication,Tables, SignUpPage} from './pages'
import PrivateRoutes from './utility/privateRoutes'
function App() {

  return (
  <>
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menu" element={<Menu/>}></Route>
          <Route path="/tables" element={<Tables/>}></Route>
        </Route>
        <Route path="/auth" element={<Authentication/>}></Route>
        <Route path="/auth/signup" element={<SignUpPage/>}></Route>
      </Routes>
    </Router>

  </>
  )
}

export default App
