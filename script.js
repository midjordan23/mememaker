document.addEventListener('DOMContentLoaded', function () {
    const modeSelect = document.getElementById('mode-select');
    const bannerOptions = document.getElementById('banner-options');
    const avatarOptions = document.getElementById('avatar-options');

    modeSelect.addEventListener('change', function () {
        if (this.value === 'banner') {
            bannerOptions.style.display = 'block';
            avatarOptions.style.display = 'none';
        } else if (this.value === 'avatar') {
            bannerOptions.style.display = 'none';
            avatarOptions.style.display = 'block';
        }
    });

    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');

    const loadImage = (src, callback) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // This is important for CORS issues
        img.onload = () => callback(img);
        img.src = src;
    };

    const drawImageOnCanvas = (src) => {
        loadImage(src, (img) => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
    };

    document.getElementById('background-select').addEventListener('change', function () {
        drawImageOnCanvas(this.value);
    });

    document.getElementById('upload-background').addEventListener('change', function (event) {
        const reader = new FileReader();
        reader.onload = function (e) {
            drawImageOnCanvas(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    document.getElementById('generate-text').addEventListener('click', function () {
        const line1 = document.getElementById('line1-text').value;
        const line2 = document.getElementById('line2-text').value;
        const line3 = document.getElementById('line3-text').value;

        ctx.fillStyle = '#000';
        ctx.font = '40px Machiato Show';
        ctx.textAlign = 'center';

        if (line1) ctx.fillText(line1, canvas.width / 2, 100);
        if (line2) ctx.fillText(line2, canvas.width / 2, 200);
        if (line3) ctx.fillText(line3, canvas.width / 2, 300);
    });

    document.getElementById('reset').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('download').addEventListener('click', function () {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
