import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

const AddProduct = () => {
    const [form, setForm] = useState({
        name: "",
        price: "",
        des: "",
        category: ""
    })
    const [products, setProducts] = useState([]);
    const [allCategorys, setAllCategorys] = useState([]);
    const [editId, setEditId] = useState();

    const AllProducts = async () => {

        try {
            const res = await axios.get("http://localhost:3000/api/add/product");
            setProducts(res.data);
        }
        catch (err) {
            alert(err)
        }
    }

    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("des", form.des);
        formData.append("image", image);
        formData.append("category", form.category);

        try {
            console.log(formData, "formData");
            if (editId) {
                await axios.put(`http://localhost:3000/api/edit/product/${editId}`, formData);
                setEditId(null)
            } else {
                await axios.post("http://localhost:3000/api/add/product", formData);
                alert("Added product Successfully");
            }

        }
        catch {
            alert("Fail to add product")
        }
        setForm({
            name: "",
            price: "",
            des: "",
            category: ""
        })
        setImage(null);
        AllProducts()
    }

    const getCategory = async () => {

        try {
            const res = await axios.get('http://localhost:3000/api/categories');
            console.log(res.data);
            setAllCategorys(res.data);
        }
        catch (err) {
            console.log(err, "err");

        }
    }

    useEffect(() => {
        AllProducts()
        getCategory()
    }, [])

    console.log(products);

    const handleEdit = (p) => {
        setForm({
            name: p.name,
            price: p.price,
            des: p.description,
            category: p.category.name
        })

        setEditId(p._id)
    }
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/api/delete/product/${id}`);
        AllProducts();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Select Category : </label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option>Select Category</option>
                    {allCategorys.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}

                </select><br />

                <label>Product Image : </label>
                <input type='file' onChange={(e) => setImage(e.target.files[0])} /><br />
                <label>Product Name : </label>
                <input type='text' value={form.name} name='name' onChange={((e) => setForm({ ...form, name: e.target.value }))} /><br />
                <label>Product Description : </label>
                <input type='text' value={form.des} name='des' onChange={((e) => setForm({ ...form, des: e.target.value }))} /><br />
                <label>Product Price</label>
                <input type='number' value={form.price} name='price' onChange={((e) => setForm({ ...form, price: e.target.value }))} /><br />
                <button type='submit'>{editId ? "Update" : "Add"}</button>
            </form>

            {
                products.map((p) => (
                    <>
                        <img src={`http://localhost:3000/uploads/${p.image}`} />
                        <h1>Category Name: {p?.category?.name}</h1>
                        <h1>Product Name : {p.name}</h1>
                        <h1>Product Price : {p.price}</h1>
                        <button onClick={() => handleEdit(p)} >Edit</button>
                        <button onClick={() => handleDelete(p._id)}>Delete</button><br />
                    </>
                ))
            }
        </div>
    )
}

export default AddProduct
