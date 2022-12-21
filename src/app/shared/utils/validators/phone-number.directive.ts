import { AbstractControl, ValidationErrors } from '@angular/forms';

export const phoneNumberValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const phoneNumberRegex = RegExp(
    '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
  );
  const passesTest = phoneNumberRegex.test(control.value);
  return passesTest ? null : { invalidPhoneNumber: true };
};
