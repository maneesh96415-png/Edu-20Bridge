import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    instructor: string;
    duration: number; // duration in hours
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<ICourse>('Course', CourseSchema);