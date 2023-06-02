import { SingleColor } from "./components/SingleColor"
import { useEffect } from "react"
import { useState } from "react"
import Values from "values.js"
import { rgbToHex } from "./utils"
const App = () => {
  const [hexValue, setHexValue] = useState("#7289DA")
  const [allColorValues, setAllColorValues] = useState([])
  const [error, isError] = useState(false)

  useEffect(() => {
    try {
      isError(false)
      const color = new Values(hexValue)
      setAllColorValues(color.all(10))
    } catch (error) {
      console.log(error)
      isError(true)
    }
  }, [hexValue])
  // console.log(allColorValues)
  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataEntries = new FormData(e.currentTarget)
    // console.log(formDataEntries)
    const formDataObj = Object.fromEntries(formDataEntries)
    setHexValue(formDataObj.color)
  }
  return (
    <main>
      <header>
        <h1 className="title">color tint & shade generator</h1>
        <form className="color-form" onSubmit={handleSubmit}>
          <label
            htmlFor="color"
            className="color-label"
            style={{ height: "34px", width: "34px", backgroundColor: hexValue }}
          ></label>
          <input
            className={`color-input ${error && "is-error"}`}
            type="text"
            id="color"
            name="color"
            placeholder="#7289DA"
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </header>
      {error ? (
        <h3 className="error-h3">
          There was an error. Maybe, your color input was wrong.
        </h3>
      ) : (
        <section className="color-container">
          {allColorValues.map((oneColorValue, index) => {
            const { weight, rgb } = oneColorValue
            const hexColor = rgbToHex(...rgb)
            return (
              <SingleColor
                key={index}
                index={index}
                weight={weight}
                hexColor={hexColor}
              />
            )
          })}
        </section>
      )}
    </main>
  )
}
export default App
