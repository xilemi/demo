

// console.log('react-cli  项目的主入口文件 Hello React')
// // console.log(DESCRIPTION)
// console.log(React)

// const app = document.getElementById("app")

// import {
//     word
// }    from '~'

// import {
//     message,
//     tips 
// } from '~/many'

// import Img from '@/assets/images/404.png'


// app.innerHTML += `<h2>一定要把React 学好 </h2>`
//                 +`<h2>React is so  easy </h2>`
//                 +`<h2> ${word} </h2>`
//                 +`<h2> ${message} </h2>`
//                 +`<h2> ${tips} </h2>`
//                 +`<img src='${Img}'  />`


// import './styles/index.css'  // 样式抽离 (JS 分离处理)
// import './styles/demo.less'
// import '@/styles/style.scss'



// React 初始化 18 

import App from './App.jsx'
import { createRoot } from "react-dom/client"
import ReduxIndex from './redux/ReduxIndex.jsx'
import store from './redux/store.js'
import { render } from 'react-dom'
const root = createRoot(document.getElementById('app'))  // 根节点 

root.render(
    <ReduxIndex></ReduxIndex>
    // <App />
)  // 根节点渲染根组件

store.subscribe(() => {
    root.render(
        <ReduxIndex></ReduxIndex>
    )
})