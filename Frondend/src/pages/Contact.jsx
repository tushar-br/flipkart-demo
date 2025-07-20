import React, { useState } from 'react'
import Map from '../components/Map'
import Button from '../components/Button'
import axios from 'axios'

const Contact = () => {

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [comment, setComment] = useState()
  const [email, setEmail] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/api/contact", { name, phone, comment,email });
      alert("Message is Send!!")
    }
    catch (err) {
      alert(err)
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <Map />
          </div>
          <div className='col-lg-6'>
            <form onSubmit={handleSubmit}>
              <label >Name : </label>
              <input type='text' onChange={(e) => setName(e.target.value)} /><br />
              <label >Phone No : </label>
              <input type='text' onChange={(e) => setPhone(e.target.value)} /><br />
              <label >E mail : </label>
              <input type='email' onChange={(e) => setEmail(e.target.value)} /><br />
              <label >Comment : </label>
              <textarea type='text' onChange={(e) => setComment(e.target.value)} /><br />
              <Button title="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact