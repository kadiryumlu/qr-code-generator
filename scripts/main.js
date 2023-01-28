const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size
    })
}

const clearQR = () => {
    qr.innerHTML = ''
}

const createName = (url, size) => {
    let {hostname, pathname} = new URL(url)

    hostname = hostname.replace(/\./g, '-')
    
    if(pathname.length > 1){
        pathname = pathname.replace(/\//g, '-')
        pathname = pathname.replace(/\./g, '-')
    } else {
        pathname = ''
    }

    return `${hostname}${pathname}-${size}`
}

const createDownloadQRLink = (name, img) => {
    const link = document.createElement('a')
    link.href = img
    link.download = name
    link.innerHTML = qr.innerHTML

    return link
}

const onGenerateSubmit = (e) => {
    e.preventDefault()
    clearQR()

    const url = document.getElementById('url').value
    const size = document.getElementById('size').value

    if(url === ''){
        alert('Please enter a URL')
    } else {
        generateQRCode(url, size)

        setTimeout(() => {
            const img = qr.querySelector('img').src
            const name = createName(url, size)
            const link = createDownloadQRLink(name, img)

            qr.innerHTML = link.outerHTML
        }, 50)
    }
}

form.addEventListener('submit', onGenerateSubmit);