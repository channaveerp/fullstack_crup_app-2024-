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
      password: req.body.password,
    });
    const ispasswords = await user.findOne({
      password: req.body.password,
    });
    if (!isUserexist) {
      return res.status(400).json({ message: 'wrong credtial' });
    }

    if (isUserexist) {
      return res.status(200).json({ message: 'user loged in successfully' });
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const getAlluserData = async (req, res) => {
  try {
    const isUserexist = await user.find();
    if (!isUserexist || isUserexist.length === 0) {
      return res.status(400).json({ message: 'no data found' });
    }
    if (isUserexist) {
      return res
        .status(200)
        .json({ message: 'data fetched succecfully', Allusers: isUserexist });
    }
  } catch (err) {
    console.log('errro', err);
  }
};

export const deleteUser = async (req, res) => {
  const itemIds = req.body.ids;
  console.log('Delete Result:', itemIds);
  try {
    const deleteResult = await user.deleteMany({ _id: { $in: itemIds } });

    console.log('Delete Result:', deleteResult);

    if (deleteResult.deletedCount > 0) {
      return res.status(200).json({ message: 'Users deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Users not found' });
    }
  } catch (err) {
    console.error('Error deleting users:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const editUsers = async (req, res) => {
  console.log('hello!', req.body);
  const userId = req.query.id;
  try {
    const editResult = await user.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        },
      },
      { new: true }
    );
    console.log('Edit Result:', editResult);
    if (editResult) {
      return res
        .status(200)
        .json({ message: 'dwetails updated successfully', id: editResult });
    }
    if (!editResult) {
      return res.status(404).json({ message: 'id not found' });
    }
  } catch (err) {
    console.log('error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
