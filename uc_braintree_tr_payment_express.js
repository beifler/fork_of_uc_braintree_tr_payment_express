function validatePhoneNumber() {
  var value = document.getElementById('edit-panes-billing-billing-phone').value;
  var validPhone = /^\d+$/;
  if ((validPhone.test(value) && (value.length >= 5 && value.length <= 20)) || value.length == 0) {
    document.getElementById('edit-panes-billing-billing-phone').style.borderColor = '';
    document.getElementById('billing-phone-number-error').style.visibility = 'hidden';
    return 1;
  }
  else {
    document.getElementById('edit-panes-billing-billing-phone').style.borderColor = 'red';
    document.getElementById('billing-phone-number-error').style.visibility = 'visible';
  }
}

function validatePostalCode() {
  var value = document.getElementById('edit-panes-billing-billing-postal-code').value;
  var validPostalCode = /^\d+$/;
  if (validPostalCode.test(value) && (value.length >= 5 && value.length <= 9)) {
    document.getElementById('edit-panes-billing-billing-postal-code').style.borderColor = '';
    document.getElementById('billing-postal-code-error').style.visibility = 'hidden';
    return 1;
  }
  else {
    document.getElementById('edit-panes-billing-billing-postal-code').style.borderColor = 'red';
    document.getElementById('billing-postal-code-error').style.visibility = 'visible';
  }
}

function validateAmount(id) {
  var value = document.getElementById('edit-transaction[amount]').value;
  if (isNaN(value)) {
    document.getElementById('edit-transaction[amount]').style.borderColor = 'red';
    document.getElementById('amount-error').style.visibility = 'visible';
    return 0;
  }
  else {
    document.getElementById('edit-transaction[amount]').style.borderColor = '';
    document.getElementById('amount-error').style.visibility = 'hidden';
    return 1;
  }
}

function hideSpan(id) {
  document.getElementById(id).style.visibility = 'hidden';
}

function hideSubmit() {
  var max = 8;
  var count = 0;
  var value = new Array();
  value[0] = document.getElementById('edit-transaction[amount]').value;
  value[1] = document.getElementById('edit-panes-billing-billing-postal-code').value;
  value[2] = document.getElementById('edit-panes-billing-billing-first-name').value;
  value[3] = document.getElementById('edit-panes-billing-billing-last-name').value;
  value[4] = document.getElementById('edit-panes-billing-billing-street1').value;
  value[5] = document.getElementById('edit-panes-billing-billing-city').value;
  value[6] = document.getElementById('edit-panes-billing-billing-country').value;
  value[7] = document.getElementById('edit-panes-billing-billing-zone').value;

  for(i = 0; i < max; i++) {
    if (value[i] != "") {
      count++;
    }
  }
  if (validateAmount() && count == max && validatePostalCode()) {
    document.getElementById('submit-button').style.visibility = 'visible';
  }
  else {
    document.getElementById('submit-button').style.visibility = 'hidden';
  }
}
