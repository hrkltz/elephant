export interface Api {
    read(path: string): Promise<any>
    createOrUpdate(path: string, content: string, sha: String): Promise<void>
    delete(path: string, sha: string): Promise<void>
}
