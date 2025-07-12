import *as user_repository from "../repositories/user.repository.js"

export const registerUser = async (newUser) => {
  try {
    const user = await user_repository.findByemail(newUser.email);

    if (user)
      throw new Error("Usuario ya registrado");

    return user_repository.save(newUser);
  } catch (e) {
    throw new Error("Error al registrar usuario", e);
  }
}

export const loginUser = async (email, password) => {
  try {
    const user = await user_repository.findByemail(email);

    if (!user && !(await user.validatePassword(password)))
      throw new Error("Credenciales invalidas");

    return "token";
  } catch (e) {
    throw new Error("Error al iniciar sesion", e)
  }
}
