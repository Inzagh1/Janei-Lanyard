import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAVsbYPNtLVJRyin2lVtPixIK5HDUhi_M8",
    authDomain: "janeidb-c4f19.firebaseapp.com",
    databaseURL: "https://janeidb-c4f19-default-rtdb.firebaseio.com",
    projectId: "janeidb-c4f19",
    storageBucket: "janeidb-c4f19.appspot.com",
    messagingSenderId: "1014883779092",
    appId: "1:1014883779092:web:6fc333d075a454e96f1d01",
    measurementId: "G-SG7JCHH82N"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//call the tables in db hihi
const texturesRef = ref(db, 'textures/');
const patternsRef = ref(db, 'patterns/');
const logosRef = ref(db, 'logos/');

// Variables to store selected texture, pattern, and logo
let selectedTexture = null;
let selectedPattern = null;
let selectedLogo = null;

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
                textureBox.addEventListener('click', function() {
                    console.log('Selected texture:', texture);
                    selectedTexture = texture;
                    var textureUrl = `data:image/png;base64,${texture.ImgUrl}`;
                    var leftParallelogram = document.querySelector('.parallelogram-left');
                    leftParallelogram.style.backgroundImage = `url('${textureUrl}')`;
                    leftParallelogram.style.backgroundRepeat = 'no-repeat';
                    leftParallelogram.style.backgroundPosition = 'center';
                    leftParallelogram.style.backgroundSize = 'cover';

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
            patternsBox.addEventListener('click', createPatternClickListener(patterns));
            container.appendChild(patternsBox);
        }
    }
}

// Function to create a click event listener for a pattern
function createPatternClickListener(pattern) {
    return function() {
        console.log('Selected pattern:', pattern);
        selectedPattern = pattern; // Store the selected pattern
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

// Function to display logos
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
                <div ></div>
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border   text-center text-sm bg-white bg-opacity-70  rounded">${logos.Name}</div>
            `;
            // Add click event listener to each logo box
            (function(logos) {
                logosBox.addEventListener('click', function() {
                    console.log('Selected logo:', logos);
                    selectedLogo = logos; // Store the selected logo
                    var logoUrl = `data:image/png;base64,${logos.ImgUrl}`;
                    var logoId = `${logos.id}`
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

// Event listener for the "ORDER NOW" button
document.getElementById("orderNowButton").addEventListener('click', function() {
    console.log('Order Now clicked');
    console.log('Selected Texture:', selectedTexture);
    console.log('Selected Pattern:', selectedPattern);
    console.log('Selected Logo:', selectedLogo);
    // Further code to handle the order can be added here

    if (selectedTexture) {
        const textureUrl = `data:image/png;base64,${selectedTexture.ImgUrl}`;
        console.log(`${selectedTexture.id}`);
        
        const displayImage = document.getElementById("texture1");
        displayImage.style.backgroundImage = `url('${textureUrl}')`;
        displayImage.style.backgroundRepeat = 'no-repeat';
        displayImage.style.backgroundPosition = 'center';
        displayImage.style.backgroundSize = 'cover';
    
        const displayImage2 = document.getElementById("texture2");
        displayImage2.style.backgroundImage = `url('${textureUrl}')`;
        displayImage2.style.backgroundRepeat = 'no-repeat';
        displayImage2.style.backgroundPosition = 'center';
        displayImage2.style.backgroundSize = 'cover';
    
        const displayImage3 = document.getElementById("texture3");
        displayImage3.style.backgroundImage = `url('${textureUrl}')`;
        displayImage3.style.backgroundRepeat = 'no-repeat';
        displayImage3.style.backgroundPosition = 'center';
        displayImage3.style.backgroundSize = 'cover';
    } else {
        console.log('No texture selected');
    }
    
    if (selectedPattern) {
        var patternUrl = `data:image/png;base64,${selectedPattern.ImgUrl}`;
        console.log(`${selectedPattern.id}`);
        // Set background style for the left parallelogram
        var patterngraph =  document.getElementById('pat1');
        patterngraph.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph.style.backgroundRepeat = 'no-repeat';
        patterngraph.style.backgroundPosition = 'center';
        patterngraph.style.backgroundSize = 'cover';

        // Set background style for the right parallelogram
        var patterngraph2 = document.getElementById('pat2');
        patterngraph2.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph2.style.backgroundRepeat = 'no-repeat';
        patterngraph2.style.backgroundPosition = 'center';
        patterngraph2.style.backgroundSize = 'cover';

        var patterngraph3 = document.getElementById('pat3');
        patterngraph3.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph3.style.backgroundRepeat = 'no-repeat';
        patterngraph3.style.backgroundPosition = 'center';
        patterngraph3.style.backgroundSize = 'cover';

        // Set background style for the right parallelogram
        var patterngraph4 = document.getElementById('pat4');
        patterngraph4.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph4.style.backgroundRepeat = 'no-repeat';
        patterngraph4.style.backgroundPosition = 'center';
        patterngraph4.style.backgroundSize = 'cover';
    } else {
        console.log('No logo selected');
    }

    if (selectedLogo) {
        const logoUrl = `data:image/png;base64,${selectedLogo.ImgUrl}`;
        console.log(`${selectedLogo.id}`);
     
        const displayImage = document.getElementById("displayImage2");
        const imageDiv = document.getElementById('displayImage');
        displayImage.style.backgroundImage = `url('${logoUrl}')`;
        displayImage.style.backgroundRepeat = 'no-repeat';
        displayImage.style.backgroundPosition = 'center';
        displayImage.style.backgroundSize = 'cover';


        imageDiv.innerHTML = '';
        } else {
            console.log('No logo selected');
        }
});




// Add input field
let inputCount2 = 0;
var totalPrice = 0;
var totalpay = 0;
var imageStrings2 = [];
const inputs = [];

// Default input clicked cancel laman
document.getElementById('inputContainer2').addEventListener('click', function(event) {
    if (event.target.classList.contains('border-red-500')) {
        var fileInput2 = event.target.parentNode.querySelector('input[type=file]');
        fileInput2.value = '';
    }
});

// Only 5 images are accepted
document.getElementById('addInput2').addEventListener('click', function() {
    if (inputCount2 < 5) { 
        var inputContainer = document.getElementById('inputContainer2');

        var inputField = document.createElement('div');
        inputField.className = 'flex items-center';

        var newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.className = 'w-full bg-slate-300 shadow-sm shadow-slate-900 md:p-2 p-1 rounded-md';
        inputField.appendChild(newInput);

        var newInput2 = document.createElement('select');
        newInput2.className = 'md:w-56 w-40 md:text-md text-sm bg-slate-800 text-white shadow-sm shadow-slate-900 md:p-2 p-1 rounded-md';
        const op1 = document.createElement('option');
        op1.innerText = 'Texture';
        op1.value = 'Texture';
        newInput2.appendChild(op1);
        const op2 = document.createElement('option');
        op2.innerText = 'Pattern';
        op2.value = 'Pattern';
        newInput2.appendChild(op2);
        const op3 = document.createElement('option');
        op3.innerText = 'Logo';
        op3.value = 'Logo';
        newInput2.appendChild(op3);
        // newInput2.className = 'w-full bg-slate-300 shadow-sm shadow-slate-900 md:p-2 p-1 rounded-md';
        inputField.appendChild(newInput2);

        // Add event listener to handle file selection
        newInput.addEventListener('change', function(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                var imageData = event.target.result;
                imageStrings2.push({
                    data: imageData,
                    type: newInput2.value
                });     
            };
            reader.readAsDataURL(file);
        });

        // Cancel the inputted field
        var cancelButton2 = document.createElement('button');
        cancelButton2.className = 'ml-2 md:px-2 md:py-2 p-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white';
        cancelButton2.textContent = 'Cancel';
        cancelButton2.addEventListener('click', function(event) {
            var inputField = this.parentNode;
            inputField.parentNode.removeChild(inputField);
            inputCount2--;
        });
        inputField.appendChild(cancelButton2);

        inputContainer.appendChild(inputField);
        inputCount2++;
     
    } else {
        const errorContainer55 = document.getElementById('errorContainer55');
        errorContainer55.style.display = 'block';
        setTimeout(() => {
            errorContainer55.style.display = 'none';
        }, 3000);
    }
});

async function sendImagesToDatabase(orderId) {
    const assetsRef = ref(db, 'newOrders/' + orderId + '/cusAssets');

    // Map each image string to a promise of setting it in the database
    const promises = imageStrings2.map(async (imageObj, index) => {
        let { data: imageData, type } = imageObj;
        const base64Index = imageData.indexOf(',');

        if (base64Index !== -1) {
            imageData = imageData.slice(base64Index + 1);
        }
        const assetIndex = index + 1;
        const newAssetRef = child(assetsRef, assetIndex.toString());
        await set(newAssetRef, { img: imageData, type: type });
    });
    await Promise.all(promises);
    imageStrings2 = [];
    clearInputContainer2();
}
function clearInputContainer2() {
    var inputContainer2 = document.getElementById('inputContainer2');
    while (inputContainer2.firstChild) {
        inputContainer2.removeChild(inputContainer2.firstChild);
    }

    inputCount2 = 0;

    // Iterate over each input field inside the inputContainer
    var inputFields = document.querySelectorAll('#inputContainer input[type="file"]');
    inputFields.forEach(function(inputField) {
        // Get the value of the file input
        var imageDataToRemove = inputField.value;
        // Check if the value is present in the imageStrings array
        var indexToRemove = imageStrings2.indexOf(imageDataToRemove);
        // If found, remove it from the array
        if (indexToRemove !== -1) {
            imageStrings2.splice(indexToRemove, 1);
        }
    });

    // Reset inputCount to 0
  
}

document.getElementById("cancelOrderBtn2").addEventListener("click", function() {
    document.getElementById("fixedprice2").value = 40;
    document.getElementById("count2").value = 1;
    document.getElementById("incrementBtn2").value = "";
    document.getElementById("decrementBtn2").value = "";
    document.getElementById("notes2").value = "";
    document.getElementById("paymentScreenshot2").value = "";
    console.log("SUCCESS cancel");
    document.getElementById("orderModal").style.display = 'none';
    clearInputContainer2();
    multiply2();
    
   
});

document.getElementById("orderButtonSubmit2").addEventListener("click", async function() {
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
        const notes2 = document.getElementById("notes2").value;
        const paymentScreenshot2 = document.getElementById("paymentScreenshot2").files[0] || '';
        if (!notes2) {
            console.error('Notes field is empty');
            const errorContainer66 = document.getElementById('errorContainer66');
            errorContainer66.style.display = 'block';
            setTimeout(() => {
            errorContainer66.style.display = 'none';
        }, 3000);
            return;
        }

        if (paymentScreenshot2 == '') {
            console.error('No file selected');
            const errorContainer77 = document.getElementById('errorContainer77');
            errorContainer77.style.display = 'block';
            setTimeout(() => {
            errorContainer77.style.display = 'none';
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
                let stexture = (`${selectedTexture.id}`);
                let spat = (`${selectedPattern.id}`);
                let slogo = (`${selectedLogo.id}`);
                let totalPay4 = parseInt(document.querySelector('.totalpay4').textContent);
                let totalPay24 = parseInt(document.querySelector('.totalpay24').textContent);
                let totalCount = parseInt(document.getElementById("count2").value);
               
                set(ref(db, 'newOrders/' + newOrderId), {
                    notes: notes2,
                    Fk_cusID: userId,
                    id: newOrderId.toString(),
                    price: totalPay24,
                    price_ammount: totalPay4,
                    textureId: stexture,
                    patternId: spat,
                    logoId: slogo,
                    status: "CONFIRMING",
                    quantity: totalCount,
                    date: formattedDateTime,
                    name: "CUSTOMIZE" + " " + newOrderId,
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
                    Content: "Order Placed." + " " + "Customized.",
                    TimeSent: formattedTime,    
                 
                });

                console.log("SUCCESS");
                sendImagesToDatabase(newOrderId);
               //clear fields after 
                imageStrings2 = [];
                totalPay4 = "",
                totalPay24 = "",
                stexture = "",
                spat = "",
                slogo = ""
                document.getElementById("count2").value = "";
                document.getElementById("notes2").value = "";
                document.getElementById("paymentScreenshot2").value = "";
                clearInputContainer2();
                const closeOrderModal = document.getElementById("orderModal");
                closeOrderModal.style.display = 'none';
                const orderSuccessElement = document.getElementById("OrderSuccess");
                orderSuccessElement.classList.remove("hidden");

                // Countdown
                let count = 3;
                const countdownElement = document.getElementById("countdown");
                countdownElement.classList.remove("hidden");
                const countdown = setInterval(() => {
                    countdownElement.textContent = count;
                    count--;
                    if (count < 0) {
                        clearInterval(countdown);
                        orderSuccessElement.classList.add("hidden");
                        window.location.href = "/janeiwebsite/src/profile.html";
                    }
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        // Read file as binary string
        paymentScreenshotReader.readAsArrayBuffer(paymentScreenshot2);


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
