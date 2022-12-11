async function read(path: string): Promise<any> {
    return await fetch(`http://localhost:3000/file/${path}`,
        {
            method: 'GET'
        })
        .then((response) => response.json())
}


async function createOrUpdate(path: string, content: string, sha: String = ''): Promise<void> {
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


async function del(path: string, sha: string): Promise<void> {
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


export async function getAllFile(): Promise<any[]> {
    return await read('')
}


export async function getFile(path: string): Promise<any[]> {
    return await read(path)
}


export async function deleteFile(title: string): Promise<void> {
    const path = encodeURI(title)
    console.log('deleteFile', path)
    return await read(path).then((data) => {
        return del(path, data.sha)
    })
}


export async function createFile(title: string, content: string): Promise<void> {
    const path = encodeURI(title)
    console.log('createFile', path)
    return await createOrUpdate(path, content)
}


export async function updateFile(title: string, content: string): Promise<void> {
    const path = encodeURI(title)
    console.log('updateFile', path)
    return await read(path).then((data) => {
        return createOrUpdate(path, content, data.sha)
    })
}
