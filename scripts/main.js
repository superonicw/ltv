$(document).ready(function () {
  /* Validates email using regex */
  function validateEmail(val) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase());
  }

  /* Use ajax call to fetch peronsal info using email */
  function lookupEmail(email) {
    $.ajax({
      type: 'GET',
      url: `https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`,
      dataType: 'json',
      contentType: 'application/json',
      beforeSend: function () {
        showLoader();
      },
    })
      .done(function (data) {
        console.log('--- success ---');
      })
      .fail(function (data) {
        console.log('--- fail ---');
      })
      .always(function () {
        hideLoader();
      });
  }

  function showLoader() {
    $('.loading-section').removeClass('d-none');
    $('.content').addClass('d-none');
    $('.search-section').addClass('d-none');
  }

  function hideLoader() {
    $('.loading-section').addClass('d-none');
    $('.content').removeClass('d-none');
  }

  /* Run validation whenver the input changes */
  $('.search-input').keyup(function (evt) {
    const email = evt.target.value;
    const isValid = validateEmail(email);

    if (isValid) {
      $(this).removeClass('invalid');
      $(this).parent().find('.error-message').remove();
    } else {
      $(this).addClass('invalid');

      if ($(this).parent().find('.error-message').length === 0) {
        $(this)
          .parent()
          .append(
            `<div class="error-message">Please add a valid email address</div>`,
          );
      }
    }
  });

  /* Send api request if email is valid */
  $('.search-button').click(function () {
    const email = $(this).parent().find('.search-input').val();
    const isValid = validateEmail(email);

    if (isValid) {
      lookupEmail(email);
    }
  });
});
