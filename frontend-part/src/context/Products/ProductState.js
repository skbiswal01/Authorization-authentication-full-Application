import ProductContext from "./ProductContext";
import { useState } from "react";

const ProductState = (props) => {
  const host = "http://localhost:5000"
  const ProductsInitial = [];
  const [Products, setProducts] = useState(ProductsInitial);

  // Get all Products
  const getProducts = async () => {
    // API Call 
    const response = await fetch(`${host}/api/products/fetchallproducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json() 
    setProducts(json)
  }

  // Add a Product
  const addProduct = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/products/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });

    const Product = await response.json();
    setProducts(Products.concat(Product))
  }

  // Delete a Product
  const deleteProduct = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/products/deleteproduct/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    response.json(); 
    const newProducts = Products.filter((Product) => { return Product._id !== id })
    setProducts(newProducts)
    
  }

  // Edit a Product
  const editProduct = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/products/updateproduct/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    response.json(); 

     let newProducts = JSON.parse(JSON.stringify(Products))
    // Logic to edit in client
    for (let index = 0; index < newProducts.length; index++) {
      const element = newProducts[index];
      if (element._id === id) {
        newProducts[index].title = title;
        newProducts[index].description = description;
        newProducts[index].tag = tag; 
        break; 
      }
    }  
    setProducts(newProducts);
  }

  return (
    <ProductContext.Provider value={{ Products, addProduct, deleteProduct, editProduct, getProducts }}>
      {props.children}
    </ProductContext.Provider>
  )

}
export default ProductState;