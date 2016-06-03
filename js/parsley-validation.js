jq_newer(function () {
var $sections = jq_newer('.form-section');
var $progress = jq_newer('#progress li');

function navigateTo(index) {
  // Mark the current section with the class 'current'
  $sections
    .removeClass('current')
    .eq(index)
    .addClass('current');

  $progress
    .removeClass('current')
    .eq(index)
    .addClass('current');

  // Show only the navigation buttons that make sense for the current section:
  jq_newer('.form-navigation .previous').toggle(index > 0);
  var atTheEnd = index >= $sections.length - 1;
  jq_newer('.form-navigation .next').toggle(!atTheEnd);
  jq_newer('.form-navigation [type=submit]').toggle(atTheEnd);
}

function curIndex() {
  // Return the current index by looking at which section has the class 'current'
  return $sections.index($sections.filter('.current'));
}

// returns true or false
function radioIsChecked() {
  return (jq_newer('input[type=radio]:checked').length > 0);
}

// format numbers with the thousands separator
function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

// get the value of the chosen amount
function amountValue() {
  if (radioIsChecked()) {
    // return the value of the radio button
    var amount = jq_newer('input[type=radio]:checked').val();
    return addCommas(amount);
  } else {
    // return the value of the other amount
    var amount = jq_newer('#edit-panes-amount-other').val();
    return addCommas(amount);
  }
}

// deselects the active radio button
function deselectRadio() {
  jq_newer('input[class=form-radio]').attr('checked', false)
}

// clears the other amount if a radio button gets checked
function deselectOther() {
  jq_newer('input[class=form-radio]').click(function() {
    jq_newer('#edit-panes-amount-other').val("");
    jq_newer('#edit-panes-amount-other').removeClass('parsley-success');
  });
}

// T or F
function otherIsUsed() {
  return (document.querySelector('#edit-panes-amount-other').value > 0);
}

// Previous button is easy, just go back
jq_newer('.form-navigation .previous').click(function() {
  navigateTo(curIndex() - 1);
});

// Deselect the active radio button if there is one
jq_newer('#edit-panes-amount-other').click(function() {
  deselectRadio();
});

// Clear the other amount if a radio button is checked
jq_newer('#edit-panes-amount-other').click(function() {
  deselectOther();
});

// Next button goes forward if current block validates
jq_newer('.form-navigation .next, .form-radio').click(function() {
  if (jq_newer('#uc-braintree-tr-payment-express-donate-form').parsley().validate({
      group: 'block-' + curIndex()
    })) {
    if (radioIsChecked() === true || otherIsUsed()) {
    var ok = true;
    } else {
    var ok = false;
    }
  }

  if (ok) {
    jq_newer('.invalid-form-error-message')
  //    .html('')
      .toggleClass('visible', !ok);
      // set the value of the #gift-value div with the chosen amount
  jq_newer('#gift-value')
    .html("$" + amountValue())
    .toggleClass('filled', !ok);
    navigateTo(curIndex() + 1);
    jq_newer('#gift-value').slideDown(500);
  } else {
    jq_newer('.invalid-form-error-message')
     // .html('You must correctly fill *at least one of these two blocks!')
      .toggleClass('visible', !ok);

    formInstance.validationResult = false;
  }
});

// Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
$sections.each(function(index, section) {
  jq_newer(section).find(':input').attr('data-parsley-group', 'block-' + index);
});
navigateTo(0); // Start at the beginning
});
/* Here we will persist the form data into localStorage on every keystroke */
jq_newer( function() { jq_newer( "#uc-braintree-tr-payment-express-donate-form" ).sisyphus( { excludeFields: jq_newer( "#edit-panes-card-number, #edit-panes-cvv" )} ); } );
