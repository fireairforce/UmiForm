import React from 'react';

export default class Success extends React.Component{
    render(){
        const styleA = {
           width:'100%',
           height:'100%',
           marginBottom:'42px'
        }
        const styleB= {
            margin:'0 auto',
            fontSize:'20px',
            fontFamily:'Microsoft Yahei',
            fontWeight:900
        }
        const styleC = {
            margin:'0 auto',
            fontSize:'20px',
            fontFamily:'Microsoft Yahei',
            color:'red'            
        }
        return(
            <div style={styleA}>
                <div ><img src="http://wdlj.zoomdong.xin/succesh.jpeg" alt="success" style={{width:'150px',height:'150px'}}/></div>
                <div style={styleB}><p>报名成功</p></div>
                <div style={styleC}>欢迎加入2019图灵杯团队赛交流群</div>
                <div style={styleC}><p>群聊号码:924805236</p></div>
                <div><img src="http://wdlj.zoomdong.xin/qqgroup.jpg" alt="success" style={{width:'250px',height:'320px'}}/></div>
            </div>
        )
    }
}