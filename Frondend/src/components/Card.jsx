import React, { useEffect, useState } from 'react'
import { FaEye, FaStar } from 'react-icons/fa6'
import Button from './Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Card = ({ id, imgUrl, title, price, brand, category, product , onClick }) => {

    
    return (
        <>
            <div className="col-lg-3">
                <div className="product-card position-relative">
                    <div className="category">
                        <span>{category}</span>
                    </div>
                    <div className="viewicon">
                        <Link to={`/products/${id}`}>
                            <FaEye />
                        </Link>
                    </div>
                    <div className="product-image">
                        <img src={imgUrl} alt="" className='img-fluid' />
                    </div>
                    <div className="product-info">

                        <h3 className="product-title">{brand}</h3>
                        <h3 className="product-title">{title}</h3>
                        <div className="product-price">
                            <span className="current-price">${price}</span>
                        </div>
                        <div className="product-rating">
                            <FaStar className='star' />
                            <FaStar className='star' />
                            <FaStar className='star' />
                            <FaStar className='star' />
                        </div>
                        <Button onClick={onClick} className={"w-100"} product={product} title={"Add to Cart"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card