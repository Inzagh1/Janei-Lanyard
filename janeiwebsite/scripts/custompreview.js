import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7ZxE8vJo0r5QWKqJ9jfFWpySnHaRWsiQ",
  authDomain: "janeilanyarddb.firebaseapp.com",
  databaseURL: "https://janeilanyarddb-9ba85-default-rtdb.firebaseio.com/",
  projectId: "janeilanyarddb",
  storageBucket: "janeilanyarddb.appspot.com",
  messagingSenderId: "548579996655",
  appId: "1:548579996655:web:de6b2dd2a4ee0a75627c1a",
  measurementId: "G-JYFDCP813Q"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//call the tables in db hihi
const texturesRef = ref(db, 'textures/');
const patternsRef = ref(db, 'patterns/');
const logosRef = ref(db, 'logos/');
const templatesRef = ref(db, 'templates/');

// Function to display data in the divs 
function displayTextures(data) {
    var container = document.getElementById("textureContainer");
    if (!container) return; 
    container.innerHTML = ""; 

    for (var keytexture in data) {
        if (data.hasOwnProperty(keytexture)) {
            var texture = data[keytexture];
            var textureBox = document.createElement('div');
            textureBox.classList.add('texture-box', 'relative', 'overflow-hidden', 'rounded', 'bg-gray-100', 'shadow-md');
      
            textureBox.innerHTML = `
                <img src="data:image/png;base64,${texture.ImgUrl}" alt="${texture.Name}" class="w-full h-full object-cover"> 
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border  text-center text-sm bg-white bg-opacity-70  rounded">${texture.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(texture) {
                // Add click event listener to each texture box
                textureBox.addEventListener('click', function() {
                    console.log('Selected texture:', texture);
                    var textureUrl = `data:image/png;base64,${texture.ImgUrl}`;
                    // Set background style for the left parallelogram
                    var leftParallelogram = document.querySelector('.parallelogram-left');
                    leftParallelogram.style.backgroundImage = `url('${textureUrl}')`;
                    leftParallelogram.style.backgroundRepeat = 'no-repeat';
                    leftParallelogram.style.backgroundPosition = 'center';
                    leftParallelogram.style.backgroundSize = 'cover';
                    // Set background style for the right parallelogram
                    var rightParallelogram = document.querySelector('.parallelogram-right');
                    rightParallelogram.style.backgroundImage = `url('${textureUrl}')`;
                    rightParallelogram.style.backgroundRepeat = 'no-repeat';
                    rightParallelogram.style.backgroundPosition = 'center';
                    rightParallelogram.style.backgroundSize = 'cover';

                    var trapeziod = document.querySelector('.trapezoid');
                    trapeziod.style.backgroundImage = `url('${textureUrl}')`;
                    trapeziod.style.backgroundRepeat = 'no-repeat';
                    trapeziod.style.backgroundPosition = 'center';
                    trapeziod.style.backgroundSize = 'fit';
                });
            })(texture);
            
            container.appendChild(textureBox);
        }
    }
}
function displayPatterns(data2) {
    var container = document.getElementById("patternContainer");
    if (!container) return; 
    container.innerHTML = ""; 

    for (var keypatterns in data2) {
        if (data2.hasOwnProperty(keypatterns)) {
            var patterns = data2[keypatterns];
            var patternsBox = document.createElement('div');
            patternsBox.classList.add('pattern-box', 'relative', 'overflow-hidden', 'rounded', 'bg-gray-100', 'shadow-md');
      
            patternsBox.innerHTML = `
                <img src="data:image/png;base64,${patterns.ImgUrl}" alt="${patterns.Name}" class="w-full h-full object-cover"> 
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border text-center text-sm bg-white bg-opacity-70  rounded">${patterns.Name}</div>
            `;
            
            // Add click event listener to each pattern box
            patternsBox.addEventListener('click', createPatternClickListener(patterns));

            container.appendChild(patternsBox);
        }
    }
}
// Function to create a click event listener for a pattern
function createPatternClickListener(pattern) {
    return function() {
        console.log('Selected pattern:', pattern);
        var patternUrl = `data:image/png;base64,${pattern.ImgUrl}`;
        
        // Set background style for the left parallelogram
        var patterngraph = document.querySelector('.rightbox');
        patterngraph.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph.style.backgroundRepeat = 'no-repeat';
        patterngraph.style.backgroundPosition = 'center';
        patterngraph.style.backgroundSize = 'cover';

        // Set background style for the right parallelogram
        var patterngraph2 = document.querySelector('.leftbox');
        patterngraph2.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph2.style.backgroundRepeat = 'no-repeat';
        patterngraph2.style.backgroundPosition = 'center';
        patterngraph2.style.backgroundSize = 'cover';

        var patterngraph3 = document.querySelector('.rightbox2');
        patterngraph3.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph3.style.backgroundRepeat = 'no-repeat';
        patterngraph3.style.backgroundPosition = 'center';
        patterngraph3.style.backgroundSize = 'cover';

        // Set background style for the right parallelogram
        var patterngraph4 = document.querySelector('.leftbox2');
        patterngraph4.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph4.style.backgroundRepeat = 'no-repeat';
        patterngraph4.style.backgroundPosition = 'center';
        patterngraph4.style.backgroundSize = 'cover';
    };
}
//templates
function displayLogos(data3) {
    var container = document.getElementById("logoContainer");
    if (!container) return; 
    container.innerHTML = ""; 

    for (var keylogos in data3) {
        if (data3.hasOwnProperty(keylogos)) {
            var logos = data3[keylogos];
            var logosBox = document.createElement('div');
            logosBox.classList.add('logo-box', 'relative', 'overflow-hidden', 'rounded', 'bg-gray-100', 'shadow-md');
      
            logosBox.innerHTML = `
                <img src="data:image/png;base64,${logos.ImgUrl}" alt="${logos.Name}" class="w-full h-full object-cover"> 
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border   text-center text-sm bg-white bg-opacity-70  rounded">${logos.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(logos) {
                // Add click event listener to each texture box
                logosBox.addEventListener('click', function() {
                    console.log('Selected logo:', logos);
                    var logoUrl = `data:image/png;base64,${logos.ImgUrl}`;

                    var logoIMG = document.querySelector('.logohere');
                    logoIMG.style.backgroundImage = `url('${logoUrl}')`;
                    logoIMG.style.backgroundRepeat = 'no-repeat';
                    logoIMG.style.backgroundPosition = 'center';
                    logoIMG.style.backgroundSize = 'cover';
                });
            })(logos);
            
            container.appendChild(logosBox);
        }
    }
}
// Listen for changes to the 'textures' node
onValue(texturesRef, (snapshot) => {
    const data = snapshot.val();
    displayTextures(data);
});
onValue(patternsRef, (snapshot2) => {
    const data2 = snapshot2.val();
    displayPatterns(data2);
});
onValue(logosRef, (snapshot3) => {
    const data3 = snapshot3.val();
    displayLogos(data3);
});

function logTemplatesData() {
    onValue(templatesRef, (snapshot) => {
        const data = snapshot.val();
        
    });
}
logTemplatesData();
// Function to fetch template data based on templateId
function populateTemplates() {
   const container = document.getElementById('templateContainer');
    container.innerHTML = '<div class="loader text-xl p-10 ">Loading...</div>';
    onValue(templatesRef, (snapshot) => {
        const templatesData = snapshot.val(); 
        const container = document.getElementById('templateContainer');
        container.innerHTML = '';
      

        // Loop through each template in the data
        for (const templateId in templatesData) {
            if (Object.hasOwnProperty.call(templatesData, templateId)) {
              
                const id = parseInt(templateId);
                //if (id !== 0) {
                    if (id == 4) {
                    const template = templatesData[templateId];
                // Create the template HTML structure
                const templateHtml = `
                    <div class="box bg-[#1f1f1fe6] p-2 md:w-56  h-auto w-40 md:mb-4 mb-2" style="position: relative;">
                        <div onclick="toggleHover(this)" class="box1 md:w-52 md:h-64 mx-auto h-44 w-36 z-50 duration-500 cursor-pointer">
                            <img src="data:image/png;base64,${template.preview}" class="pic w-full h-full object-cover" alt="${template.name}" >
                        </div>
                        <div class="flex md:pt-2 pt-1 z-0">
                            <a class="relative cart-image-container" data-template-id="${templateId}">
                                <img src="/janeiwebsite/assets/business-3d-red-shopping-cart.png" class="md:h-16 h-14 cursor-pointer cart-image hover:" alt="Order Now">
                                <span class="w-28 order-message absolute top-0 left-1/2 hidden">Order Now</span>
                            </a>
                            <div class="productname text-center text-[10px] md:text-[14px] font-medium bg-slate-200 duration-300 border w-36 h-auto">
                                ${template.name}<br>
                                <span class="text-yellow-600"> PHP ${template.price} </span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Append the template HTML to the container
                container.insertAdjacentHTML('beforeend', templateHtml);
                }
                
            }
        }

        // Add event listeners to cart images
        const cartImageContainers = document.querySelectorAll('.cart-image-container');
        cartImageContainers.forEach(container => {
            container.addEventListener('click', function() {
                const templateId = this.getAttribute('data-template-id');
                showModal(templateId);
            });
        });
    });
}

populateTemplates();

// Function to fetch template data based on templateId
function getTemplateData(templateId) {
    const templateRef = ref(db, `templates/${templateId}`);
    return get(templateRef).then((snapshot) => {
        if (snapshot.exists()) {
            const templateData = snapshot.val();
            console.log("Fetched template data:", templateData);
            return templateData;
        } else {
            console.log("Template data doesn't exist for templateId:", templateId);
            return null;
        }
    }).catch((error) => {
        console.error("Error fetching template data:", error);
        return null;
    });
}



// Add input field
var inputCount = 0;
var totalPrice = 0;
var totalpay = 0;
var selectedTemplateName = null; // Define selectedTemplateName

// Define an array to store the base64 strings of the images
var imageStrings = [];

// Default input clicked cancel laman
document.getElementById('inputContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('border-red-500')) {
        var fileInput = event.target.parentNode.querySelector('input[type=file]');
        fileInput.value = '';
    }
});

// Only 5 images are accepted
document.getElementById('addInput').addEventListener('click', function() {
    if (inputCount < 4) { // Limit to 4 to have total of 5 images including the initial one
        var inputContainer = document.getElementById('inputContainer');

        var inputField = document.createElement('div');
        inputField.className = 'flex items-center';

        var newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.className = 'w-full bg-slate-300 shadow-sm shadow-slate-900 md:p-2 p-1 rounded-md';
        inputField.appendChild(newInput);

        // Add event listener to handle file selection
        newInput.addEventListener('change', function(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                var imageData = event.target.result;
                imageStrings.push(imageData); // Store the base64 string of the image
            };
            reader.readAsDataURL(file); // Read file as data URL
        });

        // Cancel the inputted field
        var cancelButton = document.createElement('button');
        cancelButton.className = 'ml-2 md:px-2 md:py-2 p-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function(event) {
            var inputField = this.parentNode;
            inputField.parentNode.removeChild(inputField);
            inputCount--;
    
        });
        inputField.appendChild(cancelButton);

        inputContainer.appendChild(inputField);
        inputCount++;
     
    } else {
        const errorContainer5 = document.getElementById('errorContainer5');
        errorContainer5.style.display = 'block';
        setTimeout(() => {
            errorContainer5.style.display = 'none';
        }, 3000);
    }
});
// Function to send image strings to the database
async function sendImagesToDatabase(orderId) {
    const assetsRef = ref(db, 'newOrders/' + orderId + '/cusAssets');
    const assetsSnapshot = await get(assetsRef); // Get a snapshot of current assets
    const numAssets = assetsSnapshot.exists() ? Object.keys(assetsSnapshot.val()).length : 0;
    const assetIndex = numAssets + 1; // Increment the counter for the next asset
    const newAssetRef = child(assetsRef, assetIndex.toString()); // Create a reference to the new asset
    await set(newAssetRef, imageStrings); // Set the image data under the incremented counter
    imageStrings = []; // Clear the array after sending images to the database
}



// Counter
document.addEventListener("DOMContentLoaded", function() {
    const countElement = document.getElementById("count");
    const incrementBtn = document.getElementById("incrementBtn");
    const decrementBtn = document.getElementById("decrementBtn");
    let count = 1;

    function updateCount() {
        countElement.value = count;
        updateTotalPrice();
    }
    updateCount();

    function updateCount2() {
        countElement.value = count;
        updateTotalPrice2();
    }
    updateCount2();

    incrementBtn.addEventListener("click", function() {
        count++;
        updateCount();
    });

    decrementBtn.addEventListener("click", function() {
        count--;
        updateCount2();
    });
});

// Update total price function
//Incremenet
function updateTotalPrice() {
    const templatePriceText = document.querySelector('.totalpay').textContent;
    const templatePriceText2 = document.querySelector('.totalpay2').textContent;
    const templatePrice = parseFloat(templatePriceText);
    const templatePrice2 = parseFloat(templatePriceText2);
    let totalCount = parseInt(document.getElementById("count").value);

    totalPrice = templatePrice  + templatePrice2;
    document.querySelector(".totalpay").textContent = totalPrice.toFixed(2);
}
//Decrement
function updateTotalPrice2() {
    const templatePriceText = document.querySelector('.totalpay').textContent;
    const templatePriceText2 = document.querySelector('.totalpay2').textContent;
    const templatePrice = parseFloat(templatePriceText);
    const templatePrice2 = parseFloat(templatePriceText2);
    let totalCount = parseInt(document.getElementById("count").value);

    totalPrice = templatePrice - templatePrice2;
    document.querySelector(".totalpay").textContent = totalPrice.toFixed(2);
}
// Modal order
const orderButton = document.getElementById('orderButton');
const modal = document.getElementById('myModal');

orderButton.addEventListener('click', function() {
    modal.classList.remove('hidden');
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});

// Function to show the modal
function showModal(templateId) {
    getTemplateData(templateId)
        .then(templateData => {
            selectedTemplateName = templateData.name; 
            displayModal(templateData);
        })
        .catch(error => {
            console.error("Error fetching template data:", error);
        });
}

// Call modal
function displayModal(templateData) {
    const modal = document.getElementById('myModalorder');
    modal.style.display = 'block';
    const templateNameElement2 = modal.querySelector('.templatename2');
    const templatetotal = modal.querySelector('.totalpay');
    const templatetotal2 = modal.querySelector('.totalpay2');
    const templateImgDiv = modal.querySelector('.templatesImg');
    const selectedTemplateIdElement = modal.querySelector('.seletedTemplateId');
  

    if (templateNameElement2 && templateImgDiv ) {
     
        selectedTemplateIdElement.textContent = templateData.id;
        templatetotal.textContent = templateData.price;
        templatetotal2.textContent = templateData.price;
        templateNameElement2.textContent = templateData.name;
        const imgElement = document.createElement('img');
        imgElement.src = `data:image/png;base64,${templateData.preview}`;
        imgElement.classList.add('w-full', 'h-full', 'object-cover', 'mx-auto', 'rounded-xl');
        templateImgDiv.innerHTML = '';
        templateImgDiv.appendChild(imgElement);
    } else {
        console.error("Modal elements not found.");
    }
}

document.getElementById("orderButtonSubmit").addEventListener("click", async function() {
    try {
        const userId = localStorage.getItem('currentid');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }
        
        const userSnapshot = await get(ref(db, `customers/${userId}`));
        if (!userSnapshot.exists()) {
            console.error('User data not found for user ID:', userId);
            return;
        }

      
        
        const userData = userSnapshot.val();
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const notes = document.getElementById("notes").value;
        const paymentScreenshot = document.getElementById("paymentScreenshot").files[0];
        if (!notes) {
            console.error('Notes field is empty');
            const errorContainer6 = document.getElementById('errorContainer6');
            errorContainer6.style.display = 'block';
            setTimeout(() => {
            errorContainer6.style.display = 'none';
        }, 3000);
            return;
        }

        if (!paymentScreenshot) {
            console.error('No file selected');
            const errorContainer7 = document.getElementById('errorContainer7');
            errorContainer7.style.display = 'block';
            setTimeout(() => {
            errorContainer7.style.display = 'none';
        }, 3000);
            return;
        }
        const paymentScreenshotReader = new FileReader();

        paymentScreenshotReader.onload = async function(event) {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const binaryString = uint8Array.reduce((data, byte) => {
                return data + String.fromCharCode(byte);
            }, '');

            const byteStringImg = btoa(binaryString); 
            
            try {
                const lastOrderId = await getLastOrderId();
                const lastMessageId = await getLastMessageId();
                const lastOrderChats = await getLastChatId();
                const newOrderId = lastOrderId + 1;
                const newMessageId = lastMessageId + 1;
                const newchats = lastOrderChats + 1;
                const currentTime = new Date();
                const formattedDateTime = currentTime.toLocaleDateString();
                const currentDate = new Date();
                const formattedTime = currentDate.toLocaleString();
                const selectedTemplateId = document.querySelector('.seletedTemplateId').textContent;
                const totalPay = parseInt(document.querySelector('.totalpay2').textContent);
                const totalCount = parseInt(document.getElementById("count").value);

                set(ref(db, 'newOrders/' + newOrderId), {
                    notes: notes,
                    Fk_cusID: userId,
                    id: newOrderId,
                    price: totalPay,
                    templateId: selectedTemplateId,
                    status: "CONFIRMING",
                    quantity: totalCount,
                    name: selectedTemplateName,
                    date: formattedDateTime,
                    paymentScreenshot: byteStringImg
                });
                set(ref(db, 'orderChats/' + newchats), {
                    id: newchats,
                    OrderNo: newOrderId.toString(),
                    customerName: firstName + " " + lastName,
                    isRead: "false",  
                    
                });
                set(ref(db,  "orderChats/" + newOrderId + "/Messages/" + newMessageId ), {
                    id: newMessageId,
                    Sender: "Customer", 
                    SenderName: firstName + " " + lastName,
                    Content: "Order Placed." + " " + selectedTemplateName,
                    TimeSent: formattedTime,    
                 
                });
                document.getElementById("notes").value = "";
                document.getElementById("paymentScreenshot").value = "";
                console.log("SUCCESS");
                sendImagesToDatabase(newOrderId);
            
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Read file as binary string
        paymentScreenshotReader.readAsArrayBuffer(paymentScreenshot);


    } catch (error) {
        console.error('Error in orderButton click event listener:', error);
    }
});




async function getLastOrderId() {
    try {
        const response = await get(ref(db, 'newOrders'));
        if (!response.exists()) {
            return 0; 
        }
        const orderData = response.val();
        const orderIds = Object.keys(orderData);
        if (orderIds.length === 0) {
            return 0; 
        }
        const lastorderId = Math.max(...orderIds.map(id => parseInt(id)));
        return lastorderId;
    } catch (error) {
        console.error('Error fetching last order ID:', error);
        throw error;
    }
}

async function getLastMessageId(orderId) {
    try {
        const response = await get(ref(db, `orderChats/${orderId}/Messages/`));
        if (!response.exists()) {
            return 0; 
        }
        const messageData = response.val();
        const messageIds = Object.keys(messageData);
        if (messageIds.length === 0) {
            return 0; 
        }
        const lastMessageId = Math.max(...messageIds.map(id => parseInt(id)));
        return lastMessageId;
    } catch (error) {
        console.error('Error fetching last message ID:', error);
        throw error;
    }   
}

async function getLastChatId() {
    try {
        const response = await get(ref(db, 'orderChats'));
        if (!response.exists()) {
            return 0; 
        }
        const chatData = response.val();
        const chatIds = Object.keys(chatData);
        if (chatIds.length === 0) {
            return 0; 
        }
        const lastChatId = Math.max(...chatIds.map(id => parseInt(id)));
        return lastChatId;
    } catch (error) {
        console.error('Error fetching last chat ID:', error);
        throw error;
    }   
}
