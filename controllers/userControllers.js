// need use schema model
import user from '../model/userSchema.js';

export const userRegister = async (req, res) => {
  // take user inputs fro body
  try {
    const { username, email, phone, password } = req.body;
    //   check if user is already registered
    const isAlreadyRegistered = await user.findOne({ email: email });

    if (isAlreadyRegistered) {
      return res.status(400).json({ message: 'user already exists' });
    } else if (!isAlreadyRegistered) {
      // create new user
      const newUser = await user({ email, username, password, phone });
      newUser.save();
      console.log('user created', newUser);
      return res
        .status(200)
        .json({ message: 'user created successfully', user: newUser });
    }
  } catch (err) {
    console.log('error creating user', err);
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  //
  try {
    const isUserexist = await user.findOne({
      email: req.body.email,
    });
    if (isUserexist) {
      return res.status(200).json({ message: 'login success', user: user });
    } else {
      return res.status(500).json({ message: 'user not found' });
    }
  } catch (err) {
    console.log('err', err);
  }
};
