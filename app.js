const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault()
})

const submitBtn = document.querySelector('.btn');
const email = document.getElementById('email')
const allInputs = document.querySelectorAll('input, textarea');
const radios = document.querySelectorAll('input[type="radio"]');
const checkbox = document.querySelector('#checkbox');

const emailRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

//! get error text near the input field
function getErrTxt(element) {
  const parentDiv = element.closest('.pos-relative')
  return parentDiv.querySelector('.err-txt')
}


//! form submit button 
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  // inputs and textarea check
  allInputs.forEach(input => {
    const errTxt = getErrTxt(input)

    if (input.value.trim() === '') {
      input.classList.add('border')
      errTxt.classList.add('show')
    }
  })

  // radio check
  const generalRadio = document.getElementById('general')
  const supportRadio = document.getElementById('support')
  radios.forEach(radio => {
    const errTxt = getErrTxt(radio)
    errTxt.classList.add('show')

    if (generalRadio.checked || supportRadio.checked) {
      errTxt.classList.remove('show')
    }
  })

  // checkbox check
  const errTxt = getErrTxt(checkbox)
  if (!checkbox.checked) {
    errTxt.classList.add('show')
  }

  //! if all inputs has values then clear.
  if (areAllFilled()) {
    form.reset()
    completeForm();
  }
})


//! Check if all fields are filled
function areAllFilled() {
  // Check all inputs and textareas have values

  if(!email.value.match(emailRegex)){
    return false
  }

  // Check all input has value
  for (const input of allInputs) {
    if (input.value.trim() === '') {
      return false
    }
  }

  // Check at least one radio is checked
  const isRadioChecked = document.querySelector('input[type="radio"]:checked') !== null
  if (!isRadioChecked) {
    return false
  }

  // Check checkbox is checked
  if (!checkbox.checked) {
    return false
  }

  return true
}


//! email validation 
email.addEventListener('keyup', () => {

  const errTxt = getErrTxt(email)

  setTimeout(() => {
    if (email.value.trim().match(emailRegex)) {
      errTxt.classList.remove('show')
      email.classList.remove('border')
    }
    else {
      errTxt.classList.add('show')
      email.classList.add('border')
    }
    if (email.value.trim() === '') {
      email.classList.remove('border')
      errTxt.classList.remove('show')
    }
  }, 1000)
})


//! clear error state
// inputs
allInputs.forEach(input => {
  input.addEventListener('keydown', () => {
    const errTxt = getErrTxt(input)
    errTxt.classList.remove('show')
    input.classList.remove('border')
  })
})

// radios
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const errTxt = getErrTxt(radio)
    errTxt.classList.remove('show')
  })
})

// checkbox
checkbox.addEventListener('change', () => {
  const errTxt = getErrTxt(checkbox)
  
  if(!checkbox.checked){
    errTxt.classList.add('show')
  } else{
    errTxt.classList.remove('show')
  }
})


//! submit form confirmation dialogue
function completeForm() {
  const successDial = document.querySelector('.form-submit-message')

  successDial.classList.add('success')
  
  setTimeout(() => {
    successDial.classList.remove('success')
  }, 5000)
}