import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState()
  const userId = localStorage.getItem("userId");
  const fetchUser = async () => {

    try {
      const res = await axios.get(`http://localhost:3000/api/auth/${userId}`);
      console.log(res.data);
      setUser(res.data)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      {user &&
        <div>
          <h1>Username : {user.name} </h1>
          <h1>Email : {user.email} </h1>
          <h1>Role : {user.role} </h1>
        </div>
      }
    </>
  )
}

export default Profile
