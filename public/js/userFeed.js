const like = document.querySelectorAll('.like')

Array.from(like).forEach(el => {
    el.addEventListener('click', likePost)
})

async function likePost() {
    const postId = this.parentNode.parentNode.dataset.id;

    try {
        const res = await fetch('/userFeed/like', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'postIdFromJSFile': postId,
            })
        })
        location.reload()
        const data = await res.json()
        console.log(data)

    }
    catch (err) {
        console.log(err)
    }
}