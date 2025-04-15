// Auth Functions
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.signInWithEmailAndPassword(email, password)
      .then(() => updateUI())
      .catch(error => document.getElementById("authStatus").textContent = error.message);
  }
  
  function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users").doc(auth.currentUser.uid).set({
          points: 0,
          email: email
        });
        updateUI();
      })
      .catch(error => document.getElementById("authStatus").textContent = error.message);
  }
  
  function logout() {
    auth.signOut();
  }
  
  // Update UI
  function updateUI() {
    if (auth.currentUser) {
      document.getElementById("authSection").style.display = "none";
      document.getElementById("userSection").style.display = "block";
      document.getElementById("userName").textContent = auth.currentUser.email;
      document.getElementById("checkoutBtn").style.display = "block";
      
      // Load points
      db.collection("users").doc(auth.currentUser.uid).get()
        .then(doc => {
          if (doc.exists) {
            document.getElementById("userPoints").textContent = doc.data().points;
          }
        });
    } else {
      document.getElementById("authSection").style.display = "block";
      document.getElementById("userSection").style.display = "none";
      document.getElementById("checkoutBtn").style.display = "none";
    }
  }
  
  // Cart Functions
  function addToCart(item, price) {
    if (!auth.currentUser) {
      alert("Please login to order!");
      return;
    }
  
    db.collection("users").doc(auth.currentUser.uid)
      .collection("cart").add({
        item: item,
        price: price,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => renderCart());
  }
  
  function renderCart() {
    if (!auth.currentUser) return;
  
    const cartItemsDiv = document.getElementById("cartItems");
    cartItemsDiv.innerHTML = "";
  
    db.collection("users").doc(auth.currentUser.uid)
      .collection("cart").orderBy("timestamp").get()
      .then(querySnapshot => {
        let total = 0;
        querySnapshot.forEach(doc => {
          const item = doc.data();
          total += item.price;
          cartItemsDiv.innerHTML += `
            <div class="cart-item">
              ${item.item} - £${item.price.toFixed(2)}
              <button onclick="removeFromCart('${doc.id}')">×</button>
            </div>
          `;
        });
        document.getElementById("cartTotal").innerText = `Total: £${total.toFixed(2)}`;
      });
  }
  
  function removeFromCart(itemId) {
    db.collection("users").doc(auth.currentUser.uid)
      .collection("cart").doc(itemId).delete()
      .then(() => renderCart());
  }
  
  function checkout() {
    // Add Stripe/PayPal integration here later
    alert("Order placed! Points will be added after payment.");
  }
  
  // Init
  auth.onAuthStateChanged(updateUI);
  document.addEventListener("DOMContentLoaded", renderCart);