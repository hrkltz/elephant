import { createFile, deleteFile, getAllFile } from './githubApi'

window.hrkltzio = {
    load: (path: string): void => {
        console.log('open', path)
    },

    listOnClick: () => {
        showFiles()
    },

    createOnClick: () => {
        const title = document.getElementById('title')!.value
        const content = document.getElementById('content')!.value
        createFile(title, content).finally(() => window.setTimeout(showFiles, 1000))
    },

    deleteOnClick: () => {
        const title = document.getElementById('title')!.value
        deleteFile(title).finally(() => window.setTimeout(showFiles, 1000))
    }
}

const showFiles = () => {
    getAllFile().then((data) => {
        let listOfFiles: string = ''

        for (let entry of data) {
            listOfFiles += `<ul onclick="hrkltzio.load('${entry.name}')">${entry.name}</ul>`
        }

        document.getElementById('files')!.innerHTML = listOfFiles
    })
}
