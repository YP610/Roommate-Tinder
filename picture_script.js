const profileImage = document.getElementById("profileImage");
const imagePreview = document.getElementById("imagePreview");
const imagePreviewImage = imagePreview.querySelector(".image-preview__image");
const imagePreviewDefaultText = imagePreview.querySelector(".image-preview__default-text");

profileImage.addEventListener("change", function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        imagePreviewDefaultText.style.display = "none";
        imagePreviewImage.style.display = "block";

        reader.addEventListener("load", function() {
            imagePreviewImage.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
    } else {
        imagePreviewDefaultText.style.display = null;
        imagePreviewImage.style.display = null;
        imagePreviewImage.setAttribute("src", "");
    }
});