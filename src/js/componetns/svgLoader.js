const svgLoader = () => {
  const url = document.body.getAttribute('data-sprite');

  const sprite = document.createElement('div');
  sprite.classList.add('.sprite');
  
  if (url) {
    fetch(url)
      .then(r => r.text())
      .then(elem => {
        sprite.innerHTML = elem;
        document.body.prepend(sprite);
      })
      .catch(console.error.bind(console));
  }  
};

export default svgLoader;