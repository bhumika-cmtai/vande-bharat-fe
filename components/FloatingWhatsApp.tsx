// components/FloatingWhatsApp.tsx
"use client"

import React from "react"
import { FaWhatsapp } from "react-icons/fa"

const FloatingWhatsApp = () => {
  const phoneNumber = "91xxxxxx" // Replace with your WhatsApp number
  const message = "Hello! I'd like to inquire about your jewelry." // Optional pre-filled message

  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  )
}

export default FloatingWhatsApp