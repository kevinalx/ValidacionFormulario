const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) =>{
	switch (e.target.name) {//solo se ejecutara cuando se usa debido input
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}


}

const validarCampo = (expresion, input, campo ) =>{
	if(expresion.test(input.value)){ //para acceder al valor que tenga el input
		//solo se ejecutara cuando este correcto
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');//cuando sea correcto se quitara
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');//se pondra cuando sea correcto
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');//el signo de error se quitara cuando sea correcto
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');//se pondra el signo de paloma cuando sea correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo'); //para que me muestre el mensaje de error
	    campos[campo] = true;
	}else{
		//solo se ejecutara cuando este incorrecto
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');//cuando sea incorrecto se pondra
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');//cuando sea incorrecto se quitara la señal de correcto
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');//cuando sea incorrecto se pondra el signo de incorrecto
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');//cuando sea incorrecto se quitara el signo de correcto
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); //para que me muestre el mensaje de error
		campos[campo] = false;

	}


}

const validarPassword2 = () =>{
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');//cuando sea correcto se quitara
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');//se pondra cuando sea correcto
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');//el signo de error se quitara cuando sea correcto
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');//se pondra el signo de paloma cuando sea correcto
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo'); //para que me muestre el mensaje de error
		campos['password'] = false;
	}else{
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');//cuando sea correcto se quitara
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');//se pondra cuando sea correcto
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');//el signo de error se quitara cuando sea correcto
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');//se pondra el signo de paloma cuando sea correcto
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo'); //para que me muestre el mensaje de error
		campos['password'] = true;
	}

}

inputs.forEach((input) => { //para que por cada input me ejecute un codigo
    input.addEventListener('keyup', validarFormulario ); //por cada input me añade un eventListener, cuando se levanta la tecla se ejectuca esta funcion
    input.addEventListener('blur', validarFormulario );
});
//para que al dar clic en el boton la url no cambie
formulario.addEventListener('submit', (e)=>{
	e.preventDefault();


    const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked){
		 formulario.reset();//para que limpie o resetee los campos
		 
		 document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-action');
		 setTimeout(() =>{
			 document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-action')
		 }, 5000);

		 document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			 icono.classList.remove('formulario__grupo-correcto');

		 });


	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}	


});