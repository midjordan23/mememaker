@font-face {
    font-family: 'Machiato Show';
    src: url('https://raw.githubusercontent.com/midjordan23/mememaker/main/fonts/Machiato%20Show.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

body {
    font-family: 'Machiato Show', sans-serif;
    background-color: #FDF1E5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    transition: background-color 10s ease;
}

#header {
    text-align: center;
    margin-bottom: 20px;
}

#header h1, #header h2 {
    margin: 0;
}

.text-primary {
    --tw-text-opacity: 1;
    color: rgb(118 72 36 / var(--tw-text-opacity));
}

.font-extrabold {
    font-weight: 800;
}

.text-h2 {
    font-size: 60px; /* Adjust this value as needed */
    line-height: 28px; /* Adjust this value as needed */
}

.text-center {
    text-align: center;
}

#controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.btn, button {
    background-color: #783f04;
    border-radius: 1000px;
    box-shadow: 3px 3px #000000;
    padding: 11px 14px;
    color: #ffffff;
    display: inline-block;
    font: normal bold 20px/1 "Calibri", sans-serif;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover, button:hover {
    background-color: #8C6239;
    box-shadow: 4px 4px #000000;
}

.btn:active, button:active {
    box-shadow: 1px 1px #000000;
    transform: translateY(2px);
}

.btn-icon {
    margin-right: 8px;
}

input, select {
    margin: 5px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid rgb(118, 72, 36);
    width: 100%;
    max-width: 300px;
    background-color: #FFFFFF;
    color: #333333;
}

input::placeholder {
    color: #999999;
}

select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23333333' d='M0 0l4 4 4-4z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 30px;
}

#controls select {
    width: auto;
}

#meme-container {
    text-align: center;
}

.control-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 600px;
}

.button-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 600px;
}

.button-row .btn {
    flex: 1;
    margin: 0;
}

#background-select, #upload-background,
#background-select-avatar, #upload-background-avatar {
    flex: 1;
    max-width: 45%;
}

input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

input[type="file"] + label {
    background-color: #783f04;
    border-radius: 1000px;
    box-shadow: 3px 3px #000000;
    padding: 11px 14px;
    color: #ffffff;
    display: inline-block;
    font: normal bold 20px/1 "Calibri", sans-serif;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="file"] + label {
    background-color: #783f04;
    border-radius: 1000px;
    box-shadow: 3px 3px #000000;
    padding: 11px 14px;
    color: #ffffff;
    display: inline-block;
    font: normal bold 20px/1 "Calibri", sans-serif;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="file"] + label:hover {
    background-color: #8C6239;
    box-shadow: 4px 4px #000000;
}

input[type="file"] + label:active {
    box-shadow: 1px 1px #000000;
    transform: translateY(2px);
}

/* Additional styles if needed */
