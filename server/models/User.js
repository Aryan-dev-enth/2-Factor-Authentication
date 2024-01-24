import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type: String, 
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    verified:{
        type:Boolean,
    },
    verificationToken:{
        type:String
    }
})

const UserModel = mongoose.model("user", userSchema);

export default UserModel;