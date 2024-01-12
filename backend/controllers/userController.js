const catchAsyncError = require("../middleWare/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../model/userModel");
const sendjwt = require("../utils/sendjwt");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const fs = require("fs");
const reviceEmail = require("../utils/sendEmail");

// REGISTER A USER
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const avatar = req.files.avatar;
  // console.log("avatar:", avatar);
  // console.log("avatartempfile:", avatar);
  const myCloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
    folder: "userAvatars",
    width: 150,
    crop: "scale",
  });
  // console.log(myCloud);
  fs.unlinkSync(avatar.tempFilePath);

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendjwt(user, 201, res);

  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});

// LOGIN USER

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return next(new ErrorHandler("please enter Email & password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email and password", 401));
  }

  sendjwt(user, 200, res);

  //     const token =user.getJWTToken()
  // res.status(200).json({
  //     success:true,
  //     user,
  //     token
  // })
});

// LOGGED OUT

exports.logout = catchAsyncError(async (req, res, next) => {
  // console.log(req);
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// FORGOT PASSWORD

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // console.log(req);
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("user not fount ", 404));
  }

  // GET RESET PASSWORD TOKEN
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = ` your reset password token  is  :- \n\n ${resetPasswordUrl} .\n \n if you  have not requested this email,plese ignore it. `;

  try {
    await sendEmail({
      email: user.email,
      subject: "ecommerce password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: ` email sen to ${user.email}  successfuly`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// FOR RESETPASSWORD AFTER FORGOT PSASSWORD
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // console.log(req);
  // CREATE HASH TOKEN
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // console.log(user);

  if (!user) {
    return next(
      new ErrorHandler(
        "reset password token is invalied or has been expire ",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match  ", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendjwt(user, 200, res);
});

// GET USER DETAIL

exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// CHANGE USER PASSWORD
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("oldPassword is incorrect ", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match  ", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  res.status(200).json({
    success: true,
    user,
  });

  sendjwt(user, 200, res);
});

// UPDATE PROFILRE

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // console.log(req);
  const oldAvatar = req.user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(oldAvatar);

  const avatar = req.files.avatar;
  console.log("avatar:", avatar);
  // console.log("avatartempfile:", avatar);
  const myCloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
    folder: "userAvatars",
    width: 300,
    crop: "scale",
  });
  // console.log(myCloud);
  fs.unlinkSync(avatar.tempFilePath);

  newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  };

  // console.log(newUserData);
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.save();

  res.status(200).json({
    success: true,
  });
});

// GET ALL USER -- ADMIN
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// GET SINGLE USER -- ADMIN
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // console.log(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user not exist with this id: ${req.params.id} `, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER BY ROLE -- ADMIN
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    // name: req.body.name,
    // email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(`user not exist with this id: ${req.params.id} `, 400)
    );
  }

  //  await user.save()

  res.status(200).json({
    success: true,
    message: "user role update  successfuly",
  });
});

// DELETE USER -- ADMIN

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // TODO: REMOVE  CLOUD NARY FOR PIC
  if (!user) {
    return next(
      new ErrorHandler(`user not exist with this id: ${req.params.id} `, 400)
    );
  }

  await user.deleteOne();
  //  await user.save()

  res.status(200).json({
    success: true,
    message: "user delete successfuly",
  });
});

// FOR CONTACT US BY EMAIL

exports.contactUs = catchAsyncError(async (req, res, next) => {
  const { email, message } = req.body;
  // console.log(req.body);

  try {
    await reviceEmail({
      email,
      subject: "CONTACT",
      message,
    });

    res.status(200).json({
      success: true,
      message: ` email send  successfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
