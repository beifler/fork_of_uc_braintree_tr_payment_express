<?php
/**
 * @file
 * Contains admin settings for the uc_braintree_tr_payment_express module
 *
 * Authors   : Mark Hurley  <mark@pioneeringsoftware.com>,
 *   Bethany Ritter <bethany@pioneeringsoftware.com>
 * Subject  : Module used to perform Braintree transparent redirect credit
 * card processing and server-to-server token transaction processing.
 */

/**
 * Function used to call the appropriate Braintree Configuration function forms.
 */
function uc_braintree_tr_payment_express_settings($arg = NULL) {

  switch ($arg) {
    case 'confirmation_node':
      return drupal_get_form('uc_braintree_tr_payment_express_confirmation_node_form');

    case 'config_anonymous_user':
      return drupal_get_form('uc_braintree_tr_payment_express_anonymous_user_form');

  }
}
/**
 * Allows admin to enter the numerical node value for the confirmation page.
 */
function uc_braintree_tr_payment_express_confirmation_node_form($form_state) {

  $form = array();

  $form['confirmation_node'] = array(
    '#type' => 'fieldset',
    '#title' => t('Confirmation Node Settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );

  $form['confirmation_node']['text'] = array(
    '#type' => 'markup',
    '#value' => '<p>Enter the numerical id value of the node that you want the user directed to after making their donation.</p>',
  );

  $form['confirmation_node']['confirmation_node_value'] = array(
    '#type' => 'textfield',
    '#title' => t('Confirmation Node Numerical Value'),
    '#default_value' => variable_get('uc_braintree_tr_payment_express_confirmation_node_value', ''),
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  return $form;
}

/**
 * Sets the confirmation node value to the value entered by the admin.
 */
function uc_braintree_tr_payment_express_confirmation_node_form_submit() {
  if (isset($_REQUEST['confirmation_node_value'])  &&
        $_REQUEST['confirmation_node_value']) {
    variable_set('uc_braintree_tr_payment_express_confirmation_node_value',
      $_REQUEST['confirmation_node_value']);
  }
  else {
    variable_set('uc_braintree_tr_payment_express_confirmation_node_value', '');
  }
}

/**
 * Checks value entered by the admin is a number for the confirmation node.
 */
function uc_braintree_tr_payment_express_confirmation_node_form_validate($form, &$form_state) {
  if (isset($_REQUEST['confirmation_node_value']) && $_REQUEST['confirmation_node_value']) {
    $confirmation_node_value = $_REQUEST['confirmation_node_value'];
    if (!(is_numeric($confirmation_node_value))) {
      form_set_error(t('confirmation_node_value', 'You did not enter a number. Please enter a whole number'));
    }
  }
}

/**
 * Allows admin to enter the numerical value they want for the anonymous user.
 */
function uc_braintree_tr_payment_express_anonymous_user_form($form_state) {

  $form = array();

  $form['anonymous_user'] = array(
    '#type' => 'fieldset',
    '#title' => t('Anonymous User Id'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );

  $form['anonymous_user']['text'] = array(
    '#type' => 'markup',
    '#value' => '<p>Set the value for the anonymous user id for one time donations. This is the number value of the id, not the username. The default is 999999. Please enter a whole number.</p>',
  );

  $form['anonymous_user']['value'] = array(
    '#type' => 'textfield',
    '#title' => t('Anonymous User Id'),
    '#default_value' => variable_get('uc_braintree_tr_payment_express_anonymous_uid', '999999'),
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  return $form;
}

/**
 * Sets the anonymous user value entered by the admin.
 */
function uc_braintree_tr_payment_express_anonymous_user_form_submit() {
  if (isset($_REQUEST['value']) && $_REQUEST['value']) {
    variable_set('uc_braintree_tr_payment_express_anonymous_uid', $_REQUEST['value']);
  }
  else {
    variable_set('uc_braintree_tr_payment_express_anonymous_uid', 999999);
  }
}

/**
 * Checks value entered by the admin is a whole number for the anonymous user.
 */
function uc_braintree_tr_payment_express_anonymous_user_form_validate($form, &$form_state) {
  if (isset($_REQUEST['value']) && $_REQUEST['value']) {
    $value = $_REQUEST['value'];
    if (!(is_numeric($value))) {
      form_set_error(t('value', 'You did not enter a number. Please enter a whole number'));
    }
  }
}
