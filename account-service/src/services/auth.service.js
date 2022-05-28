import { v4 as uuidv4 } from 'uuid';

import { AccountRepository } from "../database";
import { FormateData, generateSalt, sendEmail, hashPassword, signJWT, comparePassword, verifyRefreshToken } from "../utils";
import { 
  validateUser, validateLogin, validateForgotPassword, validateResetPassword,
  validateChangePassword
} from "../utils/validation";
import statusCodes from '../utils/status-codes';
import env from "../config";

class AuthService {

  constructor(){
    this.repository = new AccountRepository();
  }
  
  async Register(userInputs) {
    const { email, password, firstName, lastName, gender } = userInputs;
    const { error } = validateUser(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);
    
    try {
      const existingAccount = await this.repository.FindAccount({ email });
      if (existingAccount) return FormateData(statusCodes.BAD_REQUEST, null, "Pengguna sudah terdaftar");

      const salt = await generateSalt();
      const hashedPassword = await hashPassword(password, salt);
      const user = await this.repository.CreateAccount({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        gender
      });

      let token = await this.repository.FindToken({ user: user._id });
      if (!token) { 
        token = await this.repository.CreateToken({ user: user._id, token: uuidv4()});
      }

      const message = `${env.BASE_URL}/activate/${user._id}/${token.token}`;
      await sendEmail(user.email, "Aktivasi Akun", message);

      const responseData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        gender: user.gender,
        isActive: user.isActive
      }

      return FormateData(statusCodes.OK, responseData, "User berhasil didaftarkan. Silahkan cek email anda untuk aktivasi");
    } catch (error) {
      throw new Error('Cannot create an account');
    }
  }

  async Login(userInputs) {
    const { email, password } = userInputs;
    const { error } = validateLogin(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const existingAccount = await this.repository.FindAccount({ email });
      const isPasswordValid = await comparePassword(password, existingAccount.password);

      if (!existingAccount || !isPasswordValid) return FormateData(statusCodes.BAD_REQUEST, null, "Email atau password salah");
      if (!existingAccount.isActive) return FormateData(statusCodes.UNAUTHORIZED, null, "User belum diaktivasi");

      const payloadAccessToken = {
        id: existingAccount._id,
        email: existingAccount.email,
        firstName: existingAccount.firstName,
        lastName: existingAccount.lastName,
        isAdmin: existingAccount.isAdmin,
      }
      const payloadRefreshToken = {
        user: existingAccount._id,
        token: uuidv4(),
        expiryDate: new Date().setSeconds(new Date().getSeconds() + env.JWT_REFRESH_EXPIRATION)
      }

      const accessToken = signJWT(payloadAccessToken);
      const refreshToken = await this.repository.CreateRefreshToken(payloadRefreshToken);

      const responseData = {
        _id: existingAccount._id,
        firstName: existingAccount.firstName,
        lastName: existingAccount.lastName,
        email: existingAccount.email,
        isAdmin: existingAccount.isAdmin,
        isActive: existingAccount.isActive,
        accessToken,
        refreshToken: refreshToken.token
      }

      return FormateData(statusCodes.OK, responseData, "User berhasil login");
    } catch (error) {
      throw new Error('Cannot login');
    }
  }

  async Activate(userInputs) {
    const { id, token } = userInputs;

    try {
      const existingAccount = await this.repository.FindAccountById(id);
      if (!existingAccount) return FormateData(statusCodes.BAD_REQUEST, null, "User tidak ditemukan");

      const existingToken = await this.repository.FindToken({ user: id });
      if (!existingToken) return FormateData(statusCodes.BAD_REQUEST, null, "Token sudah kadaluarsa");

      const isTokenValid = existingToken.token === token;
      if (!isTokenValid) return FormateData(statusCodes.BAD_REQUEST, null, "Token tidak valid");

      const updatedAccount = await this.repository.UpdateAccount({ _id: id, isActive: true });
      await this.repository.DeleteToken({ _id: existingToken._id });

      const responseData = {
        _id: updatedAccount._id,
        firstName: updatedAccount.firstName,
        lastName: updatedAccount.lastName,
        email: updatedAccount.email,
        isAdmin: updatedAccount.isAdmin,
        isActive: updatedAccount.isActive
      }

      return FormateData(statusCodes.OK, responseData, "User berhasil diaktivasi");
    } catch (error) {
      throw new Error('Cannot activate an account');
    }
  }

  async ResendActivation(userInputs) {
    const { email } = userInputs;
    if (!email) return FormateData(statusCodes.BAD_REQUEST, null, "Email tidak boleh kosong");

    try {
      const existingAccount = await this.repository.FindAccount({ email });
      if (!existingAccount) return FormateData(statusCodes.BAD_REQUEST, null, "User tidak ditemukan");

      let token = await this.repository.FindToken({ user: existingAccount._id });
      if (!token) { 
        token = await this.repository.CreateToken({ user: existingAccount._id, token: uuidv4()});
      } else {
        return FormateData(statusCodes.BAD_REQUEST, null, "Link aktivasi anda masih aktif");
      }

      const message = `${env.BASE_URL}/activate/${existingAccount._id}/${token.token}`;
      await sendEmail(existingAccount.email, "Aktivasi Akun", message);

      return FormateData(statusCodes.OK, token, "Link aktivasi berhasil dikirimkan ke email anda");
    } catch (error) {
      console.log(error);
      throw new Error('Cannot resend activation');
    }
  }

  async ForgotPassword(userInputs) {
    const { email } = userInputs;
    const { error } = validateForgotPassword(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const existingUser = await this.repository.FindAccount({ email });
      if (!existingUser) return FormateData(statusCodes.BAD_REQUEST, null, "Email tidak terdaftar");

      const token = this.repository.CreateToken({ user: existingUser._id, token: uuidv4()});

      const message = `${env.BASE_URL}/reset-password/${existingUser._id}/${token.token}`;
      await sendEmail(existingUser.email, "Reset Password", message);

      return FormateData(statusCodes.OK, null, "Silahkan cek email anda untuk melakukan reset password");
    } catch (error) {
      throw new Error('Failed to request forgot password');
    }
  }

  async ResetPassword(params, userInputs) {
    const { id, token } = params;
    const { password } = userInputs;
    const { error } = validateResetPassword(userInputs);
    
    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const existingUser = await this.repository.FindAccountById(id);
      if (!existingUser) return FormateData(statusCodes.BAD_REQUEST, null, "User tidak ditemukan");

      const existingToken = await this.repository.FindToken({ user: id });
      if (!existingToken || existingToken.token !== token) return FormateData(statusCodes.BAD_REQUEST, null, "Token tidak ditemukan atau tidak valid");

      const salt = await generateSalt();
      const hashedPassword = await hashPassword(password, salt);

      await this.repository.UpdateAccount({ _id: id, password: hashedPassword });
      await this.repository.DeleteToken({ _id: existingToken._id });

      return FormateData(statusCodes.OK, null, "Password berhasil diubah");
    } catch (error) {
      throw new Error('Failed to reset password');
    }
  }

  async RefreshToken(userInpus) {
    const { token } = userInpus;
    if (!token) return FormateData(statusCodes.BAD_REQUEST, null, "Token tidak boleh kosong");

    try {
      const existingRefreshToken = await this.repository.FindRefreshToken({ token });
      if (!existingRefreshToken) return FormateData(statusCodes.BAD_REQUEST, null, "Token tidak ditemukan");

      const isTokenValid = verifyRefreshToken(existingRefreshToken);
      if (!isTokenValid){
        await this.repository.DeleteRefreshToken({ _id: existingRefreshToken._id });
        return FormateData(statusCodes.BAD_REQUEST, null, "Token sudah kadaluarsa");
      } 

      const payloadAccessToken = {
        id: existingRefreshToken.user._id,
        email: existingRefreshToken.user.email,
        firstName: existingRefreshToken.user.firstName,
        lastName: existingRefreshToken.user.lastName,
        isAdmin: existingRefreshToken.user.isAdmin,
      }

      const accessToken = signJWT(payloadAccessToken);

      const responseData = {
        accessToken,
        refreshToken: existingRefreshToken.token
      }

      return FormateData(statusCodes.OK, responseData, "Token berhasil diperbarui");
    } catch (error) {
      console.log(error);
      throw new Error('Failed to genereate new access token');
    }
  }

  async ChangePassword(user, userInputs) {
    const { oldPassword, newPassword } = userInputs;
    const { email } = user;
    const { error } = validateChangePassword(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const existingUser = await this.repository.FindAccount({ email });

      const isOldPasswordCorrect = await comparePassword(oldPassword, existingUser.password);
      if (!isOldPasswordCorrect) return FormateData(statusCodes.BAD_REQUEST, null, "Password lama yang anda masukan salah");

      const salt = await generateSalt();
      const hashedPassword = await hashPassword(newPassword, salt);

      const updatedUser = await this.repository.UpdateAccount({ _id: existingUser._id, password: hashedPassword });

      const responseData = {
        id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        isAdmin: updatedUser.isAdmin,
        gender: updatedUser.gender,
        avatar: updatedUser.avatar,
        isActive: updatedUser.isActive
      }

      return FormateData(statusCodes.OK, responseData, "Berhasil memperbaharui password");
    } catch (error) {
      throw new Error('Failed to change password');
    }
  }

  async Logout(headers){
    const { refreshToken } = headers;

    try {
      if (!refreshToken) return FormateData(statusCodes.UNAUTHORIZED, null, "Refresh token tidak ditemukan");

      const deletedRefreshToken = await this.repository.DeleteRefreshToken({ token: refreshToken });

      return FormateData(statusCodes.OK, deletedRefreshToken, "Berhasil logout");
    } catch (error) {
      throw new Error('Failed to logout');
    }
  }
}

export default AuthService;