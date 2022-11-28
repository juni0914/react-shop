import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Navbar,Nav,Container,NavDropdown } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet }from 'react-router-dom'
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';


function App() {
  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();





  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  },[]) 


  return (
    <div className="App">


      
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={()=>{ navigate('/') }}>Juni Shop</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          <Nav.Link onClick={()=>{ navigate('/detail') }} >Detail</Nav.Link>
            
            <Nav.Link onClick={()=>{ navigate('/cart') }} >Cart</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about/member') }} >member</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about/location') }} >location</Nav.Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>



      <Routes>
        <Route path="/" element={ 
          <>
            <div className="main-bg"></div>
            <div className="container">
                <div className="row"  >
                  {/* <Card shoes = { shoes[0] } i={1}></Card>
                  <Card shoes = { shoes[1] } i={2}></Card>
                  <Card shoes = { shoes[2] } i={3}></Card> */}
                  {
                    shoes.map((a,i)=>{
                      return(
                        <Card  shoes = { shoes[i] } i={i}   ></Card>
                        
                      )
                    })
                  }
                </div>
              </div>
                  <button onClick={()=>{
                    axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
                      let copy = [...shoes, ...결과.data]
                      setShoes(copy);
                    })
                    .catch(()=>{
                      console.log('실패함')
                    })
                  }}>버튼</button>
          </>
        } />
        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> } />
        <Route path="/cart" element={ <Cart/> } /> 
        <Route path="/about" element={ <About/> } >  
          <Route path="member" element={ <div>멤버</div> } />
          <Route path="location" element={ <div>회사 위치</div> } />
        </Route>
        <Route path="*" element={ <div>잘못된 접근입니다.</div> } />
      </Routes>


    
    </div>
  );
}

function Card(props){
  let navigate = useNavigate();
  return(
    <div className="col-md-4" onClick={()=>{ navigate('/detail/'+props.i) }}>
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>

  )
}

function About(){
  return (
    <div>
      <h4>about페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;

