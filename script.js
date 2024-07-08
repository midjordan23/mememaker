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
    natBaseImage.src = 'base/BaseNatofficial.png'; // Base image that does not change
    
    let bannerBaseSrc = 'backgrounds/Blue Illustration Anime Girl Twitter Header.png'; // Default banner image
    let avatarBaseSrc = 'backgrounds/AVIBASEfirstoption.png'; // Default avatar image

    bannerBaseImage.src = bannerBaseSrc;
    avatarBaseImage.src = avatarBaseSrc;

    // ... (rest of the code remains the same)

    function drawBanner() {
        ctx.drawImage(bannerBaseImage, 0, 0, canvas.width, canvas.height); 

        // Draw the base for banner image on top
        const baseBannerImage = new Image();
        baseBannerImage.src = 'base/Base for banner.png';
        baseBannerImage.onload = () => {
            ctx.drawImage(baseBannerImage, 0, 0, canvas.width, canvas.height);
            drawBannerText();
        };
    }

    // ... (rest of the code remains the same)
});
