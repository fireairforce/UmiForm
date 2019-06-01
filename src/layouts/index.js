import React from 'react'
import styles from './index.less'
export default class Layout extends React.Component{
    render(){
        return(
         <div className={styles.App}>
            <div className={styles.App_header}>
              <img src='http://wdlj.zoomdong.xin/acm.png' className={styles.App_logo} alt='logo' />
            </div>
            {this.props.children}
            <div className={styles.App_name}>
                 <div className={styles.App_footer}>由NEUQ ACMClub技术部支持</div>
            </div>
        </div> 
        )
    }
}