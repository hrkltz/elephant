import { Api } from './api'


function renderFiles() {
    Api.read('').then((pData) => {
        let listOfFiles: string = ''

        for (let entry of pData) {
            if (entry.name.match(/.html$/) == null)
                continue

            listOfFiles += `<ul><span onclick="window.hrkltzio_load('${entry.name}')">${entry.name}</span><span ondblclick="window.hrkltzio_delete('${entry.name}')">[X]</span></ul>`
        }

        document.getElementById('files')!.innerHTML = listOfFiles
    })
}


window.hrkltzio_load = (pPath: string): void => {
    Api.read(pPath).then((data) => {
        (document.getElementById('iframe') as HTMLIFrameElement).src = `data:text/html;charset=utf-8,${escape(atob(data.content))}`
    })
}


window.hrkltzio_listOnClick = (): void => {
    renderFiles()
}

window.hrkltzio_createOnClick = (): void => {
    const title = (document.getElementById('title')! as HTMLInputElement).value
    const content = ''
    const path = encodeURI(`${title}.html`)
    Api.createOrUpdate(path, content).finally(() => window.setTimeout(renderFiles, 1000))
}


window.hrkltzio_delete = (pPath: string): void => {
    Api.read(pPath).then((data) => Api.delete(pPath, data.sha)
        .finally(() => window.setTimeout(renderFiles, 1000)))
}
