import { useEffect, useState } from "react";
import { Link } from "react-router";

function App() {
  const [message, setMessage] = useState("");
  const [formMsg, setFormMsg] = useState(""); 
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    // GET
    fetch("http://localhost:5000/api")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load");
      });
  }, []);

  // POST
  const formSub = async (e) => {
    e.preventDefault();
    if (!formMsg.trim()) {
      setSubmitStatus("Please enter a message");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/msg/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: formMsg }),
      });

      if (!response.ok) throw new Error("Failed to send");

      const result = await response.json();
      console.log("Success:", result);
      setSubmitStatus("Message sent successfully!");
      setFormMsg(""); 
    } catch (err) {
      console.error("Error:", err);
      setSubmitStatus("Failed to send");
    }
  };

  return (
    <div className="bg-white h-screen w-full p-2">
      <div className="flex items-center gap-2 mb-4">
        <Link to="/home" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/about" className="text-blue-600 hover:underline">About</Link>
      </div>

      <div className="py-2">
        <p>
          GET request message:{" "}
          {message || "waiting for msg..."}
        </p>
      </div>

      <form onSubmit={formSub} className="space-y-3">
        <div>
          <label htmlFor="msgInput" className="block font-medium">
            Enter the message:
          </label>
          <input
            id="msgInput"
            type="text"
            value={formMsg} 
            onChange={(e) => setFormMsg(e.target.value)}
            className="border-b-2 border-gray-300 outline-none focus:border-blue-500 px-1 mt-1 w-full max-w-xs"
            placeholder="Type here..."
          />
        </div>

        <button
          type="submit"
          className="border border-blue-500 text-blue-600 px-4 py-1 rounded text-sm hover:bg-blue-50 cursor-pointer"
        >
          Send
        </button>

        {submitStatus && (
          <p className={`text-sm mt-2 ${submitStatus.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {submitStatus}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;