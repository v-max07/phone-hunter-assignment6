function searchBtn(){
    const inputText = document.getElementById('inputBox');
    const searchText = inputText.value;
    if (searchText == '') {
        const itemsDiv = document.getElementById('itemsDiv');

        itemsDiv.innerHTML = `
            <div class="text-center my-2 border-bottom border-black p-4 ">
                <h4 class="text-danger">Sorry! Search Item not found...</h4>
            </div>
        `;
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    
        fetch(url)
            .then(res => res.json())
            .then(data => displayItems(data.data))
        
    }
    
};

const displayItems = (items) => {
    // console.log(items.length);
    if (items.length === 0) {
        const itemsDiv = document.getElementById('itemsDiv');

        itemsDiv.innerHTML = `
            <div class="text-center my-2 border-bottom border-black p-4 ">
                <h4 class="text-danger">Sorry! Search Item not found...</h4>
            </div>
        `;
    } else {
        const itemsDiv = document.getElementById('itemsDiv');
        itemsDiv.textContent = '';
        const allItems = items.slice(0, 19)
        allItems.forEach(item => {
        // console.log(item);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col-md-4');

        newDiv.innerHTML = `
                <div class="card text-center my-2 border-bottom border-danger p-4 divHeight">
                    <div class="phone-picture">
                        <img class="w-25" src="${item.image}" alt="">
                    </div>
                    <h4>Model-Name:${item.phone_name} </h4>
                    <p>Brand:${item.brand} </p>
                </div>
            `;
            itemsDiv.appendChild(newDiv);
        });
    }

    
}