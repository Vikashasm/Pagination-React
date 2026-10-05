import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const[products,setProducts]=useState([])
  const[currentPage,setCurrentPage]=useState(0)


  async function getProducts() {
    try {
      let data = await fetch("https://dummyjson.com/products?limit=100");
      let final_value =await data.json();
      setProducts(final_value.products)
    
      return final_value;
    } catch (error) {
      console.log(error);
    }
  }

  let ProductLenght=10;
  let totalpage=Math.ceil(products.length / ProductLenght)
  let startPage=currentPage * ProductLenght
  let endPage= startPage + ProductLenght


  function handleCurrentPage(value){
    setCurrentPage(value)
  }
  function handleNextPage(v){
    setCurrentPage(currentPage+1)
  }
  function handlePrevPage(value){
    setCurrentPage(currentPage-1)
  }

  useEffect(() => {
    getProducts();
 
  }, []);

  return (
    <div className="">
      <h1 className="text-bold text-3xl text-center mb-5">
        Here you can see the final product list{" "}
      </h1>
      <div className="flex justify-center">
        <button disabled={currentPage==0} onClick={handlePrevPage} className="border p-2 rounded m-1 cursor-pointer">⬅️</button>
        {[
          ...Array(totalpage)
            .keys()
            .map((item, index) => (
              <h1 className={`border p-2 rounded m-1 cursor-pointer ${currentPage==index ?"Active":""}`}onClick={()=>handleCurrentPage(index)} key={index}>
                {item+1}
              </h1>
            )),
        ]}
        <button disabled={currentPage==totalpage-1} onClick={handleNextPage} className="border p-2 rounded m-1 cursor-pointer">➡️</button>
      </div>
      <div className="flex flex-wrap gap-4 justify-around">
        {products.slice(startPage,endPage).map((item, index) => {
          return (
            <div
              className="border w-[400px] p-4 bg-amber-600 border border-black rounded-xl "
              key={index}
            >
              <h3>Id: {item.id}</h3>
              <h3>Title: {item.title}</h3>
              <h3>Description: {item.description}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
