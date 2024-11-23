// Mark the component as a client component
"use client";

import {useState} from "react";

export default function SubmitIdea() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to an API
        console.log("Idea submitted:", {title, description});
        setSubmitted(true);
    };

    return (
        <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px"}}>
            <h1>Submit Your Idea</h1>
            {submitted ? (
                <p>Thank you for submitting your idea!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: "10px"}}>
                        <label
                            htmlFor="title"
                            style={{display: "block", fontWeight: "bold"}}
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginBottom: "10px",
                            }}
                            required
                        />
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <label
                            htmlFor="description"
                            style={{display: "block", fontWeight: "bold"}}
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{width: "100%", padding: "8px"}}
                            rows="5"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{padding: "10px 20px", fontWeight: "bold"}}
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
