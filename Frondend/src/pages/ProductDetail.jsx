import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'

const ProductDetail = () => {

    const {id} = useParams()
    const [product, setProduct] = useState()
console.log(product);

    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            setProduct(data)
        })
        .catch(error => console.log(error))
    },[id])

    if (!product) {
        return <p>Loading...</p>
    }

  return (
    <>
        <div className="container">
            <div className="row my-5">
            <div className="col-lg-6">
                <div className="product-img">
                    <img src={`http://localhost:3000/uploads/${product.image}`} alt="" className='img-fluid' />
                </div>
            </div>
            <div className="col-lg-6">
                <div className="product-content">
                    <h6 className='text-uppercase'>{product.category?.name}</h6>
                    <h2>{product.name}</h2>
                    <div className="product-price">
                        <span className="current-price">${product.price}</span>
                    </div>
                    <p>{product.description}</p>
                    <p>In Stock <span style={{color: "green", fontWeight: "bold"}}>{product?.stock}</span> Items</p>

                    <div className="d-flex">
                        <Button title={"Add to Cart"} className={" w-50"} />
                        <Button title={"Buy Now "} className={" w-50"} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ProductDetail