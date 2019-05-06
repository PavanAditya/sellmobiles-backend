const {
  formSchema
} = require('../models/user.model');
const {
  transporter
} = require('../helpers/mail-transporter');
const {
  userSchema
} = require('../models/passport.model');
const {
  mobile
} = require('../models/mobile.model');
const joiValidators = require('../helpers/joi.validation');

//! for contact us
const contactUs = async (req, res, next) => {
  const {
    error,
    value
  } = joiValidators.schemaForContactUs(req);

  if (error) {
    const errorObj = new Error('Request body Validation of Schema failed');
    errorObj.status = 500;
    errorObj.message = error;
    next(errorObj);
    return;
  }
  try {
    const userEmail = req.body.email;
    const query = req.body.query;
    const feedBack = req.body.feedBack;
    const mailOptions = {
      from: 'sellmobileteam@gmail.com',
      to: 'sellmobileteam@gmail.com',
      subject: 'Feedback Form',
      text: 'Following is the Feedback/Query sent by User',
      html: `<b>userEmailId: ${userEmail}<br>
      query: ${query}<br>
      feedBack: ${feedBack}<br>
      </b>`
    };

    const data = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }

    });
    res.status(200).send({
      message: 'Success',
      data: data,
      status: 200
    });
  } catch (err) {
    res.status(401).json({
      message: 'Bad request ',
      data: '',
      status: 401
  });
  }
};

//! for fetching user details
const userDetails = async (req, res) => {
  try {
    const paramValue = req.params.username;
    const userProfile = await formSchema.find({
      tokens: {
        $elemMatch: {
          token: paramValue
        }
      }
    });
    if (!userProfile) {
      res.status(500).send({
        message: 'Bad Request',
        data: '',
        status: 500
      });
      return;
    }
    res.status(200).send({
      message: 'success',
      data: userProfile,
      status: 200
    });
  } catch (err) {
    res.status(500).send({
      message: 'Bad Request',
      data: err,
      status: 500
    });
  }
};

//! for fetching the selected user details
const selectedUserDetails = async (req, res) => {
  try {
    const paramValue = req.params.userid;
    const userProfile = await formSchema.find({
      userName: paramValue
    });
    res.status(200).send({
      message: 'success',
      data: userProfile,
      status: 200
    });
  } catch (err) {
    res.status(500).send({
      message: 'Bad Request',
      data: err,
      status: 500
    });
  }
};

// ! for Update User Details
const updateUserDetails = async (req, res, next) => {
  const {
    error,
    value
  } = joiValidators.schemaForMyProfile(req);

  if (error) {
    const errorObj = new Error('Request body Validation of Schema failed');
    errorObj.status = 500;
    errorObj.message = error;
    next(errorObj);
    return;
  }
  try {
    const user = req.body;
    let userProfile = await formSchema.findOneAndUpdate({
      tokens: {
        $elemMatch: {
          token: user.token
        }
      }
    }, {
      $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNumber: user.mobileNumber,
        location: user.location
      }
    }, { new: true });
    if (!userProfile) {
      userProfile = await userSchema.findOneAndUpdate({
        token: user.userName
      }, {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          mobileNumber: user.mobileNumber,
          location: user.location
        }
      });
      if (!userProfile) {
        res.status(500).send({
          message: 'Bad Request',
          data: '',
          status: 500
        });
        return;
      }
    }
    res.status(200).send({
      message: 'success',
      data: userProfile,
      status: 200
    });
  } catch (err) {
    res.status(500).send({
      message: 'Bad Request of User details',
      data: err,
      status: 500
    });
  }
};

const deleteUserDetails = async (req, res) => {
  try {
    const email = req.params.email;
    const mobileDescription = await mobile.deleteMany({
      userName: email
    });
    let userProfile = await formSchema.deleteOne({
      userName: email
    });
    const userProfilePassport = await userSchema.deleteOne({
      email: email
    });
    if (userProfilePassport.deletedCount && !userProfile.deletedCount) {
      userProfile = userProfilePassport;
    } else if (userProfilePassport.deletedCount && userProfile.deletedCount) {
      userProfile.deletedCount = userProfile.deletedCount + userProfilePassport.deletedCount;
    }
    if (!userProfile) {
      res.status(500).send({
        message: 'Bad Request',
        data: '',
        status: 500
      });
      return;
    }
    res.status(200).send({
      message: 'successfully deleted the profile',
      data: userProfile,
      status: 200
    });
  } catch (err) {
    res.status(500).send({
      message: 'Bad Request of User delete',
      data: err,
      status: 500
    });
  }
};

const userControllers = {
  contactUs,
  userDetails,
  updateUserDetails,
  deleteUserDetails,
  selectedUserDetails
};

module.exports = {
  userControllers: userControllers
};