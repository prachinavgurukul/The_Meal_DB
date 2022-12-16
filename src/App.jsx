import './App.css';
import  react,{ useEffect, useState } from 'react';
export default function App(){
const[data,setData]=useState([])
const[allsearch,setAllSearch]=useState("")
const[addcart,setAddCart]=useState([])
const getData=async()=>{
const response=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
const result =await response.json()
setData(result.meals)
console.log(result)
}
const searchbar=!allsearch? data:data.filter((item)=>
item.strMeal.toLowerCase().includes(allsearch.toLowerCase())
)
useEffect(()=>{
getData()
},[])
return(
  <div id="a" ><h1>TheMealDB</h1>
    <input id="search" type="serch" placeholder='Search' value={allsearch} onChange={(e)=>{
      setAllSearch(e.target.value)
    }}/>
    <div id="container">
      {
        searchbar.map((item,index)=>{
          return(
            <div id='box' key={index}>
            <h3><b>{item.strMeal}</b></h3>
            <img id="image"src={item.strMealThumb}/>
            <button onClick={()=>{
                let tempObj={
                  strMeal:item.strMeal,
                  cost:65
              }
              console.log(tempObj)
              setAddCart([...addcart,tempObj])
              console.log(addcart)
            }}>Add to cart</button>
            </div>
          )
        })
      }          
    </div>
    <div><p><b>Food Bill</b></p></div>
    {
          addcart.map((item,index)=>{
            return(
            <div id="bill">
              <table>
              <td>Name:{item.strMeal}</td><br></br>
              <td>Cost:{item.cost}</td>
              </table>
              {/* <div id="total"><h5>{ addcart.length*65}</h5></div> */}
            </div>
            )
        })
    }
    <div id="total"><h5>Total Cost:{ addcart.length*65}</h5></div>
    </div>
  )
}