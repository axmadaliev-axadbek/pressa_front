var title = document.getElementById('postTitle')
var postDate = document.getElementById('postDate')
var postTime = document.getElementById('postTime')
var postTitle2 = document.getElementById('postTitle2')
var postPlace = document.getElementById('postPlace')
var postLink = document.getElementById('postLink')
var postDate2 = document.getElementById('postDate2')
var postTime2 = document.getElementById('postTime2')
var postDesc = document.getElementById('postDesc')
var postImage = document.getElementById('postImage')
var speakerName = document.getElementById('speakerName')
var categoryNav = document.getElementById('categoryNav')

var eventsList = document.getElementById('eventsList')
var eventTemplate = document.getElementById('eventTemplate').content




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
    let postCategory = localStorage.getItem('postCategory')
    let postId = localStorage.getItem('postId')

    console.log(postCategory);
    posts = posts.filter(x => x.categories == postCategory)
    posts = posts.filter(x => x.posts_id != postId)
    console.log(posts);
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
     
            

        eventsList.append(template)
    });
}



async function renderSinglePost() {
    let postId= localStorage.getItem('postId')
    let res = await fetch( API + '/' + `posts` + '/' + postId)
    res = await res.json()
    let post = res.data[0]
    console.log(post.posttitle);
    title.textContent = post.posttitle
    postDesc.textContent = post.postdesc
    postDate.textContent = post.date_at 
    postTime.textContent = post.time 
    postTitle2.textContent = post.posttitle
    postPlace.textContent = post.place
    postLink.textContent = 'https://www.youtube.com/c/najottalim'
    postDate2.textContent = post.date_at
    postTime2.textContent = post.time
    speakerName.textContent = post.speaker
    categoryNav.textContent = post.categories
    postImage.setAttribute('src', API + '/' + post.images )
        if(post.images.includes('picsum')) {
            postImage.setAttribute('src',  post.images )
        }  

}
renderSinglePost()

async function firstRender(){
    posts = await getData('posts')
    users = await getData('users')
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
