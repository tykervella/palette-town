import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleMessageChange = (e) => {
    const inputMessage = e.target.value;
    if (inputMessage.length <= 500) {
      setMessage(inputMessage);
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setShowErrorMessage(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && message) {
      // email will send to marley's email, or be set up to send there once send message is clicked (can set it to any email l8tr)
      const mailtoLink = `mailto:marleysue@gmail.com?subject=Message from ${name}&body=${message}`;
      window.open(mailtoLink);
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full p-8 bg-[#0B3C49] text-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        {showErrorMessage && (
          <p className="text-red-500 text-sm mb-4">
            Please fill out all the sections.
          </p>
        )}
        <form onSubmit={handleSubmit} className="box-shadow-xl p-8 rounded-lg">
          <div className="mb-6">
            <label htmlFor="name" className="block text-white font-bold text-xl mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="appearance-none bg-transparent border-b-2 border-[#376D5B] w-full py-2 px-3 text-white leading-tight focus:outline-none"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white font-bold text-xl mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none bg-transparent border-b-2 border-[#376D5B] w-full py-2 px-3 text-white leading-tight focus:outline-none"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-white font-bold text-xl mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              className="appearance-none bg-transparent border-b-2 border-[#376D5B] w-full py-2 px-3 text-white leading-tight focus:outline-none resize-none"
              rows="6"
              placeholder="Enter your message"
              value={message}
              onChange={handleMessageChange}
              maxLength="500"
              onBlur={handleBlur}
            ></textarea>
            <p className="text-right text-white text-sm mt-1">
              {message.length}/500 characters
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#FFEC99] hover:bg-[#4B957E] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={
                name === "" ||
                email === "" ||
                message === "" ||
                message.length > 500
              }
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
