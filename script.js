document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');
    const modeSelect = document.getElementById('mode-select');
    const backgroundSelect = document.getElementById('background-select');
    const backgroundSelectAvatar = document.getElementById('background-select-avatar');
    const uploadBackground = document.getElementById('upload-background');
    const uploadBackgroundAvatar = document.getElementById('upload-background-avatar');
    const line1Input = document.getElementById('line1-text');
    const line2Input = document.getElementById('line2-text');
    const line3Input = document.getElementById('line3-text');
    const hatSelect = document.getElementById('hat-select');
    const eyesSelect = document.getElementById('eyes-select');
    const generateTextButton = document.getElementById('generate-text');
    const resetButton = document.getElementById('reset');
    const downloadButton = document.getElementById('download');
    const drawButton = document.getElementById('draw');
    const undoButton = document.getElementById('undo');
    const colorSelect = document.getElementById('color-select');
    const colorButton = document.getElementById('color-button');

    let drawing = false;
    let drawColor = 'black';
    let drawHistory = [];

    let bannerBaseImage = new Image();
    let avatarBaseImage = new Image();
    let natBaseImage = new Image();
    let hatImage = new Image();
    let eyesImage = new Image();

    natBaseImage.src = 'https://raw.githubusercontent.com/midjordan23/mememaker/main/base/BaseNatofficial.png'; // Base image that does not change
    
    let bannerBaseSrc = 'https://raw.githubusercontent.com/midjordan23/mememaker/main/backgrounds/avistonks.png'; // Default banner image
    let avatarBaseSrc = 'https://raw.githubusercontent.com/midjordan23/mememaker/main/backgrounds/avibasedrake.png'; // Default avatar image

    bannerBaseImage.src = bannerBaseSrc;
    avatarBaseImage.src = avatarBaseSrc;

    modeSelect.addEventListener('change', () => {
        const selectedMode = modeSelect.value;
        if (selectedMode === 'avatar') {
            document.getElementById('banner-options').style.display = 'none';
            document.getElementById('avatar-options').style.display = 'block';
            canvas.width = 500;
            canvas.height = 500;
        } else {
            document.getElementById('banner-options').style.display = 'block';
            document.getElementById('avatar-options').style.display = 'none';
            canvas.width = 1500;
            canvas.height = 500;
        }
        drawMeme();
    });

    backgroundSelectAvatar.addEventListener('change', () => {
        avatarBaseSrc = backgroundSelectAvatar.value;
        avatarBaseImage.src = avatarBaseSrc;
        avatarBaseImage.onload = drawMeme;
    });

    backgroundSelect.addEventListener('change', () => {
        bannerBaseSrc = backgroundSelect.value;
        bannerBaseImage.src = bannerBaseSrc;
        bannerBaseImage.onload = drawMeme;
    });

    uploadBackground.addEventListener('change', (event) => handleFileUpload(event, 'banner'));
    uploadBackgroundAvatar.addEventListener('change', (event) => handleFileUpload(event, 'avatar'));

    function handleFileUpload(event, mode) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (mode === 'banner') {
                    bannerBaseImage.src = e.target.result;
                    bannerBaseImage.onload = drawMeme;
                } else {
                    avatarBaseImage.src = e.target.result;
                    avatarBaseImage.onload = drawMeme;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    generateTextButton.addEventListener('click', drawMeme);

    resetButton.addEventListener('click', () => {
        line1Input.value = '';
        line2Input.value = '';
        line3Input.value = '';
        hatSelect.value = 'none';
        eyesSelect.value = 'none';
        hatImage.src = '';
        eyesImage.src = '';
        drawHistory = [];
        drawMeme();
    });

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'meme.png';
        link.click();
    });

    drawButton.addEventListener('click', () => {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', draw);
        undoButton.style.display = 'inline-block';
        colorButton.style.display = 'inline-block';
    });

    colorButton.addEventListener('click', () => {
        colorSelect.click();
    });

    colorSelect.addEventListener('input', (e) => {
        drawColor = e.target.value;
        colorButton.style.backgroundColor = drawColor;
    });

    undoButton.addEventListener('click', () => {
        if (drawHistory.length > 0) {
            drawHistory.pop();
            drawMeme();
            restoreDrawing();
        }
    });

    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
        // Save the current state of the canvas to the history
        drawHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function draw(e) {
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = drawColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function restoreDrawing() {
        for (let i = 0; i < drawHistory.length; i++) {
            ctx.putImageData(drawHistory[i], 0, 0);
        }
    }

    function drawMeme() {
        console.log("Drawing meme");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const selectedMode = modeSelect.value;

        if (selectedMode === 'avatar') {
            drawAvatar();
        } else {
            drawBanner();
        }
        restoreDrawing();
    }

    function drawAvatar() {
        console.log("Drawing avatar");
        // Draw background (either selected or uploaded)
        ctx.drawImage(avatarBaseImage, 0, 0, canvas.width, canvas.height);

        // Draw base image
        ctx.drawImage(natBaseImage, 0, 0, canvas.width, canvas.height);

        // Draw hat
        if (hatImage.src && hatImage.src !== window.location.href) {
            console.log("Drawing hat");
            ctx.drawImage(hatImage, 0, 0, canvas.width, canvas.height);
        }

        // Draw eyes
        if (eyesImage.src && eyesImage.src !== window.location.href) {
            console.log("Drawing eyes");
            ctx.drawImage(eyesImage, 0, 0, canvas.width, canvas.height);
        }
    }

    function drawBanner() {
        console.log("Drawing banner");
        ctx.drawImage(bannerBaseImage, 0, 0, canvas.width, canvas.height); 

        // Draw the base for banner image on top
        const baseBannerImage = new Image();
        baseBannerImage.src = 'https://raw.githubusercontent.com/midjordan23/mememaker/main/base/Base%20for%20banner.png';
        baseBannerImage.onload = () => {
            ctx.drawImage(baseBannerImage, 0, 0, canvas.width, canvas.height);
            drawBannerText();
        };
    }

    function drawBannerText() {
        const line1Text = line1Input.value;
        const line2Text = line2Input.value;
        const line3Text = line3Input.value;

        ctx.font = '35px "Machiato Show"';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        const textX = 330;
        if (line1Text) ctx.fillText(line1Text, textX, 110);
        if (line2Text) ctx.fillText(line2Text, textX, 150);
        if (line3Text) ctx.fillText(line3Text, textX, 190);
    }

    // Event listeners for hat and eyes selection
    hatSelect.addEventListener('change', () => {
        const hat = hatSelect.value;
        if (hat === 'none') {
            hatImage.src = '';
        } else {
            hatImage.src = hat;
            hatImage.onload = drawMeme;
        }
        console.log("Hat selected:", hatImage.src);
        drawMeme();
    });

    eyesSelect.addEventListener('change', () => {
        const eyes = eyesSelect.value;
        if (eyes === 'none') {
            eyesImage.src = '';
        } else {
            eyesImage.src = eyes;
            eyesImage.onload = drawMeme;
        }
        console.log("Eyes selected:", eyesImage.src);
        drawMeme();
    });

    bannerBaseLet's update the JavaScript to ensure the base image, hats, and eyewear are correctly loaded. We'll ensure the paths are accurate and only update the image references. Here’s the final code:
