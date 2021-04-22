import React, {useState} from 'react'

const initialValue = ""

const Home = () => {
  const [poem, setPoem] = useState(initialValue)

  const handleChange = e => {
    setPoem(e.target.value);
  }

  const submitRhymes = e => {
    e.preventDefault();
  }

  const submitMeter = e => {
    e.preventDefault()
  }

  return (
    <div>
      <h3>Poetry is easier than ever with Iambe!</h3>
      <ul>
        <li>Visualize <span className="red">rhyme schemes</span>!</li>
        <li>Detect over a dozen kinds of <span className="yellow">slant rhyme</span>!</li>
        <li>Identify <span className="blue">meter</span> and <span className="blue">verse form</span>!</li>
      </ul>
      <h3>Try it!</h3>
      <form>
        <textarea value={poem} onChange={handleChange} placeholder="Enter a poem..." />
        <button onClick={submitRhymes} />
        <button onClick={submitMeter} />
      </form>
    </div>
  )
}

export default Home
