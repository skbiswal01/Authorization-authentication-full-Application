import React, { useContext, useState } from 'react'
import ProductContext from '../context/Products/ProductContext';

export const AddProduct = (props) => {
  const context = useContext(ProductContext);
  const {addProduct} =context;
  
  const [Product, setProduct] = useState({title: "", description: "", tag: ""})

  const handleClick = (e)=>{
      e.preventDefault();
      addProduct(Product.title, Product.description, Product.tag);
      setProduct({title: "", description: "", tag: ""})
      props.showAlert("added successfully", "success")
  }

  const onChange = (e)=>{
      setProduct({...Product, [e.target.name]: e.target.value})
  }
  return (
      <div className="container my-3">
          <h2>Add a Product</h2>
          <form className="my-3">
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={Product.title} onChange={onChange} minLength={5} required /> 
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" value={Product.description} onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" value={Product.tag} onChange={onChange} minLength={5} required />
              </div>
             
              <button disabled={Product.title.length<5 || Product.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Product</button>
          </form>
      </div>
  )
  
}
