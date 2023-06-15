import React, { useCallback, useEffect, useRef, useState } from 'react'



// 纯函数组件,Hooks 使用

// useState  定义响应式变量 [变量名,方法]=useState(值)  也可以是函数  函数的返回值作为初始值
/* useEffect 监听数据变化  
第二参数 不写  任何变化都会被响应 
        空[]   任何变化都不响应
        有值   对应的值改变才响应
*/
function HooksView() {
    const [count, setCount] = useState(1000)
    const [flag, setFlag] = useState(() => {
        // 初始值为false
        return count > 1000
    })
    let [timer] = useState(null)
    useEffect(() => {
        timer = setInterval(() => {
            console.log("66666");
        }, 1000)
        console.log(itemRef);
        console.log("只触发一次,可以当做挂载的生命周期使用,发送请求等");
    }, [])

    //当count 变化 才能触发
    useEffect(() => {
        console.log(count, "当做updata生命周期使用")
        setFlag(count > 1000)
    }, [count]);
    // 返回一个函数 在函数内部执行 willUnmount的生命周期,清除定时器等操作都可以
    useEffect(() => {
        return () => {
            clearInterval(timer)
        }
    }, [count])
    // useRef  获取组件或者元素 
    const inp = useRef()
    const [inpval, setInpVal] = useState("jjjjjj")
    useCallback(() => {

    }, [])
    const [list] = useState([1, 2, 3, 5])
    const itemRef = useRef([])

    return (
        <div>
            <h1>HooksView</h1>
            <button onClick={() => setCount(count + 1)}>count++</button>
            <button onClick={() => setCount(count - 1)}>count--</button>
            <input type="text" value={inpval} ref={inp} onChange={() => setInpVal(inp.current.value)} />
            <h2> count={count}</h2>
            <h2>inpval={inpval}</h2>
            {flag && <h2>10000</h2>}
            {list.map((item, index) => {
                return <h2 key={item} ref={el => itemRef.current[index] = el}>{item}</h2>
            })}
        </div>
    )
}

export default HooksView