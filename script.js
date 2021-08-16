const pixels = document.getElementById('pixel-board');
const buttonClick = document.getElementById('clear-board');
const elementColor = document.getElementsByClassName('color');
let pixelLine = 5;

// cores randomicas
function newColors() {
  const rgb1 = Math.random() * 255;
  const rgb2 = Math.random() * 255;
  const rgb3 = Math.random() * 255;
  return `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
}

// numero da paleta de cores
function numberColors() {
  const fatherLi = document.querySelector('.color-palette');
  fatherLi.innerHTML = "";
  const numberColors = document.querySelector('#set-colors').value;
  parseInt(numberColors);
  for(let index = 1; index <= numberColors; index += 1) {
    const createLi = document.createElement('li');
    createLi.className = 'color';
    createLi.style.backgroundColor = newColors();
    fatherLi.appendChild(createLi);
    const selected = document.getElementsByTagName('li')[0];
    selected.className = 'selected color';
    elementColor[index].addEventListener('click', colorSelect);
  }
}
const buttonGet = document.querySelector('.get');
buttonGet.addEventListener('click', () => numberColors());

// insere classe selecionada
function colorSelect(event) {
  const select = document.querySelector('.selected');
  select.classList.remove('selected');
  event.target.classList.add('selected');
}

// pinta pixels
function paintPixel(eventPaint) {
  const paint = document.querySelector('.selected');
  const color = paint.style.backgroundColor;
  eventPaint.target.style.backgroundColor = color;
}

// cria grid inicial e pinta pixel
function grid(pixelLine) {
  for (let index = 0; index < pixelLine; index += 1) {
    const createDivLine = document.createElement('tr');
    createDivLine.className = 'line';
    pixels.appendChild(createDivLine);

    for (let indexcolumn = 0; indexcolumn < pixelLine; indexcolumn += 1) {
      const createDivColumn = document.createElement('td');
      createDivColumn.className = 'pixel';
      createDivLine.appendChild(createDivColumn);
      createDivColumn.addEventListener('click', paintPixel);
    }
  }
}
grid(pixelLine);

// board dinamico e somente boards válidos
function gridNew() {
  const newGrid = document.getElementById('board-size').value;
  parseInt(newGrid);
  if (newGrid >= 5 && newGrid <= 50) {
    pixelLine = newGrid;
    while (pixels.lastElementChild) {
      pixels.removeChild(pixels.lastElementChild);
    }
    grid(pixelLine);
    paintPixel();

  } if(newGrid < 5 && newGrid !== '') {
    alert('Somente número maior que 5 e menor que 50');
    newGrid.value = 5;
  } if (newGrid > 50 && newGrid !== '') {
    alert('Somente número maior que 5 e menor que 50');
    newGrid.value = 50;
  } if (newGrid === ''){
    alert('Board inválido!');
  }
}
const button = document.getElementById('generate-board');
button.addEventListener('click', gridNew);

// limpa o board
buttonClick.addEventListener('click', () => {
  const pixe = document.getElementsByClassName('pixel');
  for (let pix = 0; pix < pixe.length; pix += 1) {
    pixe[pix].style.backgroundColor = '';
  }
});

// modal
function startModal(modalID) {
  const modal = document.getElementById(modalID);
  if(modal) {
    modal.classList.add('open');
    modal.addEventListener('click', (e) => {
      if(e.target.id == modalID || e.target.className == 'close') {
        modal.classList.remove('open');
      }
    })
  }
}

const started = document.querySelector('.btn-about');
started.addEventListener('click', () => startModal('modal-content'));