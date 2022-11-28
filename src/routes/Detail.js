import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Nav } from 'react-bootstrap'
import { addItem } from "./../store.js"
import { useSelector, useDispatch } from "react-redux"
// import './src/App.css';
// import styled from 'styled-components'

// let Btn = styled.button`
//   background : ${ props => props.bg };
//   color :  ${ props => props.bg == 'hotpink' ? 'white' : 'black' };
//   padding : 10px;
// `;

function Detail(props){
    let dispatch = useDispatch()
    let {id} = useParams();
    let 찾은상품 = props.shoes.find((x) => x.id == id );
    let [detailtab , setDetailtab] = useState(0)
    let [fade2, setFade2] = useState('')

    
    useEffect(()=>{
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))
      },[]) 

      


    useEffect(()=>{
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    },[])



    return(
        
        <div className={'container start ' + fade2}>
            {/* <Btn bg='orange'>주황색 버튼</Btn>
            <Btn bg='hotpink'>핑크색 버튼</Btn> */}
            <div className="row">
                <div className="col-md-6">

                    <img src={'https://codingapple1.github.io/shop/shoes'+  (찾은상품.id+1) +'.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id : 찾은상품.id, name:찾은상품.title, count : 1}))
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setDetailtab(0) }} eventKey="link0">상세정보 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setDetailtab(1) }} eventKey="link1">상세정보 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setDetailtab(2) }} eventKey="link2">상세정보 3</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent detailtab={detailtab}/>
        </div> 
      )
}


        function TabContent(props){

            let [fade, setFade] = useState('')

            useEffect(()=>{
              setTimeout(()=>{ setFade('end') }, 100)
            return ()=>{
              setFade('')
            }
            }, [props.detailtab])
          
            return (
              <div className={'start ' + fade}>
                { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.detailtab] }
              </div>
            )

           
        }
export default Detail;