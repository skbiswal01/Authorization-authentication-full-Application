import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductContext from "../context/Products/ProductContext"
import {ProductItem} from './ProductItem';
import {AddProduct} from './AddProduct';
import { useNavigate } from 'react-router-dom';

const Products = (props) => {
    const context = useContext(ProductContext);
    const { Products, getProducts, editProduct } = context;
    const history = useNavigate();
    useEffect(() => {
       if(localStorage.getItem('token')){
        getProducts()
       }else{
         history('/login')
       }
       
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [Product, setProduct] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateProduct = (currentProduct) => {
        ref.current.click();
        setProduct({id: currentProduct._id, etitle: currentProduct.title, edescription: currentProduct.description, etag:currentProduct.tag})
        
    }

    const handleClick = (e)=>{ 
        editProduct(Product.id, Product.etitle, Product.edescription, Product.etag)
        refClose.current.click();
        props.showAlert("updated successfully", "success");
    }

    const onChange = (e)=>{
        setProduct({...Product, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddProduct showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={Product.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={Product.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={Product.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={Product.etitle.length<5 || Product.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Products</h2>
                <div className="container mx-2"> 
                {Products.length===0 && 'No Products to display'}
                </div>
                {Products.map((Product) => {
                    return <ProductItem key={Product._id} updateProduct={updateProduct} Product={Product} />
                })}
            </div>
        </>
    )
}

export default Products