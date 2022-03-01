function searchBtn(isSlice){
    const inputText = document.getElementById('inputBox');
    let searchText = inputText.value;

    const sliceIs = isSlice;

    if (searchText == '' && sliceIs === true) {
        const itemsDiv = document.getElementById('itemsDiv');

        itemsDiv.innerHTML = `
            <div class="text-center my-2 border-bottom border-black p-4 ">
                <h4 class="text-danger">Please a phone name in search bar...</h4>
            </div>
        `;
        document.getElementById('showMoreBtn').style.display = 'none';
    } else {

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayItems(data.data, sliceIs))
          
    }

    // inputText.value = '';
    
};


const displayItems = (items, isSlice) => {
    // console.log(items.length);
    //chacking the upto 20 items 
    if (items.length>20 && isSlice) {
        document.getElementById('showMoreBtn').style.display = 'block';
    } else {
        document.getElementById('showMoreBtn').style.display = 'none';
        document.getElementById('inputBox').value = '';
    }

    //chacking the input value has enough items for showing in UI.
    if (items.length === 0 && isSlice) {
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
                    <h5 class="mt-3">Model-Name:${item.phone_name} </h5>
                    <p class="mt-3">Brand:${item.brand} </p>
                    <button onclick="showItemDetails('${item.slug}')" class="btn bg-danger text-white py-2 textBtn ">Details</button>
                </div>
            `;
            itemsDiv.appendChild(newDiv);
        });
    }
 
};


//details button
const showItemDetails = (modelId) => {
    // console.log(modelId);
    document.getElementById('inputBox').value = '';

    const url = `https://openapi.programming-hero.com/api/phone/${modelId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayItemDetails(data.data))
}

const displayItemDetails = (details) => {
    // console.log(details);
    //get the items div
    const itemsDiv = document.getElementById('itemsDiv');
    
    //clear old data
    itemsDiv.textContent = '';

    //Collects sensors name
    const [a, b, c, d, e, f] = details.mainFeatures.sensors;
    console.log(a, b, c, d, e, f);

    const newDiv = document.createElement('div');
    newDiv.classList.add('col');
    newDiv.innerHTML = `
        <div class="card mb-3 mx-auto" style="max-width: 880px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${details.image}" class="img-fluid rounded-start p-3" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">Name: ${details.name}</h4>
                            <p class=""><span class="fw-bold">Brand:</span> ${details.brand}</p>
                            <p class=""><span class="fw-bold">Storage:</span> ${details.mainFeatures.storage}</p>
                            <p class=""><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}</p>
                            <p class=""><span class="fw-bold">Display Size:</span> ${details.mainFeatures.displaySize}</p>
                            <p class=""><span class="fw-bold">Chip Set:</span> ${details.mainFeatures.chipSet}</p>
                            <p class=""><small class="text-muted">
                            Release Date: ${details.releaseDate}
                            </small></p>
                            <p id="moreDetailsBtn" onclick="showMoreDetails()" class=""><small class="text-danger border border-1 p-2 border-secondary rounded-2 border-top-0 border-start-0">
                            See More details....
                            </small></p>

                            <div id="othersInfo">
                                <hr>
                                <p class=""><span class="fw-bold">Bluetooth: </span> ${details.others.Bluetooth}</p>
                                <p class=""><span class="fw-bold">GPS: </span> ${details.others.GPS}</p>
                                <p class=""><span class="fw-bold">NFC: </span> ${details.others.NFC}</p>
                                <p class=""><span class="fw-bold">Radio: </span> ${details.others.Radio}</p>
                                <p class=""><span class="fw-bold">USB: </span> ${details.others.USB}</p>
                                <p class=""><span class="fw-bold">WLAN: </span> ${details.others.WLAN}</p>
                                <p id="sensorId" class="">
                                    <span class="fw-bold">Sensors: </span> ${a+", "+b+", "+c+", "+d+", "+e+", "+f}                
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    itemsDiv.appendChild(newDiv);
    document.getElementById('showMoreBtn').style.display = 'none';
}



const showMoreDetails = () => {
    console.log('clicked');
}


// show more details button
const getMoreItems = () => {
    searchBtn(false);
    document.getElementById('inputBox').value = '';
}
