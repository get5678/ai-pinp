/**
 * @desc 用于瀑布流渲染的组件
 * @name WaterFall
 * @author Cyearn
 * @date 2021/01/06
 */

 import React, { Component } from 'react'
 import styles from './index.scss'
 
 export default class Home extends Component {
   static defaultProps = {
     items: [],
     gutter: 10,
     cols: 12,
     colWidth: 3,
     Child: () => {},
   }
   constructor(props) {
     super(props)
     this.state = {
       width: 1440, // 默认容器大小
       layout: [], // 初始化布局
       max: 10, // 瀑布流的最大高度
     }
   }
 
   componentDidMount() {
     // 初始化size监听函数
     this.screenChange()
     this.calculateLayout()
   }
   componentDidUpdate = preProps => {
     //  侦听数据变化
     if (JSON.stringify(this.props.items) !== JSON.stringify(preProps.items)) {
       this.calculateLayout()
     }
   }
   // 卸载size监听函数
   componentWillUnmount() {
     window.removeEventListener('resize', this.resize)
   }
   // size监听函数
   screenChange = () => {
     window.addEventListener('resize', this.resize)
   }
 
   // 生成瀑布流的item
   createDom = () => {
     const { layout } = this.state
     const { gutter, items, Child } = this.props
     console.log(items)
     return items.length > 0
       ? layout.map((v, i) => {
           return (
             <div
               className={styles.item_fall}
               style={{
                 top: v.y,
                 left: v.x,
                 height: v.h,
                 width: v.w,
                 margin: `0 ${gutter}px`,
               }}
               key={v.i}
             >
               {items[i] && Child(items[i])}
             </div>
           )
         })
       : null
   }
   // 计算layout
   calculateLayout = () => {
     const { width } = this.state
     const { cols, colWidth, gutter, items } = this.props
     const count = cols / colWidth //总共有几列
     const harr = new Array(count).fill(gutter) // 初始化一个列数的全0数组
 
     let layout = [] // 定义一个空的布局列表
     let max = 10
 
     for (let i = 0; i < items.length; i++) {
       let min = Math.min.apply(null, harr) // 获取最短的列长
 
       let index = harr.indexOf(min) // 获取最短列的下标
       let oldHeight = harr[index] // 保存最短列长的原始高度
       let realWidth = (width - (count + 1) * 10) / count // 计算在dom中的宽度
       let realHeight = (items[i].height * realWidth) / items[i].width // 计算在dom中的高度
       harr[index] = harr[index] + realHeight + gutter // 给最短列加上当前item的高度
       max = Math.max.apply(null, harr) // 获取最短的列长
       let element = {
         x: index * (realWidth + gutter), // 绝对定位的left
         y: oldHeight, // 绝对定位的top
         w: realWidth, // 内容的宽
         h: realHeight, // 内容的高
         i: i.toString(), // 内容的key值
       }
       layout.push(element)
     }
     this.setState({ layout, max })
   }
 
   // 区域宽高变化时触发行高的变化
   resize = () => {
     const box = document.getElementById('watar_fall')
     let width = box.clientWidth
     // 监听窗口变化并重新计算布局
     this.setState({ width: width }, this.calculateLayout)
   }
 
   render() {
     const { max } = this.state
     return (
       <div className={styles.container} id='watar_fall' style={{ height: max }}>
         {this.createDom()}
       </div>
     )
   }
 }
 