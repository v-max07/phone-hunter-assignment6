function searchBtn(isSlice){
    const inputText = document.getElementById('inputBox');
    const searchText = inputText.value;
    const sliceIs = isSlice;
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
            .then(data => displayItems(data.data, sliceIs))
        
    }
    
};

const displayItems = (items, isSlice) => {
    // console.log(items.length);
    //chacking the upto 20 items 
    if (items.length > 21 && isSlice) {
        document.getElementById('showMoreBtn').style.display = 'block';
    } else {
        document.getElementById('showMoreBtn').style.display = 'none';
    }

    //chacking the input value has enough items for showing in UI.
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
        
        let allItems;
        if (isSlice == true) {
            allItems = items.slice(0, 20);
        } else {
            allItems = items;
        }
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
 
};





// for see more items botton

const getMoreItems = () => {
    searchBtn(false);
}
