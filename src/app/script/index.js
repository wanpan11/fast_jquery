import '../style/index.scss'
import logoFile from '../img/hey.png'

window.onload = () => {
    var logo = document.getElementById('logo');
    console.log(logoFile);
    logo.src = logoFile

    let index = x => console.log(x);
    index('index');
}

