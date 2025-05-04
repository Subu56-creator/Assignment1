function toggleFont() {
    let title = document.querySelector('.gothic-font');
    if (title.style.fontFamily.includes('UnifrakturMaguntia')) {
        title.style.fontFamily = 'Arial, sans-serif';
    } else {
        title.style.fontFamily = "'UnifrakturMaguntia', cursive";
    }
}
