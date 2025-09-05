export interface Course {
    id: string;
    title: string;
    description: string;
    instructorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCourseInput {
    title: string;
    description: string;
    instructorId: string;
}

export interface UpdateCourseInput {
    title?: string;
    description?: string;
}