(function() {
  console.log('Loading...')

  const state = {
    login: false,
    password: false
  }

  const button;
  const ACTIVE_CLASS = 'active';

  const checkInput = (evt) => {
    const input = evt.currentTarget;
    
    state[input.name] = input.value.length > 3;

    if (state.login && state.password) {
      button.classList.contains(ACTIVE_CLASS) && button.classList.add(FormHandler.ACTIVE_CLASS);
    } else {
      button.classList.remove(ACTIVE_CLASS)
    }
  };

  document.querySelectorAll('input').forEach(el => {
    el.addEventListener('keydown', checkInput)
  });

  window.close = window.removeEventListener('keydown', checkInput);
})();