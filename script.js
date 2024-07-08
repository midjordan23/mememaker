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

    bannerBaseImage.crossOrigin = "Anonymous";
    avatarBaseImage.crossOrigin = "Anonymous";
    natBaseImage.crossOrigin = "Anonymous";

    natBaseImage.src = 'https://raw.githubusercontent.com/midjordan23/mememaker/midjordan23-images/base/BaseNatofficial.png';
    
    let bannerBaseSrc = 'https://raw.githubusercontent.com/midjordan23/mememaker/midjordan23-images/backgrounds/Blue%20Illustration%20Anime%20Girl%20Twitter%20Header.png';
    let avatarBaseSrc = 'https://raw.githubusercontent.com/midjordan23/mememaker/midjordan23-images/backgrounds/AVIBASEfirstoption.png';

    bannerBaseImage.src = bannerBaseSrc;
    avatarBaseImage.src = avatarBaseSrc;

    bannerBaseImage.onload = () => {
        console.log("Banner base image loaded");
        drawMeme();
    };
    bannerBaseImage.onerror = () => console.error("Error loading banner base image");

    avatarBaseImage.onload = () => {
        console.log("Avatar base image loaded");
        drawMeme();
    };
    avatarBaseImage.onerror = () => console.error("Error loading avatar base image");

    natBaseImage.onload = () => console.log("Nat base image loaded");
    natBaseImage.onerror = () => console.error("Error loading nat base image");

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
        ctx.drawImage(avatarBaseImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(natBaseImage, 0, 0, canvas.width, canvas.height);

        const eyes = eyesSelect.value;
        if (eyes !== 'none') {
            const eyesImage = new Image();
            eyesImage.crossOrigin = "Anonymous";
            eyesImage.src = eyes;
            eyesImage.onload = () => {
                ctx.drawImage(eyesImage, 0, 0, canvas.width, canvas.height);
                drawHat();
            };
            eyesImage.onerror = () => console.error("Error loading eyes image");
        } else {
            drawHat();
        }
    }

    function drawHat() {
        const hat = hatSelect.value;
        if (hat !== 'none') {
            const hatImage = new Image();
            hatImage.crossOrigin = "Anonymous";
            hatImage.src = hat;
            hatImage.onload = () => {
                ctx.drawImage(hatImage, 0, 0, canvas.width, canvas.height);
            };
            hatImage.onerror = () => console.error("Error loading hat image");
        }
    }

    function drawBanner() {
        ctx.drawImage(bannerBaseImage, 0, 0, canvas.width, canvas.height); 

        const baseBannerImage = new Image();
        baseBannerImage.crossOrigin = "Anonymous";
        baseBannerImage.src = 'https://raw.githubusercontent.com/midjordan23/mememaker/midjordan23-images/base/Base%20for%20banner.png';
        baseBannerImage.onload = () => {
            ctx.drawImage(baseBannerImage, 0, 0, canvas.width, canvas.height);
            drawBannerText();
        };
        baseBannerImage.onerror = () => console.error("Error loading base banner image");
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
});
