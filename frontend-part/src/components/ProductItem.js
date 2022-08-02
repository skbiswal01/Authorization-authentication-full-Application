import React, { useContext } from 'react'
import ProductContext from '../context/Products/ProductContext';

export const ProductItem = (props) => {
    const context = useContext(ProductContext);
    const {deleteProduct} = context;
    const { Product, updateProduct } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{Product.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteProduct(Product._id);  props.showAlert("deletd successfully", "success")}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateProduct(Product)}}></i>
                    </div>
                    <p className="card-text">{Product.description}</p>

                </div>
            </div>
        </div>
    )
}