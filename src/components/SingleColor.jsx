import React from "react"
import { useEffect } from "react"
import { useState } from "react"
export function SingleColor({ index, weight, hexColor }) {
  const [alert, setAlert] = useState(false)
  const handleClick = () => {
    navigator.clipboard.writeText(hexColor)
    setAlert(true)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [alert])

  return (
    <article
      className="color-article"
      key={index}
      onClick={handleClick}
      style={{
        backgroundColor: hexColor,
        color: index > 10 ? "white" : "black",
      }}
    >
      <p className="color-weight">{`${weight}%`}</p>
      <p className="color-hex">{hexColor.toUpperCase()}</p>
      {alert && (
        <p
          className="clipboard"
          style={{
            color: index > 10 ? "white" : "black",
          }}
        >
          copied to clipboard.
        </p>
      )}
    </article>
  )
}
