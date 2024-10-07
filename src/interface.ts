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
}
