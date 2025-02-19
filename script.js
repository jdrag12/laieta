document.getElementById("signup-form").addEventListener("submit", async event => {
  event.preventDefault() // Evita el comportament per defecte del formulari

  const submitButton = event.target.querySelector('input[type="submit"]')

  // Obtenim els valors del formulari
  const name = document.getElementById("name").value
  const phone = document.getElementById("phone").value
  const email = document.getElementById("email").value

  // Creem un objecte FormData amb els valors
  const formData = new FormData()
  formData.append("name", name)
  formData.append("phone", phone)
  if (email) formData.append("email", email)

  // Desactivar el botó mentre es processa la sol·licitud
  submitButton.disabled = true
  submitButton.value = "Enviant..."

  // Seleccionem la zona per mostrar el missatge
  const confirmationMessage = document.getElementById("confirmation-message")

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwenPNVags8ZCATnL_R6jOqO3oPC7zNIbIrL-7uEOXLZz21ndcBWklkjdZBd7ro3AOU/exec",
      {
        method: "POST",
        body: formData, // Enviem les dades al Google Script
      }
    )

    if (response.ok) {
      // Mostrem el missatge de confirmació
      confirmationMessage.textContent = `¡Gràcies, ${name}, per confirmar la teva assistència!`
      confirmationMessage.style.color = "green"
      document.getElementById("signup-form").reset() // Reseteja el formulari
    } else {
      // Mostrem un missatge d'error
      confirmationMessage.textContent =
        "Hi ha hagut un problema al registrar les teves dades. Torna-ho a intentar."
      confirmationMessage.style.color = "red"
    }
  } catch (error) {
    // Mostrem un error de connexió
    confirmationMessage.textContent =
      "Error de connexió. Si us plau, revisa la teva connexió i torna-ho a intentar."
    confirmationMessage.style.color = "red"
  } finally {
    // Reactivar el botó
    submitButton.disabled = false
    submitButton.value = "Enviar"
  }
})
