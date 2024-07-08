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
    
    let bannerBaseImage = new Image();
    let avatarBaseImage = new Image();
    let natBaseImage = new Image();
    natBaseImage.src = 'BaseNatofficial.png'; // Base image that does not change
    
    let bannerBaseSrc = 'Blue Illustration Anime Girl Twitter Header.png'; // Default banner image
    let avatarBaseSrc = 'avifirstoption.png'; // Default avatar image

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
        drawMeme();
    });

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'meme.png';
        link.click();
    });

    function drawMeme() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const selectedMode = modeSelect.value;

        if (selectedMode === 'avatar') {
            drawAvatar();
        } else {
            drawBanner();
        }
    }

    function drawAvatar() {
        // Draw background (either selected or uploaded)
        ctx.drawImage(avatarBaseImage, 0, 0, canvas.width, canvas.height);

        // Draw base image
        ctx.drawImage(natBaseImage, 0, 0, canvas.width, canvas.height);

        // Draw eyes
        const eyes = eyesSelect.value;
        if (eyes !== 'none') {
            const eyesImage = new Image();
            eyesImage.src = eyes;
            eyesImage.onload = () => {
                ctx.drawImage(eyesImage, 0, 0, canvas.width, canvas.height);
                drawHat(); // Move hat drawing here to ensure it's on top
            };
        } else {
            drawHat();
        }
    }

    function drawHat() {
        const hat = hatSelect.value;
        if (hat !== 'none') {
            const hatImage = new Image();
            hatImage.src = hat;
            hatImage.onload = () => {
                ctx.drawImage(hatImage, 0, 0, canvas.width, canvas.height);
            };
        }
    }

    function drawBanner() {
        ctx.drawImage(bannerBaseImage, 0, 0, canvas.width, canvas.height); 

        // Draw the base for banner image on top
        const baseBannerImage = new Image();
        baseBannerImage.src = 'Base for banner.png';
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

    bannerBaseImage.onload = drawMeme;
    avatarBaseImage.onload = drawMeme;
});