import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    bio: {
      type: String,
      maxlength: 150,
      default: '',
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    notifications: [
      {
        type: { type: String, enum: ['like', 'comment', 'follow', 'mention'] },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        createdAt: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);
export const User = mongoose.model('user', userSchema);




// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     profilePicture: {
//       type: String, default: ''
//     },
//     coverPicture:
//       { type: String, default: '' },
//     bio: 
//     { type: String, maxlength: 150, default: '' },
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
//     savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
//     isPrivate: { type: Boolean, default: false },
//     isVerified: { type: Boolean, default: false },
//     lastSeen: { type: Date, default: Date.now },
//     isOnline: { type: Boolean, default: false },
//     blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     notifications: [
//       {
//         type: { type: String, enum: ['like', 'comment', 'follow', 'mention'] },
//         sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
//         createdAt: { type: Date, default: Date.now },
//         isRead: { type: Boolean, default: false },
//       },
//     ],
//   },
//   { timestamps: true },
// );

// export const User = mongoose.model('User', userSchema);
