import { AccountRepository } from "../database";
import { FormateData } from "../utils";
import { validateAddress } from "../utils/validation";
import statusCodes from "../utils/status-codes";

class UserService {
  constructor() {
    this.repository = new AccountRepository();
  }

  async ListUsers() {
    try {
      const users = await this.repository.FindAllUsers();

      return FormateData(statusCodes.OK, users, "Berhasil mendapatakan list users");
    } catch (error) {
      throw new Error("Failed to get list of users");
    }
  }

  async ReadUser(params) {
    const { id } = params;

    try {
      const existingUser = await this.repository.FindAccountById(id);

      return FormateData(statusCodes.OK, existingUser, "Berhasil mendapatkan data user");
    } catch (error) {
      throw new Error("Failed to read the user");
    }
  }

  async UpdateUser(params, user, userInputs) {
    const isRealUser = params.id === user.id;
    const { firstName, lastName, gender } = userInputs;

    if (!isRealUser) return FormateData(statusCodes.UNAUTHORIZED, null, "Anda hanya dapat mengubah data anda sendiri");

    try {
      const updatedUser = await this.repository.UpdateAccount({ _id: user.id, firstName, lastName, gender });

      return FormateData(statusCodes.OK, updatedUser, "Berhasil update data user");
    } catch (error) {
      throw new Error("Failed to update the user");
    }
  }

  async UpdateAvatar(params, user, file){
    const isRealUser = params.id === user.id;
    if (!isRealUser) return FormateData(statusCodes.UNAUTHORIZED, null, "Anda hanya dapat mengubah data anda sendiri");
    if (!file) return FormateData(statusCodes.BAD_REQUEST, null, "File tidak ditemukan");

    try {
      console.log(file);

      const updatedUser = await this.repository.UpdateAccount({ _id: user.id, avatar: file.filename });

      return FormateData(statusCodes.OK, updatedUser, "Berhasil update avatar");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload avatar image");
    }
  }

  async DeleteUser(params) {
    const { id } = params;

    try {
      const deletedUser = await this.repository.DeleteAccount({ _id: id });

      return FormateData(statusCodes.OK, deletedUser, "Berhasil menghapus data user");
    } catch (error) {
      throw new Error("Failed to delete the user");
    }
  }

  async CreateAddress(user, userInputs) {
    const { id } = user;
    const { address, city, state, country, postalCode, phoneNumber } = userInputs;
    const { error } = validateAddress(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const createdAddress = await this.repository.CreateAddress({ user: id, address, city, state, country, postalCode, phoneNumber });

      return FormateData(statusCodes.OK, createdAddress, "Berhasil membuat alamat baru");
    } catch (error) {
      console.log(error)
      throw new Error("Failed to create the address");
    }
  }

  async ReadAddresses(user) {
    const { id } = user;

    try {
      const existingAddresses = await this.repository.FindListUserAddress({ user: id });

      if (existingAddresses.length === 0) return FormateData(statusCodes.OK, null, "Anda belum memiliki alamat");

      return FormateData(statusCodes.OK, existingAddresses, "Berhasil mendapatkan list alamat");
    } catch (error) {
      throw new Error("Failed to read the address");
    }
  }

  async UpdateAddress(params, user, userInputs) {
    const userId = user.id;
    const addressId = params.id;
    const { address, city, state, country, postalCode, phoneNumber } = userInputs;
    const { error } = validateAddress(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const existingAddress = await this.repository.FindAddress({ _id: addressId });
      if (!existingAddress) return FormateData(statusCodes.UNAUTHORIZED, null, "Data alamat tidak ditemukan");
      const isRealUserAddress = String(existingAddress.user) === userId;
      if (!isRealUserAddress) return FormateData(statusCodes.UNAUTHORIZED, null, "Anda hanya dapat mengubah alamat anda sendiri");

      const updatedAddress = await this.repository.UpdateAddress({ _id: addressId, address, city, state, country, postalCode, phoneNumber });

      return FormateData(statusCodes.OK, updatedAddress, "Berhasil update alamat");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update the address");
    }
  }

  async DeleteAddress(params, user) {
    const { id: userId, isAdmin } = user;
    const addressId = params.id;

    try {
      let deletedAddress;
      const existingAddress = await this.repository.FindAddress({ _id: addressId });
      const isRealUserAddress = String(existingAddress.user) === userId;

      if (!existingAddress) return FormateData(statusCodes.BAD_REQUEST, null, "Alamat tidak ditemukan");

      switch (isAdmin) {
        case true:
          deletedAddress = await this.repository.DeleteAddress({ _id: addressId });
          break;
        case false:
          if (!isRealUserAddress) return FormateData(statusCodes.UNAUTHORIZED, null, "Anda hanya dapat menghapus alamat anda sendiri");
          deletedAddress = await this.repository.DeleteAddress({ _id: addressId });
          break;
      }

      return FormateData(statusCodes.OK, deletedAddress, "Berhasil menghapus alamat");
    } catch (error) {
      throw new Error("Failed to delete the address");
    }
  }
}

export default UserService;