import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

export const phoneNumberValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const phoneNumberUtil = PhoneNumberUtil.getInstance();

  let passesTest = false;

  try {
    passesTest = phoneNumberUtil.isValidNumber(
      phoneNumberUtil.parse(control.value)
    );
  } finally {
    return passesTest ? null : { invalidPhoneNumber: true };
  }
};
