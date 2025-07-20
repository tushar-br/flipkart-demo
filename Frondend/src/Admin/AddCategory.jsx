import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const AddCategory = () => {
    const [category, setCategory] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/categories", { name: category });
            alert("Added category Successfully");
        }
        catch (err) {
            alert(err)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Category Name :</label>
                <input type='text' name='categoty' onChange={((e) => setCategory(e.target.value))} /><br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddCategory
