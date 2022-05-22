import { UserModel, TokenModel, RefreshTokenModel, AddressModel } from "../models";

class AccountRepository{
  async CreateAccount({ email, password, firstName, lastName, gender }) {
    try {
      const user = new UserModel({
        email,
        password,
        firstName,
        lastName,
        gender
      });
      const userResult = await user.save();
  
      return userResult;
    } catch (error) {
      throw new Error('Cannot create an account');
    }
  }

  async FindAccount({ email }) {
    try {
      const existingAccount = await UserModel.findOne({ email });

      return existingAccount;
    } catch (error) {
      throw new Error('Cannot find account');
    }
  }

  async FindAccountById(id) {
    try {
      const existingAccount = await UserModel.findById(id);

      return existingAccount;  
    } catch (error) {
      throw new Error('Cannot find account');
    }
  }

  async UpdateAccount({ _id, firstName, lastName, email, password, gender, isAdmin, avatar, isActive }){
    try {
      const updatedAccount = await UserModel.findOneAndUpdate(
        { _id },
        { firstName, lastName, email, password, gender, isAdmin, avatar, isActive },
        { new: true },
      );

      return updatedAccount;
    } catch (error) {
      throw new Error('Cannot update an account')
    }
  }

  async DeleteAccount({ _id, email }) {
    try {
      const deletedAccount = await UserModel.findOneAndDelete({ $or: [{ _id }, { email }] });

      return deletedAccount
    } catch (error) {
      throw new Error('Cannot delete an account');
    }
  }

  async FindAllUsers() {
    try {
      const users = await UserModel.find({});

      return users;
    } catch (error) {
      throw new Error('Cannot find all users');
    }
  }

  async CreateRefreshToken({ user, token, expiryDate }) {
    try {
      const createRefreshToken = new RefreshTokenModel({ user, token, expiryDate });
      const refreshTokenResult = await createRefreshToken.save();

      return refreshTokenResult;
    } catch (error) {
      throw new Error('Cannot create the refresh token');
    }
  }

  async FindRefreshToken({ token }) {
    try {
      const existingRefreshToken = await RefreshTokenModel.findOne({ token }).populate('user');

      return existingRefreshToken
    } catch (error) {
      throw new Error('Cannot find the refresh token');
    }
  }

  async DeleteRefreshToken({ _id, token }) {
    try {
      const existingToken = await RefreshTokenModel.findOneAndDelete({ $or: [{ _id }, { token }] });

      return existingToken;
    } catch (error) {
      throw new Error('Cannot delete the refresh token');
    }
  }

  async CreateToken({ user, token }) {
    try {
      const createToken = new TokenModel({ user, token });
      const tokenResult = await createToken.save();

      return tokenResult;
    } catch (error) {
      throw new Error('Cannot create the token');
    }
  }

  async FindToken({ user }) {
    try {
      const existingToken = await TokenModel.findOne({ user });

      return existingToken;
    } catch (error) {
      throw new Error('Cannot find the token');
    }
  }

  async DeleteToken({ _id }) {
    try {
      const existingToken = await TokenModel.findOneAndDelete({ _id });

      return existingToken;
    } catch (error) {
      throw new Error('Cannot delete the token');
    }
  }

  async CreateAddress({ user, address, city, state, country, postalCode, phoneNumber }) {
    try {
      const createAddress = new AddressModel({ user, address, city, state, country, postalCode, phoneNumber });
      const addressResult = await createAddress.save();

      return addressResult;
    } catch (error) {
      throw new Error('Cannot create the address');
    }
  }

  async FindAddress({ _id }) {
    try {
      const existingAddress = await AddressModel.findOne({ _id });

      return existingAddress;
    } catch (error) {
      throw new Error('Cannot find the address');
    }
  }

  async FindListUserAddress({ user }) {
    try {
      const existingAddresses = await AddressModel.find({ user });

      return existingAddresses;
    } catch (error) {
      throw new Error('Cannot find the list of user addresses');
    }
  }

  async UpdateAddress({ _id, address, city, state, country, postalCode, phoneNumber }) {
    try {
      const updatedAddress = await AddressModel.findOneAndUpdate(
        { _id },
        { address, city, state, country, postalCode, phoneNumber },
        { new: true },
      );

      return updatedAddress;
    } catch (error) {
      throw new Error('Cannot update the address');
    }
  }

  async DeleteAddress({ _id }) {
    try {
      const deletedAddress = await AddressModel.findOneAndDelete({ _id });

      return deletedAddress;
    } catch (error) {
      throw new Error('Cannot delete the address');
    }
  }
}

export default AccountRepository;