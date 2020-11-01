// promise resolve reject

const promise = function () {
    return new Promise(function (resolve, reject) {
        resolve('success')
    })
}


promise().then((resolve) => {
    resolve
})
