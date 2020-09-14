const restaurantName = document.querySelector('.restaurant-name');
const restaurantAddress = document.querySelector('.restaurant-address');

const customerName = document.querySelector('.customer-name');
const customerAddress = document.querySelector('.customer-address');
const customerPhone = document.querySelector('.customer-phone');

const itemList = document.querySelector('.item-list');

const fetchData = async () => {
  const res = await fetch('https://indapi.kumba.io/webdev/assignment');
  res.json().then(data => {
    // console.log(data);

    const restaurantDetails = data.restaurant;
    renderRestaurantDetails(restaurantDetails);

    const customerDetails = data.user;
    renderCustomerDetails(customerDetails);

    const items = data.items;
    renderItems(items);
  })
}

const renderRestaurantDetails = (restaurantDetails) => {
  // console.log(restaurantDetails);
  restaurantName.textContent = restaurantDetails.name;
  restaurantAddress.textContent = `${restaurantDetails.street}; ${restaurantDetails.city}, ${restaurantDetails.state}; ${restaurantDetails.zipcode}`;
}

const renderCustomerDetails = (customerDetails) => {
  // console.log(customerDetails);
  customerName.textContent = customerDetails.name;
  customerAddress.textContent = customerDetails.address;
  customerPhone.textContent = customerDetails.phone;
}

const renderItems = (items) => {
  // console.log(items);
  let html = '';
  let totalWithoutTax = 0;
  let tax = 0;
  let totalWithTax = 0;

  items.forEach(item => {
    // console.log(item);
    html += `
      <li class="item">
        <span class="item-name">${item.name}</span>
        <span class="multiplier">x ${item.quantity}</span>
        <span class="multiply">${item.price} x ${item.quantity}</span>
        <span class="multiplied-total">= ${item.price * item.quantity}</span>
      </li>
    `
    totalWithoutTax += item.price * item.quantity;
  })

  html += '<div class="line"></div>';

  html += `
    <div class="amount">
      <span>Amount</span>
      <span class="amount-without-tax">= ${totalWithoutTax}</span>
    </div>
  `

  tax = (totalWithoutTax * items[0].tax_pct) / 100;
  html += `
    <div class="tax">
      <span>Tax ( ${items[0].tax_pct} )</span>
      <span class="tax-amount">= ${tax}</span>
    </div>
  `

  html += '<div class="line"></div>';

  totalWithTax = totalWithoutTax + tax;
  html += `
    <div class="total">
      <span>Total Payable</span>
      <span class="amount-with-tax">= ${totalWithTax}</span>
    </div>
  `

  itemList.innerHTML = html;
}

fetchData();