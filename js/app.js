const bmw = '1',
      ford = '2',
      volkswagen = '3',
      tesla = '4',
      toyota = '5',
      audi = '6',
      ferrari = '7';

const basico = '1',
      ampliado = '2',
      todoRiesgo = '3';

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
    /**
     * 1- BMW -> 1.3
     * 2- Ford -> 1.0
     * 3- VolksWagen -> 1.1
     * 4- Tesla -> 1.5
     * 5- Toyota -> 0.9
     * 6- Audi -> 1.3
     * 7- Ferrari -> 2.5
     */

    let cantidad;

    const base = 300;

    switch(this.marca){
        case bmw:
            cantidad = base * 1.3;
            break;
        case ford:
            cantidad = base * 1.0;
            break;
        case volkswagen:
            cantidad = base * 1.1;
            break;
        case tesla:
            cantidad = base * 1.5;
            break;
        case toyota:
            cantidad = base * 0.9;
            break;
        case audi:
            cantidad = base * 1.3;
            break;
        case ferrari:
            cantidad = base * 2.5;
            break;
        default:
            break;
    }

    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /**
     * 1- Basico -> 1.3
     * 2- Ampliado -> 1.0
     * 3- Riesgo -> 1.1
     */

    console.log(this.tipo)

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else if(this.tipo === 'ampliado'){
        cantidad *= 1.50;
    }else{
        cantidad *= 2;
    }


    return cantidad;
}

function UI(){

}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i --){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}

UI.prototype.mostrarResultado = (seguro, total) => {

    const {marca, year, tipo} = seguro;

    let textoMarca;

    switch(marca){
        case bmw:
            textoMarca = 'BMW';
            break;
        case ford:
            textoMarca = 'Ford';
            break;
        case volkswagen:
            textoMarca = 'Volkswagen';
            break;
        case tesla:
            textoMarca = 'Tesla';
            break;
        case toyota:
            textoMarca = 'Toyota';
            break;
        case audi:
            textoMarca = 'Audi';
            break;
        case ferrari:
            textoMarca = 'Ferrari';
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    
        <p class="header">Resumen seguro</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo seguro: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">${total.toFixed(2)}€</span></p>
    `;

    const resultDiv = document.querySelector('#resultado');

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultDiv.appendChild(div);
    }, 2000);
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();

    const form = document.querySelector('#cotizar-seguro');
    if (form) form.reset();
})

eventListeners();

function eventListeners(){
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(event){
    event.preventDefault();
    const marca = document.querySelector('#marca').value;

    const year = document.querySelector('#year').value;
    
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    const results = document.querySelector('#resultado div');
    if(results != null){
        results.remove();
    }

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(seguro, total);

  
}