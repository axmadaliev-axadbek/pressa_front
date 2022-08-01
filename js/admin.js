var cardTemplate = document.getElementById('cardTemplate').content
var eventsList = document.getElementById('eventsList')
// var confirmBtn = document.querySelector(".cards__main__btn__submit")
var confirmBtn = document.querySelector(".cards__main__btn__submit")
var cancelBtn = document.querySelector(".cards__main__btn__delay")

var searchInput = document.getElementById('searchInput')
var searchImg = document.getElementById('searchImg')

var pendigsPostsBtn = document.getElementById('pendigsPostsBtn')
var confirmedPostsBtn = document.getElementById('confirmedPostsBtn')
var canceledsPostsBtn = document.getElementById('canceledsPostsBtn')
var quitBtn = document.getElementById('quitBtn')
var deletedBtn = document.getElementById('deletedBtn')

var adminName = document.getElementById('adminName') 
var adminId = document.getElementById('adminId') 

let token = localStorage.getItem('token')
if(!token) window.location.replace('login.html')

const API = 'https://pressaback.herokuapp.com' 
async function getData(name) {
    try {
        let res = await fetch(`${API}/${name}`)
        res = await res.json()
        return res
    } catch (error) {
        console.log(error.message);
    }
}
async function renderUser() {
    try {
        let userId = localStorage.getItem('token')
        userId = 1
        let res = await fetch(`${API}/users/${userId}`)
        res = await res.json()
        let user = res.data[0]
        adminName.textContent = user.username
        adminId.textContent = user.users_id
        console.log(user);
        return res
    } catch (error) {
        console.log(error.message);
    }
}

renderUser()

function  renderPosts(posts) {
    if(!posts)  {
        eventsList.textContent = 'event\'s not found'

    }
    if(!posts.length) {
        posts = posts.data  
        eventsList.textContent = 'event\'s not found'
    }  
    if(!posts.length){
        eventsList.textContent = 'event\'s not found'
        posts = posts.data
        return
    }

    eventsList.innerHTML = null
    posts.forEach(post => {
        let template = cardTemplate.cloneNode(true)
        let eventTitle = template.getElementById('eventTitle')
        let eventBtnOk = template.getElementById('eventBtnOk')
        let eventBtnDelay = template.getElementById('eventBtnDelay')
        let eventUser = template.getElementById('eventUser')
        let eventTel = template.getElementById('eventTel')
        let eventDate = template.getElementById('eventDate')
        let eventTime = template.getElementById('eventTime')
        let eventSoxa = template.getElementById('eventSoxa')

        eventTitle.textContent = post.posttitle
        eventUser.textContent = post.speaker
        eventTel.textContent = post.phone
        eventDate.textContent = post.date_at
        eventTime.textContent = post.time
        eventSoxa.textContent = post.categories
        eventBtnDelay.dataset.id = post.posts_id
        eventBtnOk.dataset.id = post.posts_id

        eventBtnOk.onclick = async (event) =>  {
            let newEvent = {
                method: 'PUT',
                body: eventBtnOk.dataset.id
            }
            try {
                let res = await fetch(`${API}/posts/${eventBtnOk.dataset.id}`, newEvent)
                res = await res.json()
                console.log(res);
                if (res.status == 200) {
                   console.log('hello');
                   window.location.replace('admin.html')
        
                } else {
                    alert(res.message)
                }
        
            } catch (error) {
                console.log(error.message);
            }
        }

        eventBtnDelay.onclick = async (event) =>  {
            let newEvent = {
                method: 'PUT',
                body: eventBtnDelay.dataset.id
            }
            try {
                let res = await fetch(`${API}/cancel/${eventBtnDelay.dataset.id}`, newEvent)
                res = await res.json()
                if (res.status == 200) {
                   console.log('hello');
                   window.location.replace('admin.html')
        
                } else {
                    alert(res.message)
                }
        
            } catch (error) {
                console.log(error.message);
            }
        }
        eventsList.append(template)
    });
}

async function firstRender(){
    posts = await getData('pendingPosts')
    users = await getData('users')
    renderPosts(posts)
}


searchImg.addEventListener('click', async (e) => {
    console.log('ok');
    let posts = await getData('posts')
    posts = posts.data
    let arr = []
    posts.forEach(x => {
        console.log(x);
        if(x.posttitle.toLowerCase().includes(searchInput.value.trim().toLowerCase())) arr.push(x)
        
    })
    console.log(arr);
    renderPosts(arr)
})

searchInput.addEventListener('keyup',  async (e) => {
if(e.code === 'Enter') {
    console.log('ok');
    let posts = await getData('posts')
    posts = posts.data
    let arr = []
    posts.forEach(x => {
        console.log(x);
        if(x.posttitle.toLowerCase().includes(searchInput.value.trim().toLowerCase())) arr.push(x)
        
    })
    console.log(arr);
    renderPosts(arr)
}
})

firstRender()



confirmedPostsBtn.addEventListener('click', async (e) => {
    let posts = await getData('posts')
        posts = posts.data        
        renderPosts(posts)
})

pendigsPostsBtn.addEventListener('click', async (e) => {
    let posts = await getData('pendingPosts')
    posts = posts.data        

        renderPosts(posts)
})

canceledsPostsBtn.addEventListener('click', async (e) => {
    let posts = await getData('canceledPosts')
        posts = posts.data        
        renderPosts(posts)
})
deletedBtn.addEventListener('click', async (e) => {
    let posts = await getData('canceledPosts')
        posts = posts.data        
        renderPosts(posts)
})

quitBtn.addEventListener('click', async (e) => {
    localStorage.removeItem('token')    
})