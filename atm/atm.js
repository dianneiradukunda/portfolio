// Store all registered users in localStorage
let users = JSON.parse(localStorage.getItem("atmUsers")) || [];
let currentUser = null;

function showScreen(id) {
  document.querySelectorAll(".atm-box").forEach(box => box.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ===== REGISTER =====
document.getElementById("createAccountBtn").addEventListener("click", () => {
  const username = document.getElementById("regUsername").value.trim();
  const pin = document.getElementById("regPin").value.trim();
  const confirmPin = document.getElementById("regPinConfirm").value.trim();
  const msg = document.getElementById("regMsg");

  if (!username || !pin || !confirmPin) {
    msg.style.color = "yellow";
    msg.textContent = "⚠️ Please fill all fields.";
    return;
  }

  if (pin !== confirmPin) {
    msg.style.color = "red";
    msg.textContent = "❌ PINs do not match.";
    return;
  }

  if (!/^[0-9]{4}$/.test(pin)) {
    msg.style.color = "yellow";
    msg.textContent = "⚠️ PIN must be 4 digits.";
    return;
  }

  if (users.find(u => u.username === username)) {
    msg.style.color = "red";
    msg.textContent = "❌ Username already exists.";
    return;
  }

  users.push({ username, pin, balance: 0 });
  localStorage.setItem("atmUsers", JSON.stringify(users));

  msg.style.color = "#00ffe7";
  msg.textContent = "✅ Account created successfully!";

  setTimeout(() => {
    showScreen("loginScreen");
  }, 1500);
});

// ===== LOGIN =====
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const msg = document.getElementById("loginMsg");

  const user = users.find(u => u.username === username && u.pin === pin);

  if (user) {
    currentUser = user;
    document.getElementById("userDisplay").textContent = currentUser.username;
    updateBalanceDisplay();
    showScreen("menuScreen");
  } else {
    msg.style.color = "red";
    msg.textContent = "❌ Invalid username or PIN.";
  }
});

// ===== MENU OPERATIONS =====
function updateBalanceDisplay() {
  document.getElementById("balanceDisplay").textContent = currentUser.balance;
  localStorage.setItem("atmUsers", JSON.stringify(users));
}

function deposit() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const msg = document.getElementById("depositMsg");

  if (isNaN(amount) || amount <= 0) {
    msg.style.color = "yellow";
    msg.textContent = "⚠️ Enter a valid amount.";
    return;
  }

  currentUser.balance += amount;
  msg.style.color = "#00ffe7";
  msg.textContent = `✅ Deposited ${amount} RWF successfully.`;
  updateBalanceDisplay();
  document.getElementById("depositAmount").value = "";
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const msg = document.getElementById("withdrawMsg");

  if (isNaN(amount) || amount <= 0) {
    msg.style.color = "yellow";
    msg.textContent = "⚠️ Enter a valid amount.";
    return;
  }

  if (amount > currentUser.balance) {
    msg.style.color = "red";
    msg.textContent = "❌ Insufficient balance.";
    return;
  }

  currentUser.balance -= amount;
  msg.style.color = "#00ffe7";
  msg.textContent = `✅ Withdrawn ${amount} RWF successfully.`;
  updateBalanceDisplay();
  document.getElementById("withdrawAmount").value = "";
}

function checkBalance() {
  alert(`💰 Current Balance: ${currentUser.balance} RWF`);
}

function changePin() {
  const newPin = document.getElementById("newPin").value.trim();
  const confirmPin = document.getElementById("confirmPin").value.trim();
  const msg = document.getElementById("pinMsg");

  if (!/^[0-9]{4}$/.test(newPin)) {
    msg.style.color = "yellow";
    msg.textContent = "⚠️ PIN must be 4 digits.";
    return;
  }

  if (newPin !== confirmPin) {
    msg.style.color = "red";
    msg.textContent = "❌ PINs do not match.";
    return;
  }

  currentUser.pin = newPin;
  msg.style.color = "#00ffe7";
  msg.textContent = "✅ PIN successfully changed!";
  updateBalanceDisplay();

  setTimeout(() => {
    showScreen("menuScreen");
  }, 1500);
}

function logout() {
  currentUser = null;
  showScreen("loginScreen");
  document.getElementById("username").value = "";
  document.getElementById("pin").value = "";
}
