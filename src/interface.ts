export interface User {
    uid: number;
    uname: string;
    email: string;
    description: string;
    avatar: string;
}

export interface Blog {
    blogId: number;
    content: string;
    title: string;
    author: number;
    createTime: number;
    updateTime: number;
    password?: string;
    commentsCount?: number;
    protected?: boolean;
}

export interface Comment {
    commentId: number;
    blogId: number;
    content: string;
    author: number;
    createTime: number;
    updateTime: number;
}
