import '../../public/initStyle.scss'
import '../style/demo.scss'


var isNext = 0;
var root = document.getElementById('root')

const handlerPromise = () => {
    return new Promise((resolve, reject) => {
        if (isNext > 0) {
            resolve({
                msg: '我是demoJS',
                data: isNext
            })
        } else {
            reject('err')
        }
    })
}


let fun = () => {
    isNext++
}


setInterval(() => {
    fun()
    handlerPromise().then(feed => {
        $('#exportJs').html(feed.msg + feed.data)
    })
}, 1000)


