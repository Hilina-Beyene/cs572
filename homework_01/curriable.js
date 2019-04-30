window.onload = function () {
    const item = {
        name: "Avocado",
        type: "Fruit",
        category: "Food",
        price: 200
    };

    function calculatePrice(item) {
            return function(discount) {
                let subtract = discount/100;
                subtract *= item.price;
                item.price -= subtract;
                return item;
            }
    }

    let applyCoupon = calculatePrice;
    let curriable = document.getElementById('curriable');
    let price = applyCoupon(item)(10).price;
    let ans = (price === 180);
    let str = "Correct Price: " + price + " and it is: " + ans;
    curriable.textContent = str;
}