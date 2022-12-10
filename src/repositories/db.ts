import {settings} from "../settings";
import mongoose from 'mongoose';
import {
    BlogDBClass,
    CommentDBClass,
    PostDBClass,
    UserAccountDBClass,
    SentEmailsClass,
    LoginAttemptsClass,
    NewestLikesClass, QuizGameDBClass, PlayerClass, GameQuestionClass, userDevicesDataClass
} from "../types/types";
require('dotenv').config()

const blogsSchema = new mongoose.Schema<BlogDBClass>({
    id:String,
    name: String,
    description: String,
    websiteUrl: String,
    createdAt: Date,
}, {
    versionKey: false
});

const newestLikesSchema = new mongoose.Schema<NewestLikesClass>({
    createdAt: Date,
    userId: String,
    login: String
}, { _id : false })


const postsSchema = new mongoose.Schema<PostDBClass>({
    id:String,
    title: String,
    shortDescription: String,
    content: String,
    blogId: String,
    blogName: String,
    createdAt: Date,
    },{versionKey: false}
);

const loginAttemptsSchema = new mongoose.Schema<LoginAttemptsClass>({
    attemptDate: String,
    ip: String
}, { _id : false })

const sentEmailsSchema = new mongoose.Schema<SentEmailsClass>({
    sentDate: String
}, { _id : false })



const playerSchema = new mongoose.Schema<PlayerClass>({
    answers: [
        {
            questionId: String,
            answerStatus: String,
            createdAt: Date
        }
    ],
    user: {
        id: String,
        login: String
    },
    score: Number
}, { _id : false })



const gameQuestionSchema = new mongoose.Schema<GameQuestionClass>({
    id:String,
    body: String
}, { _id : false })

const userDevicesDataSchema = new mongoose.Schema<userDevicesDataClass>({
    ip: String,
    lastActiveDate: Date,
    deviceId: String,
    title: String
}, { _id : false })

const usersAccountSchema = new mongoose.Schema<UserAccountDBClass>({
    id:String,
    login: String,
    email: String,
    passwordHash: String,
    createdAt: String,
    loginAttempts: [loginAttemptsSchema],
    emailConfirmation: {
        isConfirmed: Boolean,
        confirmationCode: String,
        expirationDate: Date,
        sentEmails: [sentEmailsSchema]
    },
    userDevicesData: [userDevicesDataSchema]
},{
    versionKey: false
})



const commentsSchema = new mongoose.Schema<CommentDBClass>({
    id:String,
    content: String,
    userId: String,
    userLogin: String,
    postId: String,
    createdAt: String,
    // likesInfo: {
    //     likesCount: Number,
    //     dislikesCount: Number,
    //     myStatus: String
    // },
    // usersLikesInfo: {
    //     usersWhoPutLike: [String],
    //     usersWhoPutDislike: [String]
    // }
},{
    versionKey: false
});


const quizSchema = new mongoose.Schema<QuizGameDBClass>({
        id: String,
        firstPlayer: playerSchema,
        secondPlayer: playerSchema,
        questions: [gameQuestionSchema],
        status: String,
        pairCreatedDate: Date,
        startGameDate: Date,
        finishGameDate: Date
    }
)







export const BlogsModelClass = mongoose.model('blogs', blogsSchema);
export const PostsModelClass = mongoose.model('posts', postsSchema);
export const UsersAccountModelClass = mongoose.model('users', usersAccountSchema);
export const CommentsModelClass = mongoose.model('comments', commentsSchema);
export const QuizModelClass = mongoose.model('quiz', quizSchema);



export async function runDb () {
  try {
    await mongoose.connect(settings.mongo_URI);
    console.log ( "Connected successfully to mongo server" ) ;
  } catch {
      console.log("Error connecting to mongo server")
      await mongoose.disconnect() ;
  }
}