const CONTACT_ENDPOINT =
  process.env.REACT_APP_CONTACT_FORM_ENDPOINT || "/api/contact";

/**
 * Send a contact form submission to the backend.
 * The backend is responsible for emailing info@springtours.com.
 */
export async function submitContactForm(payload) {
  const res = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Failed to send message.";
    try {
      const data = await res.json();
      if (data && typeof data.error === "string") {
        message = data.error;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return res.json().catch(() => null);
}

