import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_LINK = "https://wa.me/20227365973";

function WhatsAppChatButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-chat-btn"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-chat-btn-icon">
        <FaWhatsapp size={22} />
      </span>
      <span className="whatsapp-chat-btn-text">Chat With Us</span>
    </a>
  );
}

export default WhatsAppChatButton;
