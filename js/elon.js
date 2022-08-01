const newEvent = document.getElementById("newEvent")
var xabar = document.getElementById('xabar')
var backBtn = document.querySelector(".message__back")
var okBtn = document.getElementById("message__ok")

var typeSelect = document.getElementById("typeSelect")
var  subcategorySelect = document.getElementById("subcategorySelect")
var categorySelect = document.getElementById("categorySelect")
var dateInput = document.querySelector(".dateInput")
var timeInput = document.querySelector(".timeInput")
var linkInput = document.getElementById("linkInput")
var placeInput = document.getElementById("placeInput")
var titleInput = document.getElementById("titleInput")
var descInput = document.getElementById("descInput")
var imgInput = document.getElementById("imgInput")
var jisInput = document.getElementById("jisInput")
var yurInput = document.getElementById("yurInput")
var nameInput = document.getElementById("nameInput")
var jobInput = document.getElementById("jobInput")
var tel1Input  = document.getElementById("tel1Input")
var tel2Input  = document.getElementById("tel2Input")
var sendBtn  = document.getElementById("sendBtn")


const API = 'https://pressaback.herokuapp.com'


sendBtn.addEventListener('click', async (event) => {
    
    console.log(imgInput.files[0]);
    event.preventDefault()
    let fd = new FormData()
    let shaxs;
    if(jisInput.checked == true) {
         shaxs = jisInput.value
    } else if(yurInput.checked == true) {
         shaxs = yurInput.value
    }
    
    // let shaxs = jisInput.checked == true ? jisInput.value : yurInput.value

    fd.append('postImage', imgInput.files[0])
    fd.append('speaker', nameInput.value)
    fd.append('job', jobInput.value)
    fd.append('phone', tel1Input.value)
    fd.append('phone2', tel2Input.value)
    fd.append('categories', categorySelect.value)
    fd.append('subCategory', subcategorySelect.value)
    fd.append('type', typeSelect.value)
    fd.append('place', placeInput.value)
    fd.append('postTitle', titleInput.value)
    fd.append('postDesc', descInput.value)
    fd.append('date_at', dateInput.value)
    fd.append('time', timeInput.value)
    fd.append('shaxs', shaxs)

    
    let newPost = {
        method: 'POST',
        body: fd
    }
    try {
        let res = await fetch(`${API}/posts`, newPost)
        res = await res.json()
        console.log(res);
        if (res.status == 201) {
            newEvent.style.opacity = 0.2
            newEvent.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
            xabar.style.display = 'flex'

        } else {
            alert(res.message)
        }

    } catch (error) {
        console.log(error.message);
    }

})



backBtn.addEventListener('click', function(){
	newEvent.style.opacity = 1
	xabar.style.display = "none"
    newEvent.style.backgroundColor = 'white'  
});
okBtn.onclick = (event) =>  {
    newEvent.style.opacity = 1
	xabar.style.display = "none"
    newEvent.style.backgroundColor = 'white'  
}


