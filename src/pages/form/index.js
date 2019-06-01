import React from 'react'
import { Button ,WhiteSpace, WingBlank } from 'antd-mobile'
import router from 'umi/router'
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(item){
      router.push(`/${item}`)
    }
    render(){
       const styles = {
         fontFamily:'Microsoft Yahei',
         fontSize:'16px',
         color:'red'
       }
        return( 
          <div>
          <WingBlank style={{marginBottom:"65px"}}>
              <h2 style={{fontFamily:'Microsoft Yahei',fontSize:'23px',marginTop:'20px',fontWeight:"bold"}}>第六届NEUQ图灵杯团队赛报名表</h2>
              <p style={{fontFamily:'Microsoft Yahei',fontSize:'20px',fontWeight:'blod'}}>注意事项</p>
              <p style={styles}>1.欲参加现场赛的同学,请进入第一个入口(包括本校和外校)</p>
              <p style={styles}>2.欲参加网络赛的同学，请走第二个入口</p>
              <p style={styles}>3.现场赛所有队员信息需填写完整,网络赛如果是单人组队可以只用填写个人</p>
              <WhiteSpace />
            <Button type="primary" style={{maxWidth:'800px' ,margin:'0 auto'}} onClick={()=>{this.handleClick('live')}}>现场赛报名入口</Button><WhiteSpace /><WhiteSpace />
            <Button type="ghost" style={{maxWidth:'800px' ,margin:'0 auto'}} onClick={()=>{this.handleClick('net')}}>网络赛报名入口</Button><WhiteSpace /><WhiteSpace />
         </WingBlank>
         <div style={{height:'42px'}}></div>
         </div>
        )
    }
}

