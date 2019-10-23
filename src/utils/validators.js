export const required = value =>
    (Array.isArray(value) && value.length < 1) || (!value && value !== 0) ? 'validator.input.requiredField' : undefined;
