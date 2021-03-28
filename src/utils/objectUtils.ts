/**
  * Validate object for required fields which we get from another object.
  * 
  * @param requiredFileds Object with required fileds.
  * @param obj Object which has to validated.
  * @returns Boolean
  */
export function validateObjectForFields(obj: Object, requiredFileds: Object): boolean {
    let valid: boolean = true;

    for (let key in requiredFileds) {
        if (!obj[requiredFileds[key]]) {
            valid = false;
            break;
        }
    }

    return valid;
}