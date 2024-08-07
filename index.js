var cropper;
const fileInput = document.querySelector('#fileInput');

const inputHtml = `
    <div>
        <img id="cropperjs" class="display-img">
    </div>
`;

$('#fileInput').on('change', function() {
    Swal.fire({
        html: inputHtml,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'SALVAR',
        willOpen: () => {
            const cropperImage = Swal.getPopup().querySelector('#cropperjs');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    cropperImage.src = e.target.result;
                    cropperImage.style.display = 'block';
                    cropperImage.onload = () => {
                        cropper = new Cropper(cropperImage, {
                            aspectRatio: 4 / 3 ,
                            viewMode: 1,
                            autoCropArea: 0.6,
                        });
                    };
                };
                reader.readAsDataURL(file);
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            cropper.getCroppedCanvas({fillColor: '#fff'}).toBlob(blob => {
                cropper.clear();
                var pngFile = URL.createObjectURL(blob);
                URL.revokeObjectURL(pngFile);
                // console.dir(pngFile);
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    // console.log(reader.result);
                    $('#result').attr("src", reader.result);
                };
                reader.readAsDataURL(blob);
            })
        }
    });
});