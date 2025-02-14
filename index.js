const userdata = JSON.parse(localStorage.getItem('userdata'))
const heart = document.querySelector('.person1')
const image = document.createElement('img')
const sender_name = document.querySelector("#letter-label1-para")
const reciver_name = document.querySelector("#letter-label2-para")

if(userdata){
    console.log(userdata)
}
else{
    console.log("not found  ")
}

const copyLinkBtn = document.getElementById("copyLinkBtn");

copyLinkBtn.addEventListener("click", function() {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
        alert("Link copied to clipboard!");
    }).catch((error) => {
        alert("Failed to copy the link.");
    });
});



sender_name.innerHTML=userdata.Sender
reciver_name.innerHTML=userdata.Receiver, 
image.src=userdata.Imgurl

heart.append(image)

console.log(userdata)