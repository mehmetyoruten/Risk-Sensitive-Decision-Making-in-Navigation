// choose cells 
const cells = document.querySelectorAll('.square')

cells.forEach((square) => {
    square.addEventListener('click', () => {
        removeActiveClasses()
        square.classList.add('active')
    })
}
)

function removeActiveClasses() {
    cells.forEach((square) => {
        square.classList.remove('active')
    } )
}
