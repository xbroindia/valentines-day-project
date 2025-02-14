const form = document.getElementById("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(form);
    let senderName = data.get("sender_name");
    let receiverName = data.get("reciver_name");
    let personImg = data.get("person_img");

    // Define the userdata object
    const userdata = {
        Sender: senderName,
        Receiver: receiverName,
        Imgurl: false, // Default to false if no image is provided
    };

    if (personImg) {
        console.log("Image found, resizing...");

        // Resize the image before storing it
        resizeImage(personImg).then((resizedImage) => {
            userdata.Imgurl = resizedImage; // Set the resized image as Imgurl
            console.log("Resized image size:", resizedImage.length); // Log the resized image size
            localStorage.setItem('userdata', JSON.stringify(userdata));
            // Ensure the page is loaded after saving userdata
            location.href = "secondPage.html";
        }).catch((error) => {
            console.log("Image resizing failed:", error);
            // Proceed even if image resizing fails
            localStorage.setItem('userdata', JSON.stringify(userdata));
            location.href = "secondPage.html";
            
        });
        console.log(userdata)
    } else {
        // If no image, directly store the userdata and navigate
        console.log("No image provided, storing userdata without image.");
        localStorage.setItem('userdata', JSON.stringify(userdata));
        console.log(userdata)
        location.href = "secondPage.html";
    }
}

// Resize image function to reduce size before storing in localStorage
function resizeImage(file, maxWidth = 300, maxHeight = 300) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function(event) {
            img.src = event.target.result;
        };

        reader.onloadend = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Wait for the image to load
            img.onload = function() {
                let width = img.width;
                let height = img.height;

                // Resize the image to fit within the maxWidth and maxHeight
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Resolve with the resized image as base64
                resolve(canvas.toDataURL(file.type));
            };

            // Reject if image fails to load
            img.onerror = () => reject('Error loading image');
        };

        reader.readAsDataURL(file);
    });
}
