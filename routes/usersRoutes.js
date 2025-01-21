const express = require("express");
const router = express.Router();

const users = [];
const sessions = {};

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email i hasło są wymagane." });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Użytkownik już istnieje." });
  }

  users.push({ email, password });
  res.status(201).json({ message: "Użytkownik zarejestrowany pomyślnie." });
});

router.post("/login", (req, res) => {
  console.log("Otrzymano dane logowania:", req.body);
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Nieprawidłowe dane logowania." });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Nieprawidłowe dane logowania." });
  }

  const sessionId = Math.random().toString(36).substring(2);
  sessions[sessionId] = email;

  res.cookie("sessionId", sessionId, { httpOnly: true });
  res.json({ message: "Zalogowano pomyślnie." });
});

router.get("/check-login", (req, res) => {
  const sessionId = req.cookies.sessionId;
  const email = sessions[sessionId];

  if (!email) {
    return res.status(401).json({ message: "Użytkownik niezalogowany." });
  }

  res.json({ message: `Zalogowany jako ${email}.` });
});

router.post("/logout", (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    delete sessions[sessionId];
    res.clearCookie("sessionId");
  }
  res.json({ message: "Wylogowano pomyślnie." });
});

module.exports = router;
