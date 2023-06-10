import React, { Component, createRef } from 'react'
import './styles/index.css'
import { v4 as uuidv4 } from 'uuid';
export default class Mycomment extends Component {
    state = {
        list: [
            {
                id: uuidv4(),
                title: "1aadf11",
                content: "32fsda",
                isEidt: true
            }, {
                id: uuidv4(),
                title: "111",
                content: "32fsda",
                isEidt: true
            }, {
                id: uuidv4(),
                title: "11sfsda1",
                content: "32fsda",
                isEidt: true
            }, {
                id: uuidv4(),
                title: "1sdfas11",
                content: "32fsda",
                isEidt: true
            },
        ]
    }
    addList = (e) => {
        this.state.list.unshift({ ...e, isEidt: true, id: uuidv4() })
        this.setState({
            list: this.state.list
        })
    }
    delList = (index) => {
        this.state.list.splice(index, 1)
        this.setState({
            list: this.state.list
        })
    }
    editList = (index) => {
        this.state.list[index].isEidt = false
        this.setState({
            list: this.state.list
        })
    }
    saveList = (index, item) => {
        this.state.list.splice(index, 1, { ...item, isEidt: true })
        this.setState({
            list: this.state.list
        })
    }
    render() {
        return (
            <div style={{ border: "1px solid #f3f3f3", width: "80%", borderRadius: 10 }}>
                <h1>留言板</h1>
                <Mycontrol handler={e => this.addList(e)}></Mycontrol>
                <MyList list={this.state.list} handler1={this.delList} editList={this.editList} saveList={this.saveList}></MyList>
            </div>
        )
    }
}

class Mycontrol extends Component {
    titleRef = createRef()
    contentRef = createRef()
    resetData = () => {
        this.titleRef.current.value = ""
        this.contentRef.current.value = ""
    }
    addComment = (title, content) => {
        // 接收数据  传递到父元素 
        if (title && content) {
            this.props.handler({ title, content })
            this.resetData()
        }
        else {
            alert("请输入完整字段")
        }
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.titleRef} placeholder='标题' />
                <input type="text" ref={this.contentRef} placeholder='内容' />
                <div>
                    <button onClick={() => this.addComment(this.titleRef.current.value, this.contentRef.current.value)}>添加</button>
                    <button onClick={this.resetData}>重置</button>
                </div>
            </div>
        )
    }
}


class MyList extends Component {
    del = (index, item) => {
        // 把下标传递给父组件  进行删除
        this[item.id].classList.remove("movein")
        this[item.id].classList.add("moveout")
        console.log(this[item.id]);
        //立即删除导致动画没有时间执行
        setTimeout(() => {
            this.props.handler1(index)

        }, 1000)
    }
    edit = (index, item) => {
        // 把isEdit 状态改为 false
        this.props.editList(index)
    }
    save = (index, item) => {
        // this[item.id].classList.remove("movein")
        // this[item.id].classList.add("bounce")
        let title = this.saveTitle.current.value
        let content = this.saveContent.current.value
        this.props.saveList(index, { title, content })
    }
    saveTitle = createRef()
    saveContent = createRef()
    render() {
        const { list } = this.props
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={item.id} className='movein' ref={el => this[item.id] = el} style={{ width: "60%", background: "pink", marginTop: 20, borderRadius: 10 }}>

                                <p><input type="text" defaultValue={item.title} ref={this.saveTitle} className='inp' disabled={item.isEidt} /></p>
                                <p style={{ marginBottom: 20 }}><input className='inp' ref={this.saveContent} defaultValue={item.content} disabled={item.isEidt} /></p>
                                <div>
                                    <button onClick={() => this.del(index, item)}>删除</button>
                                    {item.isEidt ? <button onClick={() => this.edit(index, item)}>修改</button> : <button onClick={() => this.save(index, item)}>保存</button>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}