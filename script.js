document.getElementById("orderBtn").addEventListener("click", function (event) {
    event.preventDefault();  
    
    const name = document.getElementById("customerName").value;
    const base = document.getElementById("base");
    const baseValue = base.options[base.selectedIndex].value;
    const basePrice = parseFloat(base.options[base.selectedIndex].dataset.price);

    const size = document.getElementById("size");
    const sizeValue = size.options[size.selectedIndex].value;
    const sizePrice = parseFloat(size.options[size.selectedIndex].dataset.price);

    
    const fruits = [...document.querySelectorAll("input[type='checkbox']:checked")];
    const fruitDetails = fruits.map(fruit => ({
        name: fruit.value,
        price: parseFloat(fruit.dataset.price),
    }));

    
    const fruitTotal = fruitDetails.reduce((total, fruit) => total + fruit.price, 0);
    const subtotal = basePrice + sizePrice + fruitTotal;

    
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    
    const summary = `
        <strong>Name:</strong> ${name}<br>
        <strong>Base:</strong> ${baseValue} ($${basePrice.toFixed(2)})<br>
        <strong>Size:</strong> ${sizeValue} ($${sizePrice.toFixed(2)})<br>
        <strong>Fruits:</strong> ${fruitDetails.map(fruit => `${fruit.name} ($${fruit.price.toFixed(2)})`).join(", ")}<br>
        <strong>Subtotal:</strong> $${subtotal.toFixed(2)}<br>
        <strong>Tax (13%):</strong> $${tax.toFixed(2)}<br>
        <strong>Total:</strong> $${total.toFixed(2)}
    `;

    
    if (!baseValue || !sizeValue) {
        alert("Please choose both a base and a size for your smoothie.");
        return;  
    }

    
    document.getElementById("smoothieForm").classList.add("hidden");
    document.getElementById("blendingProcess").classList.remove("hidden");

    
    let countdown = 2;
    const countdownInterval = setInterval(() => {
        countdown--;
        document.getElementById("countdown").textContent = `${countdown} seconds left...`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);

            
            document.getElementById("blendingProcess").classList.add("hidden");
            document.getElementById("orderSummary").classList.remove("hidden");
            document.getElementById("summaryDetails").innerHTML = summary;

            
            document.getElementById("thankYouMessage").classList.remove("hidden");  // Show "Thank you" message
        }
    }, 1000);
});
