export class Api {
    static async read(path: string): Promise<any> {
        return await fetch(`http://localhost:3000/file/${path}`,
            {
                method: 'GET'
            })
            .then((response) => response.json())
    }

    static async createOrUpdate(path: string, content: string, sha: String = ''): Promise<void> {
        let body: any = {
            message: "my commit message",
            committer: {
                name: "Oliver Herklotz",
                email: "oliver@hrkltz.io"
            },
            content: window.btoa(content)
        }

        if (sha != '')
            body['sha'] = sha

        return await fetch(`http://localhost:3000/file/${path}`,
            {
                method: 'PUT',
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
    }


    static async delete(path: string, sha: string): Promise<void> {
        return await fetch(`http://localhost:3000/file/${path}`,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    "message": "my commit message",
                    "committer": {
                        "name": "Oliver Herklotz",
                        "email": "oliver@hrkltz.io"
                    },
                    "sha": sha
                })
            })
            .then((response) => response.json())
    }
}
