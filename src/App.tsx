import React, { useState, useEffect, FC } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

interface Person {
  image: string
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  picture: Picture
  dob: Registered
}
interface Name {
  title: string
  first: string
  last: string
}

interface Location {
  street: string
}

interface Login {
  username: string
  password: string
}

interface Picture {
  thumbnail: string
  large: string
}

interface Registered {
  age: number
}



const App: FC = () => {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState<Person | null>(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const p = data.results[0]
    setPerson(p)
    setLoading(false)
    setTitle('name')
    setValue(`${p.name.first} ${p.name.last}`)
  }

  useEffect(() => {
    getPerson()
  }, [])

  const handleValue = (e: any) => {
    if (e.target.classList.contains('icon')) {
      let newValue = e.target.dataset.label as keyof typeof person
      setTitle(newValue)
      if (person) {
        setValue(person[newValue])
      }
    }
  }

  return <main>
    <div className="block bcg-black"></div>

    <div className="block">
      <div className="container">
        <img src={(person && person.picture.large) || defaultImage} alt="random user" className="user-img" />
        <p className="user-title">my {title} is</p>
        <p className="user-value">{value}</p>
        <div className="values-list">
          <button className="icon" data-label="name" onMouseOver={handleValue}><FaUser /></button>

          <button className="icon" data-label="email" onMouseOver={handleValue}><FaEnvelopeOpen /></button>

          <button className="icon" data-label="age" onMouseOver={handleValue}><FaCalendarTimes /></button>

          <button className="icon" data-label="street" onMouseOver={handleValue}><FaMap /></button>

          <button className="icon" data-label="phone" onMouseOver={handleValue}><FaPhone /></button>

          <button className="icon" data-label="password" onMouseOver={handleValue}><FaLock /></button>

          <button className="btn" type="button" onClick={getPerson}>{loading ? "loading..." : "random user"}</button>
        </div>
      </div>
    </div>
  </main>
}

export default App
