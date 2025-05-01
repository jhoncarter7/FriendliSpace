declare namespace Express{
interface Request{
    user:{
        id: string,
        username?: string
    }
    id:string,
    username?:string
}
}