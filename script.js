// Main App Controller
export function initializeApp(firebase) {
  const {
    auth,
    db,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    collection,
    doc,
    setDoc,
    getDoc,
    addDoc,
    deleteDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    increment
  } = firebase;

  // DOM Elements
  const elements = {
    authSection: document.getElementById('authSection'),
    userSection: document.getElementById('userSection'),
    emailInput: document.getElementById('email'),
    passwordInput: document.getElementById('password'),
    authStatus: document.getElementById('authStatus'),
    userName: document.getElementById('userName'),
    userPoints: document.getElementById('userPoints'),
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    menuGrid: document.getElementById('menuGrid'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    itemCount: document.getElementById('itemCount'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    categoryList: document.getElementById('categoryList'),
    menuCategoryTitle: document.getElementById('menuCategoryTitle'),
    loyaltyNote: document.getElementById('loyaltyNote'),
    potentialPoints: document.getElementById('potentialPoints')
  };

  // App State with complete GFB menu
  const state = {
    currentUser: null,
    cartItems: [],
    menuItems: [
      // ===== FISH & CHIPS =====
      {
        id: 'fc1',
        name: 'Chips',
        description: 'Golden fried potato chips',
        price: 2.00,
        category: 'fish-and-chips',
        sizes: [
          { name: 'Small', price: 2.00 },
          { name: 'Medium', price: 2.50 },
          { name: 'Large', price: 3.00 }
        ]
      },
      {
        id: 'fc2',
        name: 'Small Cod',
        description: 'Fresh small cod portion',
        price: 4.00,
        category: 'fish-and-chips',
        options: [
          { name: 'With Chips', price: 4.50 }
        ]
      },
      {
        id: 'fc3',
        name: 'Large Cod',
        description: 'Fresh large cod portion',
        price: 6.50,
        category: 'fish-and-chips',
        options: [
          { name: 'With Chips', price: 7.50 }
        ]
      },

      // ===== SOUTHERN FRIED CHICKEN =====
      {
        id: 'ck1',
        name: '1 Piece Chicken',
        description: 'Crispy southern fried chicken',
        price: 1.50,
        category: 'chicken',
        options: [
          { name: 'With Chips', price: 2.50 }
        ]
      },
      {
        id: 'ck2',
        name: '2 Pieces Chicken',
        description: 'Crispy southern fried chicken',
        price: 2.80,
        category: 'chicken',
        options: [
          { name: 'With Chips', price: 3.80 }
        ]
      },
      {
        id: 'ck3',
        name: '5 Pieces Chicken',
        description: 'Crispy southern fried chicken',
        price: 6.50,
        category: 'chicken'
      },
      {
        id: 'ck4',
        name: '10 Pieces Chicken',
        description: 'Crispy southern fried chicken',
        price: 12.50,
        category: 'chicken'
      },

      // ===== BURGERS =====
      {
        id: 'bg1',
        name: 'Burgers',
        description: 'Juicy burger with your choice of filling',
        price: 8.50,
        category: 'burgers'
      },
      {
        id: 'bg2',
        name: 'Choice of Burgers',
        description: 'Select from our premium options',
        price: 9.50,
        category: 'burgers'
      },
      {
        id: 'bg3',
        name: 'Chicken Steak/Burger/Zinger/Vegetable',
        description: 'Premium burger selection',
        price: 10.50,
        category: 'burgers'
      },
      {
        id: 'bg4',
        name: 'Donner or Chicken Meat Burger',
        description: 'Specialty meat burger',
        price: 11.50,
        category: 'burgers'
      },
      {
        id: 'bg5',
        name: 'Burger & Chips with Drink',
        description: 'Complete meal deal',
        price: 12.50,
        category: 'burgers'
      },

      // ===== KEBABS =====
      {
        id: 'kb1',
        name: 'Donner Kebab in Pitta',
        description: 'Served with salad & sauces',
        price: 3.50,
        category: 'kebabs',
        sizes: [
          { name: 'Small', price: 3.50 },
          { name: 'Large', price: 5.50 }
        ]
      },
      {
        id: 'kb2',
        name: 'Donner Kebab in Naan',
        description: 'Served with salad & sauces',
        price: 16.50,
        category: 'kebabs'
      },
      {
        id: 'kb3',
        name: 'Mix Meat Kebab in Pitta',
        description: 'Chicken & Donner mix',
        price: 4.00,
        category: 'kebabs',
        sizes: [
          { name: 'Small', price: 4.00 },
          { name: 'Large', price: 6.00 }
        ]
      },
      {
        id: 'kb4',
        name: 'Mix Meat Kebab in Naan',
        description: 'Chicken & Donner mix',
        price: 17.50,
        category: 'kebabs'
      },
      {
        id: 'kb5',
        name: 'Chicken Donner in Pitta',
        description: 'Served with salad & sauces',
        price: 4.50,
        category: 'kebabs',
        sizes: [
          { name: 'Small', price: 4.50 },
          { name: 'Large', price: 6.50 }
        ]
      },
      {
        id: 'kb6',
        name: 'Chicken Donner in Naan',
        description: 'Served with salad & sauces',
        price: 19.50,
        category: 'kebabs'
      },

      // ===== KIDS MEALS =====
      {
        id: 'km1',
        name: 'Kids Fries',
        description: 'Small portion of chips',
        price: 1.70,
        category: 'kids',
        sizes: [
          { name: 'Small', price: 1.70 },
          { name: 'Medium', price: 2.20 },
          { name: 'Large', price: 2.70 }
        ]
      },
      {
        id: 'km2',
        name: '5 Nuggets',
        description: 'Chicken nuggets meal',
        price: 2.00,
        category: 'kids',
        options: [
          { name: 'With Chips', price: 2.50 }
        ]
      },
      {
        id: 'km3',
        name: 'Sausage',
        description: 'Kids sausage meal',
        price: 1.50,
        category: 'kids',
        options: [
          { name: 'With Chips', price: 2.50 }
        ]
      },
      {
        id: 'km4',
        name: '3 Fish/Veg Fingers',
        description: 'Kids fish fingers meal',
        price: 1.50,
        category: 'kids',
        options: [
          { name: 'With Chips', price: 2.50 }
        ]
      },

      // ===== EATERS =====
      {
        id: 'et1',
        name: 'Scallop',
        description: 'Fresh seafood scallop',
        price: 0.50,
        category: 'eaters'
      },
      {
        id: 'et2',
        name: 'Cod Roe',
        description: 'Fresh cod roe',
        price: 2.00,
        category: 'eaters'
      },
      {
        id: 'et3',
        name: 'Fish Cake',
        description: 'Traditional fish cake',
        price: 1.00,
        category: 'eaters'
      },
      {
        id: 'et4',
        name: 'Spring Roll',
        description: 'Crispy spring roll',
        price: 1.00,
        category: 'eaters'
      },
      {
        id: 'et5',
        name: 'Sausage',
        description: 'Traditional sausage',
        price: 1.50,
        category: 'eaters'
      },
      {
        id: 'et6',
        name: 'Battered Sausage',
        description: 'Golden battered sausage',
        price: 2.00,
        category: 'eaters'
      },
      {
        id: 'et7',
        name: 'Saveloy',
        description: 'Traditional saveloy',
        price: 1.50,
        category: 'eaters'
      },
      {
        id: 'et8',
        name: 'Pies',
        description: 'Hearty meat pie',
        price: 2.50,
        category: 'eaters'
      },
      {
        id: 'et9',
        name: 'Pasties',
        description: 'Flaky pastry filled with meat',
        price: 2.00,
        category: 'eaters'
      },
      {
        id: 'et10',
        name: 'Patties',
        description: 'Traditional patties',
        price: 2.00,
        category: 'eaters'
      },

      // ===== SAUCES & SIDES =====
      {
        id: 'ss1',
        name: 'Curry Sauce',
        description: 'Flavorful curry sauce',
        price: 1.00,
        category: 'sides',
        sizes: [
          { name: 'Small', price: 1.00 },
          { name: 'Large', price: 1.50 }
        ]
      },
      {
        id: 'ss2',
        name: 'Mushy Peas',
        description: 'Traditional mushy peas',
        price: 1.00,
        category: 'sides',
        sizes: [
          { name: 'Small', price: 1.00 },
          { name: 'Large', price: 1.50 }
        ]
      },
      {
        id: 'ss3',
        name: 'Gravy',
        description: 'Rich meat gravy',
        price: 1.00,
        category: 'sides',
        sizes: [
          { name: 'Small', price: 1.00 },
          { name: 'Large', price: 1.50 }
        ]
      },
      {
        id: 'ss4',
        name: 'Beans',
        description: 'Hearty baked beans',
        price: 1.00,
        category: 'sides',
        sizes: [
          { name: 'Small', price: 1.00 },
          { name: 'Large', price: 1.50 }
        ]
      },

      // ===== DRINKS =====
      {
        id: 'dr1',
        name: 'Cans 330ml',
        description: 'Assorted soft drinks (coca cola etc)',
        price: 0.90,
        category: 'drinks'
      },
      {
        id: 'dr2',
        name: 'Water 500ml',
        description: 'Bottled water',
        price: 0.90,
        category: 'drinks'
      },
      {
        id: 'dr3',
        name: 'Bottles 500ml',
        description: 'Assorted soft drinks',
        price: 1.30,
        category: 'drinks'
      }
    ]
  };

  // Initialize the application
  function init() {
    // Set first category as active by default
    const firstCategory = document.querySelector('#categoryList li:first-child');
    if (firstCategory) {
      firstCategory.classList.add('active');
      setActiveCategory(firstCategory.dataset.category);
    }
    
    setupEventListeners();
    initAuthState();
  }

  // Event Listeners
  function setupEventListeners() {
    // Auth buttons
    elements.loginBtn.addEventListener('click', handleLogin);
    elements.signupBtn.addEventListener('click', handleSignup);
    elements.logoutBtn.addEventListener('click', handleLogout);

    // Category navigation
    elements.categoryList.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const category = e.target.dataset.category;
        setActiveCategory(category);
      }
    });

    // Menu items (delegated)
    elements.menuGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const itemId = e.target.dataset.id;
        const item = state.menuItems.find(i => i.id === itemId);
        if (item) addToCart(item);
      }
    });

    // Cart items (delegated)
    elements.cartItems.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        removeFromCart(e.target.dataset.id);
      }
    });

    // Checkout
    elements.checkoutBtn.addEventListener('click', proceedToCheckout);
  }

  // Authentication
  function initAuthState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        state.currentUser = user;
        updateUI();
        fetchUserData(user.uid);
        initCartListener(user.uid);
      } else {
        state.currentUser = null;
        state.cartItems = [];
        updateUI();
      }
    });
  }

  async function handleLogin() {
    const email = elements.emailInput.value;
    const password = elements.passwordInput.value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showAuthMessage('Login successful!', 'success');
    } catch (error) {
      showAuthMessage(error.message, 'error');
    }
  }

  async function handleSignup() {
    const email = elements.emailInput.value;
    const password = elements.passwordInput.value;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        points: 0,
        createdAt: serverTimestamp()
      });

      showAuthMessage('Account created successfully!', 'success');
    } catch (error) {
      showAuthMessage(error.message, 'error');
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // User Data
  async function fetchUserData(userId) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        elements.userPoints.textContent = userDoc.data().points;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Menu System
  function renderMenu() {
    console.group('Rendering Menu');
    elements.menuGrid.innerHTML = '';
    const activeCategory = document.querySelector('.menu-categories li.active')?.dataset.category;
    
    console.log("Active Category:", activeCategory);
    console.log("All Menu Items:", state.menuItems);
    
    const categoryItems = state.menuItems.filter(item => {
      const matches = item.category === activeCategory;
      if (!matches) console.log(`Skipping ${item.name} - category: ${item.category}`);
      return matches;
    });
    
    console.log("Filtered Items:", categoryItems);
    
    if (categoryItems.length === 0) {
      elements.menuGrid.innerHTML = '<p class="empty-menu">No items found in this category</p>';
      console.warn("No items found for category:", activeCategory);
      console.groupEnd();
      return;
    }

    const fragment = document.createDocumentFragment();
    
    categoryItems.forEach(item => {
      console.log("Rendering item:", item.name);
      const menuItem = document.createElement('article');
      menuItem.className = 'menu-item';
      menuItem.dataset.id = item.id;
      
      menuItem.innerHTML = `
        <div class="item-details">
          <h3>${item.name}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          <div class="item-footer">
            <span class="price">£${item.price.toFixed(2)}</span>
            ${item.sizes ? `
              <select class="size-select">
                ${item.sizes.map(size => 
                  `<option value="${size.price}">${size.name} (£${size.price.toFixed(2)})</option>`
                ).join('')}
              </select>
            ` : ''}
            <button class="btn add-to-cart" data-id="${item.id}">
              + Add
            </button>
          </div>
        </div>
      `;
      fragment.appendChild(menuItem);
    });
    
    elements.menuGrid.appendChild(fragment);
    console.log(`Rendered ${categoryItems.length} items`);
    console.groupEnd();
  }

  function setActiveCategory(category) {
    // Update UI
    document.querySelectorAll('.menu-categories li').forEach(li => {
      li.classList.toggle('active', li.dataset.category === category);
    });
    
    // Update title
    const categoryName = document.querySelector(`.menu-categories li[data-category="${category}"]`).textContent;
    elements.menuCategoryTitle.textContent = categoryName;
    
    // Re-render menu
    renderMenu();
  }

  // Cart System
  function initCartListener(userId) {
    const q = query(
      collection(db, "users", userId, "cart"),
      orderBy("timestamp")
    );

    onSnapshot(q, (snapshot) => {
      state.cartItems = [];
      snapshot.forEach((doc) => {
        state.cartItems.push({
          id: doc.id,
          ...doc.data()
        });
      });
      updateCartDisplay();
    });
  }

  async function addToCart(item) {
    if (!state.currentUser) {
      // Add to temporary local cart for guests
      state.cartItems.push({
        id: Date.now().toString(),
        name: item.name,
        price: item.price,
        quantity: 1,
        timestamp: new Date().toISOString()
      });
      updateCartDisplay();
      showAuthMessage('Item added to cart. Sign in to save your order.', 'info');
      return;
    }

    try {
      await addDoc(collection(db, "users", state.currentUser.uid, "cart"), {
        name: item.name,
        price: item.price,
        quantity: 1,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      showAuthMessage('Failed to add item to cart', 'error');
    }
  }

  async function removeFromCart(itemId) {
    if (!state.currentUser) {
      // Remove from local cart for guests
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      updateCartDisplay();
      return;
    }

    try {
      await deleteDoc(doc(db, "users", state.currentUser.uid, "cart", itemId));
    } catch (error) {
      console.error("Error removing item:", error);
      showAuthMessage('Failed to remove item', 'error');
    }
  }

  function updateCartDisplay() {
    elements.cartItems.innerHTML = '';
    
    if (state.cartItems.length === 0) {
      elements.cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      elements.cartTotal.textContent = '£0.00';
      elements.itemCount.textContent = '0 items';
      elements.checkoutBtn.classList.add('hidden');
      elements.loyaltyNote.classList.add('hidden');
      return;
    }

    let total = 0;
    const fragment = document.createDocumentFragment();
    
    state.cartItems.forEach(item => {
      total += item.price * (item.quantity || 1);
      
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <div>
          <span class="item-name">${item.name}</span>
          <span class="item-quantity">×${item.quantity || 1}</span>
        </div>
        <div>
          <span class="item-price">£${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          <button class="remove-item" data-id="${item.id}">×</button>
        </div>
      `;
      fragment.appendChild(cartItemElement);
    });

    elements.cartItems.appendChild(fragment);
    elements.cartTotal.textContent = `£${total.toFixed(2)}`;
    elements.itemCount.textContent = `${state.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} items`;
    elements.checkoutBtn.classList.remove('hidden');
    
    if (state.currentUser) {
      const pointsEarned = Math.floor(total);
      elements.potentialPoints.textContent = pointsEarned;
      elements.loyaltyNote.classList.remove('hidden');
    } else {
      elements.loyaltyNote.classList.add('hidden');
    }
  }

  // Checkout Process
  async function proceedToCheckout() {
    if (!state.currentUser) {
      showAuthMessage('Please sign in to complete your order', 'info');
      elements.authSection.classList.remove('hidden');
      return;
    }

    if (state.cartItems.length === 0) return;

    try {
      // Create order document
      const orderRef = await addDoc(collection(db, "users", state.currentUser.uid, "orders"), {
        items: state.cartItems,
        total: calculateTotal(),
        status: "pending",
        timestamp: serverTimestamp()
      });
      
      // Update loyalty points
      const pointsEarned = Math.floor(calculateTotal());
      await updateDoc(doc(db, "users", state.currentUser.uid), {
        points: increment(pointsEarned)
      });
      
      // Clear cart
      if (state.currentUser) {
        const deletePromises = state.cartItems.map(item => 
          deleteDoc(doc(db, "users", state.currentUser.uid, "cart", item.id))
        );
        await Promise.all(deletePromises);
      }
      
      state.cartItems = [];
      updateCartDisplay();
      showOrderSuccess(pointsEarned);
    } catch (error) {
      console.error("Checkout error:", error);
      showAuthMessage('Checkout failed. Please try again.', 'error');
    }
  }

  function calculateTotal() {
    return state.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  // UI Updates
  function updateUI() {
    if (state.currentUser) {
      elements.authSection.classList.add('hidden');
      elements.userSection.classList.remove('hidden');
      elements.userName.textContent = state.currentUser.email.split('@')[0];
    } else {
      elements.authSection.classList.remove('hidden');
      elements.userSection.classList.add('hidden');
    }
    updateCartDisplay();
  }

  function showOrderSuccess(pointsEarned) {
    const successMessage = document.createElement('div');
    successMessage.className = 'order-success';
    successMessage.innerHTML = `
      <div class="success-content">
        <h3>Order Placed Successfully!</h3>
        <p>You've earned ${pointsEarned} loyalty points.</p>
      </div>
    `;
    
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
  }

  function showAuthMessage(message, type) {
    elements.authStatus.textContent = message;
    elements.authStatus.style.color = type === 'error' ? 'var(--error)' : 'var(--success)';
    setTimeout(() => elements.authStatus.textContent = '', 3000);
  }

  // Initialize the app
  init();
}