"use client"
import { useState } from "react"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleUpload = async () => {
    if (!file) return alert("Please select a file")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (err) {
      alert("Error connecting to backend")
      console.error(err)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Bridge Crack Analyzer</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <br /><br />
      <button onClick={handleUpload}>Analyze</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
