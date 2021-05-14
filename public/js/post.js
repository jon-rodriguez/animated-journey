class PostHandler {
    constructor(){
        this.deleteBtn = document.querySelector('.del');
        this.likeBtn = document.querySelector('.like');
    };

    async deletePost(){
        const postId = this.parentNode.parentNode.parentNode.dataset.id;

        try {
            await fetch(`/posts/deletePost/${postId}`, {
                method: 'DELETE',
            });

            console.log('Successfully deleted post');
        }catch(error){
            console.log(error);
        }
    };

    async likePost(){
        const postId = this.parentNode.parentNode.parentNode.dataset.id;

        try {
            await fetch(`/post/like`, {
                method: 'PUT',
                body: JSON.stringify({
                    postId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Successfully liked post');
            location.reload();
        }catch(error){
            console.log(error);
        };
    };

    init(){
        this.deleteBtn.addEventListener('click', this.deletePost);
        this.likeBtn.addEventListener('click', this.likeBtn);
    };
};



const postHandler = new PostHandler();

postHandler.init();