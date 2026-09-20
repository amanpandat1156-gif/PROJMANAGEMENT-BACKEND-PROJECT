import mongoose, { Schema } from "mongoose";
import { AviailableUserRole, UserRoleEnum } from "../utils/constants.js"

const projectMemberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

     project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    role: {
        type: String,
        enum: AviailableUserRole,
        default: UserRoleEnum.MEMBER,
    },

},
 {timestamps: true},
);


export const ProjectMEMBER = mongoose.model("ProjectMember", projectMemberSchema);