$(document).ready(function() {
  var validationRules = {
    name: {
      identifier  : 'firstName',
      rules: [
        {
          type   : 'empty',
          prompt : 'Ingrese Nombres'
        }
      ]
    }
  };

  $('.ui.form').form(validationRules, {
    inline: true,
    on: 'submit'
  });
});