function validatePhoneNumber() {
    var value = document.getElementById('edit-panes-billing-billing-phone').value;
    var validPhone = /^\d+$/;
    if ((validPhone.test(value) && (value.length >= 5 && value.length <= 20)) || value.length == 0) {
        document.getElementById('edit-panes-billing-billing-phone').style.borderColor = '';
        document.getElementById('billing-phone-number-error').style.visibility = 'hidden';
        return 1;
    } else {
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
    } else {
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
    } else {
        document.getElementById('edit-transaction[amount]').style.borderColor = '';
        document.getElementById('amount-error').style.visibility = 'hidden';
        return 1;
    }
}

function hideSpan(id) {
    document.getElementById(id).style.visibility = 'hidden';
}

function toggleCreditCardFields() {
    var ccDropdown = document.getElementById("edit-token");
    var selectedValue = ccDropdown.options[ccDropdown.selectedIndex].value;
    var btForm = document.uc_braintree_tr_payment_express_donate;
    console.log(ccDropdown.options[ccDropdown.selectedIndex].value);
    console.log(btForm);
    console.log(btForm.action);
    if (selectedValue == "Other") {
        console.log("other selected");
        document.getElementById("trDiv").setAttribute("class", "showDivision");
        btForm.action = document.getElementById("tr_url").value;
        console.log("1a");
        console.log(btForm.action);
        document.getElementById("edit-panes-card-number").disabled = false;
        console.log("2a");
        document.getElementById("edit-panes-credit-card-expiration-month").disabled = false;
        console.log("3a");
        document.getElementById("edit-panes-credit-card-expiration-year").disabled = false;
        console.log("4a");
        document.getElementById("edit-panes-credit-card-cvv").disabled = false;
        console.log("5a");
        console.log("all lines in this section completed");
    } else {
        console.log("else selected");
        btForm.action = document.getElementById("s2s_url").value;
        console.log("1b");
        console.log(btForm.action);
        document.getElementById("edit-panes-card-number").disabled = true;
        console.log("2b ");
        document.getElementById("edit-panes-credit-card-expiration-month").disabled = true;
        console.log("3b");
        document.getElementById("edit-panes-credit-card-expiration-year").disabled = true;
        console.log("4b");
        document.getElementById("edit-panes-credit-card-cvv").disabled = true;
        console.log("5b");
        document.getElementById("trDiv").setAttribute("class", "hideDivision");
        console.log("all lines in this section completed");
    };
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

    for (i = 0; i < max; i++) {
        if (value[i] != "") {
            count++;
        }
    }
    if (validateAmount() && count == max && validatePostalCode()) {
        document.getElementById('submit-button').style.visibility = 'visible';
    } else {
        document.getElementById('submit-button').style.visibility = 'hidden';
    }
}
