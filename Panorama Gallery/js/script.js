const $circle = document.querySelector('section#circle');
const $article = $circle.querySelectorAll('article');
for (let $face of $article) {
    $face.addEventListener('mouseenter', () => {
        // console.log('mouse entered')
        $circle.setAttribute('style', 'animation-play-state: paused')
    })
    $face.addEventListener('mouseleave', () => {
        // console.log('mouse left')
        $circle.setAttribute('style', 'animation-play-state: running')
    })
}