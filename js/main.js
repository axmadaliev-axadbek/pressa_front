var eventsList = document.getElementById('eventsList')
var eventTemplate = document.getElementById('eventTemplate').content

var dateInput = document.querySelector(".dateInput")
var categorySel = document.getElementById("categorySelect")
var typeSel = document.getElementById("typeSel")
var nameSelect = document.getElementById("nameSelect")
var filterBtn = document.getElementById("filterBtn")

var moreBtn = document.getElementById('moreBtn')
var searchInput = document.getElementById('searchInput')
var searchImg = document.getElementById('searchImg')


const API = 'https://pressaback.herokuapp.com'
async function getData(name) {
    try {
        // let res = await fetch(`${API}/${name}`)
        let res = await fetch( API + '/' + `${name}`)
        res = await res.json()
        return res
    } catch (error) {
        console.log(error.message);
    }
}



function  renderPosts(posts) {
    // posts = posts.slice(0, 6)
    console.log((posts));
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
        let template = eventTemplate.cloneNode(true)
        let img = template.getElementById('eventImg')
        let eventTitle = template.getElementById('eventTitle')
        let evSpeker = template.getElementById('evSpeker')
        let evDate = template.getElementById('evDate')
        let evType = template.getElementById('evType')
        let evJob = template.getElementById('evJob')
        let evTime = template.getElementById('evTime')
        let evViews = template.getElementById('evViews')
        let typeImg = template.getElementById('typeImg')

        let divCard = template.getElementById('events__card')
        divCard.dataset.postid = post.posts_id
        divCard.dataset.postcategory = post.categories

        eventTitle.textContent = post.postTitle
        evSpeker.textContent = post.speaker
        eventTitle.textContent = post.posttitle
        evDate.textContent = post.date_at
        evType.textContent = post.type
        evJob.textContent = post.job
        evTime.textContent = post.time
        evViews.textContent = post.view
        if(post.type == 'online') {
            typeImg.setAttribute('src', '../Img/online.png')
        } else  typeImg.setAttribute('src', '../Img/offline.png')
        img.setAttribute('src', API + '/' + post.images )
        if(post.images.includes('picsum')) {
            img.setAttribute('src',  post.images )
        }

        divCard.onclick = (event) =>  {
            localStorage.removeItem('postId')
            localStorage.removeItem('postCategory')
            localStorage.setItem('postId', divCard.dataset.postid)
            localStorage.setItem('postCategory', divCard.dataset.postcategory)
             window.location.replace('singlePage.html')
        }



        eventsList.append(template)
    });
}

function rednerSelect (posts) {
    posts = posts.data
    console.log(posts);
    // nameSelect.innerHTML = null
    if(!posts.length){
        eventsList.textContent = 'event\'s not found'
        return
    }
    posts.forEach(post => {
        var opt = document.createElement('option')
        opt.value = post.speaker
        opt.innerHTML = post.speaker
        nameSelect.append(opt)
        // nameSelect.appendChild(opt)
    })
}


async function firstRender(){
    posts = await getData('posts')
    users = await getData('users')
    rednerSelect(posts)
    renderPosts(posts)
}
firstRender()


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


// var dateInput = document.querySelector(".dateInput")
// var typeSel = document.getElementById("typeSel")
// var nameSelect = document.getElementById("nameSelect")
// var filterBtn = document.getElementById("filterBtn")


filterBtn.addEventListener('click', async (e) => {
    let posts = await getData('posts')
        posts = posts.data
        let arr = []
        console.log(typeSel.value);
        posts.forEach(x => {
            // console.log(x.subcategory == categorySel.value);
            if(x.subcategory == categorySel.value || x.type == typeSel.value || x.speaker == nameSelect.value) {
                console.log('ok');
                arr.push(x)
            } 
        })
        console.log(arr);
        renderPosts(arr)
})





// console.log(dateInput.value);
//         const getFormattedDate = (date) => {
//             let year = date.getFullYear();
//             let month = (1 + date.getMonth()).toString().padStart(2, "0");
//             let day = date.getDate().toString().padStart(2, "0");
//             return month + "/" + day + "/" + year;
//           };
//           console.log(getFormattedDate(dateInput.value));