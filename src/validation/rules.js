export const loginRules = {
    email: ["required", "email"],
    password: ["required"]
};

export const editProfileRules = {
    old_password: ["required"],
    password: ["required"],
    password_confirmation: ["required"]
}