const deleteBtn = document.querySelectorAll('.del');
const editBtn = document.querySelectorAll('.edit');

/**
 * @description Delete a post from the database
 */
async function deletePost(){
    const postId = this.parentNode.parentNode.dataset.id;

    try {
        await fetch('posts/deletePost', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postIdFromJSFile: postId,
            })
        });

        location.reload();      

    }catch(error){
        console.log(error);
    };
};

/**
 * @description Creates the HTML Elements for the Edit Post Form
 * @param {string} id The id of the post that is going to be edited
 * @param {string} title The current post's title value
 * @param {string} caption The current post's caption value
 */
function createEditPostForm(id, title, caption){
    console.log(id, title, caption);
    // Card Body
    const formContainer = document.createElement('div');
    formContainer.classList.add('card-body');

    // Form
    const form = document.createElement('form');
    form.classList.add('form');
    form.action = `/profile/posts/updatePost/${id}`
    form.method = 'POST';
    form.enctype = 'multipart/form-data';

    // Title Group
    const titleGroup = document.createElement('div');
    titleGroup.classList.add('form-group');
    
    // Title Label
    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.innerHTML = 'Title:';

    // Title Input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.value = title;

    // Add Title label/input to the title group element
    titleGroup.append(titleLabel, titleInput);

    // Caption Group
    const captionGroup = document.createElement('div');
    captionGroup.classList.add('form-group');

    // Caption Label
    const captionLabel = document.createElement('label');
    captionLabel.htmlFor = 'caption';
    captionLabel.innerHTML = 'Caption:';

    // Caption Input
    const captionInput = document.createElement('textarea');
    captionInput.id = 'caption';
    captionInput.name = 'caption';
    captionInput.value = caption;

    // Add Caption label/input to the caption group element
    captionGroup.append(captionLabel, captionInput);

    // Image Group
    const imgGroup = document.createElement('div');
    imgGroup.classList.add('form-group');
    
    // Image Label
    const imgLabel = document.createElement('label');
    imgLabel.htmlFor = 'image';
    imgLabel.innerHTML = 'Image:';

    // Image Input
    const imgInput = document.createElement('input');
    imgInput.type = 'file';
    imgInput.id = 'image';
    imgInput.name = 'image';

    // Add image label and input to the image group
    imgGroup.append(imgLabel, imgInput);

    // Form Controls
    const formControls = document.createElement('div');
    formControls.classList.add('form-controls');

    // Cancel Button
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.classList.add('btn', 'btn-danger');
    cancelBtn.innerHTML = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        location.reload();
    });

    // Submit Button
    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.classList.add('btn', 'btn-info');
    submitBtn.value = 'Submit';

    // Add cancel button and submit button to form controls
    formControls.append(cancelBtn, submitBtn);

    // Add title group and caption group to the form
    form.append(titleGroup, captionGroup, imgGroup, formControls);

    // Add the form to the form container
    formContainer.appendChild(form);

    return formContainer;
    
};

/**
 * @description Clears the post item contents and renders a form to allow editing of the post information
 */
function showEditPostForm(){
    // Grab the main container for the specific post
    const card = this.parentNode.parentNode;

    // Grab the card body
    const cardBody = card.children[1];

    // Grab the input values in the cardBody
    const title = cardBody.querySelector('.card-title').textContent.trim();
    const caption = cardBody.querySelector('.card-text').textContent.trim();

    // Clear the content from the main container
    clearElement(card);

    // Create the edit post form
    const formContainer = createEditPostForm(card.dataset.id, title, caption);

    card.appendChild(formContainer)
};

/**
 * @description Remove all children from an element
 * @param {HTMLElement} element The element that is to be cleared
 */
function clearElement(element){
    while(element.children.length > 0){
        element.removeChild(element.firstChild);
    };
};

Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deletePost);
});

Array.from(editBtn).forEach(btn => {
    btn.addEventListener('click', showEditPostForm);
});