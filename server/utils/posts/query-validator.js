export const queryValidator = (param, defaultValue, allowed) => {
    return allowed.includes(param) ? param : defaultValue;
}