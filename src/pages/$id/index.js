import React from 'react'
import axios from 'axios'
import {  Col, Form, Input, Row, Cascader ,Radio ,Select} from 'antd'
import { Button　} from 'antd-mobile'
import router from 'umi/router'
import verity from 'utils/regex'
import Options from 'utils/Options'
import styles from './index.less'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
// const Option = Select.Option
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      submitted: false,
      title:'图灵杯现场赛',
      value:'live',
      type:0,
      status:''
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.school = this.school.bind(this);
  }
  
  school(type){
     this.setState({
       type
     })
  }

  handleReset () {
    this.setState({loading: false,submitted:false,status:''})
    this.props.form.resetFields()
  }
  
   componentDidMount(){
     let value = this.props.match.params.id;
     if(value === 'live'){
      this.setState({
        title:'图灵杯现场赛',
        value,
        type:0,
      })
    }else if(value === 'net'){
      this.setState({
        title:'图灵杯网络赛',
        value,
        type:2
      })
    }
   }

   async handleSubmit(){
      const { value,type } = this.state;
      let data = {};
      this.props.form.validateFields((err, values) => {
        if (!err) {
         data = values
        }
      })
      if(!Object.values(data).length){
         return
      }
      this.setState({ loading:true ,status:'validating'})
      let content = {};
      if(value==='live'&&!type){
        const { dwmc,dyxm1,qq1,dysj1,zy1,xh1,dyxm2,qq2,dysj2,zy2,xh2,dyxm3,qq3,dysj3,zy3,xh3,xb1,xb2,xb3 } = data;
        content = {
          team_name:dwmc,
          flag:type,

          leader:dyxm1,
          qq0:qq1,
          sex0:xb1===0?'男':'女',
          mobile0:dysj1,
          college0:zy1.join('-'),
          std_num0:xh1,

          member1:dyxm2,
          qq1:qq2,
          sex1:xb2===0?'男':'女',
          mobile1:dysj2,
          college1:zy2.join('-'),
          std_num1:xh2,

          member2:dyxm3,
          qq2:qq3,
          sex2:xb3===0?'男':'女',
          mobile2:dysj3,
          college2:zy3.join('-'),
          std_num2:xh3,
        }
      }  else if(value==='live'&&type===1){
        const { xxmc,dwmc,dyxm1,qq1,dysj1,dyxm2,qq2,dysj2,dyxm3,qq3,dysj3,xb1,xb2,xb3 } = data;
        content = {
          team_name:dwmc,
          flag:type,
          school_name:xxmc,
           
          leader:dyxm1,
          qq0:qq1,
          sex0:xb1===0?'男':'女',
          mobile0:dysj1,

          member1:dyxm2,
          qq1:qq2,
          sex1:xb2===0?'男':'女',
          mobile1:dysj2,
        

          member2:dyxm3,
          qq2:qq3,
          sex2:xb3===0?'男':'女',
          mobile2:dysj3, 
        }
      } else if(value==='net'&&type===2){
        const { xxmc,dwmc,dyxm1,qq1,dysj1,dyxm2,qq2,dysj2,dyxm3,qq3,dysj3,xb1,xb2,xb3 } = data;
        content = {
          team_name:dwmc,
          flag:type,
          school_name:xxmc,
           
          leader:dyxm1,
          qq0:qq1,
          sex0:xb1===0?'男':'女',
          mobile0:dysj1,

          member1:dyxm2?dyxm2:"",
          qq1:qq2?qq2:"",
          sex1:xb2===0?'男':'女',
          mobile1:dysj2,
        

          member2:dyxm3,
          qq2:qq3,
          sex2:xb3===0?'男':'女',
          mobile2:dysj3, 
        }
      }
     const res = await axios.post(`http://baoming.lyzwhh.top/form/applyteam`,{
          ...content
      })
      if(res.status===200){
        setTimeout(()=>{
          this.setState({
            loading:false,
            submitted:true,
            status:'success'
          },()=>{
           router.push('/success')
          })
        },2000)
      }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { title,value,type,status } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
      }
    }
   return value==='live'? (
       <div style={{marginBottom:'60px'}}>
        <div className={styles.bgc}>
        <div className={styles.header}>
           <h2>{`${title}报名表`}</h2>
        </div>
        <div className={styles.content}>
          
         <Form 
         >
                <FormItem
                   label='是否本校'
                   {...formItemLayout}
                   key='xuexiao'
                >
                {getFieldDecorator('sfbx', {
                    rules: [{
                        required: true, message: '请选择是否为本校学生'
                    }]
                    })(
                      <Select
                           placeholder="本校学生"
                           isRequired="0"
                       >
                           <Option value="0" onClick={()=>{this.school(0)}}>本校学生</Option>
                           <Option value="1" onClick={()=>{this.school(1)}}>外校学生</Option>
                       </Select>
                    )}
               </FormItem>

                {
                  value==='live'&&type===0?"":
                    <FormItem
                    label='学校名称'
                    {...formItemLayout}
                    key='name'
                    validateStatus={status}
                    >
                        {getFieldDecorator('xxmc', {
                            rules: [{ required: true, message: '请输入学校名称!' }],
                        })(
                            <Input placeholder="请输入学校名"  />
                        )}
                    </FormItem>
                }

               <FormItem
                      label='队伍名称'
                      {...formItemLayout}
                      key='teamname'
                      >
                      {getFieldDecorator('dwmc', {
                            rules: [{
                              pattern:verity.teamName,message:'您的队伍名称不符合长度规范' 
                            },{ required: true,message: '请填写您的队伍名称' }],
                      })(
                          <Input placeholder="请填写您的队伍名称" />
                      )}
                </FormItem>

                <FormItem
                      label='队长姓名'
                      {...formItemLayout}
                      key='dyxm1'
                      >
                      {getFieldDecorator('dyxm1', {
                            rules: [{ required: true,message: '请填写队长姓名' }],
                      })(
                          <Input placeholder="请填写队长的姓名" />
                      )}
                </FormItem>

               <FormItem
                    label='队长性别'
                    {...formItemLayout}
                    key='sex1'
                   
                >
                    {getFieldDecorator('xb1', {
                    rules: [{
                        required: true, message: '请选择性别'
                    }]
                    })(
                      <RadioGroup name="radiogroup" initialValue={1}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                      </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                      label='队长手机号'
                      {...formItemLayout}
                      key='mobile1'
                      >
                      {getFieldDecorator('dysj1', {
                            rules: [{
                              pattern:verity.mobile,message: '请输入正确的号码'
                          },{ required: true,message: '请填写队长的手机号' }],
                      })(
                          <Input placeholder="请填写队长的手机号" />
                      )}
                </FormItem>

                <FormItem
                    label='队长QQ号'
                    {...formItemLayout}
                    key='QQ1'
                >
                      {getFieldDecorator('qq1', {
                            rules: [{
                              pattern:verity.qq,message: '请输入正确的QQ号'
                          },{ required: true,message: '请填写队长的QQ号' }],
                      })(
                          <Input placeholder="请填写队长的QQ号" />
                      )}
                </FormItem>
               {
                  value==='live'&&type===0?(
                  <>
                  <FormItem
                  label='队长专业'
                  {...formItemLayout}
                  key='carnumber1'
                  >
                      {getFieldDecorator('zy1', {
                          rules: [{ required: true, message: '请选择队长的专业' }],
                      })(
                        <Cascader options={Options} placeholder="请选择队长的专业" />
                      )}
                  </FormItem>
                   <FormItem
                   label='队长学号'
                   {...formItemLayout}
                   key='xh1'
                   >
                       {getFieldDecorator('xh1', {
                           rules: [{
                            pattern:verity.number,message:'学号不符合规范' 
                          },{required: true, message: '请输入队长学号!' }],
                       })(
                           <Input placeholder="请输入队长的学号"/>
                       )}
                 </FormItem>
                 </>
                  )
                   :""
               }

                <FormItem
                      label='队员1姓名'
                      {...formItemLayout}
                      key='dyxm2'
                      >
                      {getFieldDecorator('dyxm2', {
                            rules: [{ required: true,message: '请填写队员1姓名' }],
                      })(
                          <Input placeholder="请填写队员1的姓名" />
                      )}
                </FormItem>

                <FormItem
                    label='队员1性别'
                    {...formItemLayout}
                    key='sex2'
                   
                >
                    {getFieldDecorator('xb2', {
                    rules: [{
                        required: true, message: '请选择性别'
                    }]
                    })(
                      <RadioGroup name="radiogroup" initialValue={1}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                      </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                      label='队员1手机号'
                      {...formItemLayout}
                      key='mobile2'
                      >
                      {getFieldDecorator('dysj2', {
                            rules: [{
                              pattern:verity.mobile,message: '请输入正确的号码'
                          },{ required: true,message: '请填写队员1的手机号' }],
                      })(
                          <Input placeholder="请填写队员1的手机号" />
                      )}
                </FormItem>

                <FormItem
                    label='队员1QQ号'
                    {...formItemLayout}
                    key='QQ2'
                >
                      {getFieldDecorator('qq2', {
                            rules: [{
                              pattern:verity.qq,message: '请输入正确的QQ号'
                          },{ required: true,message: '请填写队员1的QQ号' }],
                      })(
                          <Input placeholder="请填写队员1的QQ号" />
                      )}
                </FormItem>
               {
                  value==='live'&&type===0?(
                  <>
                  <FormItem
                  label='队员1专业'
                  {...formItemLayout}
                  key='carnumber2'
                  >
                      {getFieldDecorator('zy2', {
                          rules: [{ required: true, message: '请选择队员1的专业' }],
                      })(
                        <Cascader options={Options} placeholder="请选择队员1的专业" />
                      )}
                  </FormItem>
                   <FormItem
                   label='队员1学号'
                   {...formItemLayout}
                   key='xh2'
                   >
                       {getFieldDecorator('xh2', {
                           rules: [{required: true, message: '请输入队员1学号!' }],
                       })(
                           <Input placeholder="请输入队员1的学号"/>
                       )}
                 </FormItem>
                 </>
                  )
                   :""
               }

                 <FormItem
                      label='队员2姓名'
                      {...formItemLayout}
                      key='dyxm3'
                      >
                      {getFieldDecorator('dyxm3', {
                            rules: [{ required: true,message: '请填写队员2姓名' }],
                      })(
                          <Input placeholder="请填写队员2的姓名" />
                      )}
                </FormItem>

                <FormItem
                    label='队员2性别'
                    {...formItemLayout}
                    key='sex3'
                   
                >
                    {getFieldDecorator('xb3', {
                    rules: [{
                        required: true, message: '请选择性别'
                    }]
                    })(
                      <RadioGroup name="radiogroup" initialValue={1}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                      </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                      label='队员2手机号'
                      {...formItemLayout}
                      key='mobile3'
                      >
                      {getFieldDecorator('dysj3', {
                            rules: [{
                              pattern:verity.mobile,message: '请输入正确的号码'
                          },{ required: true,message: '请填写队员2的手机号' }],
                      })(
                          <Input placeholder="请填写队员2的手机号" />
                      )}
                </FormItem>

                <FormItem
                    label='队员2QQ号'
                    {...formItemLayout}
                    key='QQ3'
                >
                      {getFieldDecorator('qq3', {
                            rules: [{
                              pattern:verity.qq,message: '请输入正确的QQ号'
                          },{ required: true,message: '请填写队员2的QQ号' }],
                      })(
                          <Input placeholder="请填写队员2的QQ号" />
                      )}
                </FormItem>
               {
                  value==='live'&&type===0?(
                  <>
                  <FormItem
                  label='队员2专业'
                  {...formItemLayout}
                  key='carnumber3'
                  >
                      {getFieldDecorator('zy3', {
                          rules: [{ required: true, message: '请选择队员2的专业' }],
                      })(
                        <Cascader options={Options} placeholder="请选择队员2的专业" />
                      )}
                  </FormItem>
                   <FormItem
                   label='队员2学号'
                   {...formItemLayout}
                   key='xh3'
                   >
                       {getFieldDecorator('xh3', {
                           rules: [{required: true, message: '请输入队员2学号!' }],
                       })(
                           <Input placeholder="请输入队员2的学号"/>
                       )}
                 </FormItem>
                 </>
                  )
                   :""
               }
        
          <FormItem
            key="form-content-footer"
          >
            <Row gutter={16} type='flex'>
              <Col xs={{span: 24}} sm={{span: 12, offset: 6}}>
                <Button
                  type='primary'
                  loading={this.state.loading}
                  disabled={this.state.submitted}
                  onClick={this.handleSubmit}
                >
                  {this.state.submitted ? '提交成功' : '点击提交'}
                </Button>

                <Button
                  type="ghost"
                  onClick={this.handleReset}
                  className='form-button-2'
                  style={{marginTop: 20}}
                >
                  重置
                </Button>
              </Col>
            </Row>
          </FormItem>

        </Form>
        </div>
        </div>
      </div>
    ):(
      <div style={{marginBottom:'55px'}}>
      <div className={styles.bgc}>
      <div className={styles.header}>
         <h2>{`${title}报名表`}</h2>
      </div>
      <div className={styles.content}>      
            <Form 
               >
                  <FormItem
                  label='学校名称'
                  {...formItemLayout}
                  key='name'
                  >
                      {getFieldDecorator('xxmc', {
                          rules: [{ required: true, message: '请输入学校名称!' }],
                      })(
                          <Input placeholder="请输入学校名"  />
                      )}
                  </FormItem>
  

             <FormItem
                    label='队伍名称'
                    {...formItemLayout}
                    key='teamname'
                    >
                    {getFieldDecorator('dwmc', {
                          rules: [{ required: true,message: '请填写您的队伍名称' }],
                    })(
                        <Input placeholder="请填写您的队伍名称" />
                    )}
              </FormItem>

              <FormItem
                    label='队长姓名'
                    {...formItemLayout}
                    key='dyxm1'
                    >
                    {getFieldDecorator('dyxm1', {
                          rules: [{ required: true,message: '请填写队长姓名' }],
                    })(
                        <Input placeholder="请填写队长的姓名" />
                    )}
              </FormItem>
 
              <FormItem
                    label='队长性别'
                    {...formItemLayout}
                    key='sex1'
                   
                >
                    {getFieldDecorator('xb1', {
                    rules: [{
                        required: true, message: '请选择性别'
                    }]
                    })(
                      <RadioGroup name="radiogroup" initialValue={1}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                      </RadioGroup>
                    )}
                </FormItem>

              <FormItem
                    label='队长手机号'
                    {...formItemLayout}
                    key='mobile1'
                    >
                    {getFieldDecorator('dysj1', {
                          rules: [{
                            pattern:verity.mobile,message: '请输入正确的号码'
                        },{ required: true,message: '请填写队长的手机号' }],
                    })(
                        <Input placeholder="请填写队长的手机号" />
                    )}
              </FormItem>

              <FormItem
                  label='队长QQ号'
                  {...formItemLayout}
                  key='QQ'
              >
                    {getFieldDecorator('qq1', {
                          rules: [{
                            pattern:verity.qq,message: '请输入正确的QQ号'
                        },{ required: true,message: '请填写队长的QQ号' }],
                    })(
                        <Input placeholder="请填写队长的QQ号" />
                    )}
              </FormItem>

              <FormItem
                    label='队员1姓名'
                    {...formItemLayout}
                    key='dyxm2'
                    >
                    {getFieldDecorator('dyxm2', {
                          rules: [{ required: false,message: '请填写队员2姓名' }],
                    })(
                        <Input placeholder="请填写队员2的姓名" />
                    )}
              </FormItem>

              <FormItem
                    label='队员1性别'
                    {...formItemLayout}
                    key='sex2'
                   
                >
                    {getFieldDecorator('xb2', {
                    rules: [{
                        required: false, message: '请选择性别'
                    }]
                    })(
                      <RadioGroup name="radiogroup" initialValue={1}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                      </RadioGroup>
                    )}
                </FormItem>

              <FormItem
                    label='队员1手机号'
                    {...formItemLayout}
                    key='mobile2'
                    >
                    {getFieldDecorator('dysj2', {
                          rules: [{
                            pattern:verity.mobile,message: '请输入正确的号码'
                        },{ required: false,message: '请填写队员1的手机号' }],
                    })(
                        <Input placeholder="请填写队员1的手机号" />
                    )}
              </FormItem>

              <FormItem
                  label='队员1QQ号'
                  {...formItemLayout}
                  key='QQ2'
              >
                    {getFieldDecorator('qq2', {
                          rules: [{
                            pattern:verity.qq,message: '请输入正确的QQ号'
                        },{ required: false,message: '请填写队员1的QQ号' }],
                    })(
                        <Input placeholder="请填写队员1的QQ号" />
                    )}
              </FormItem>

               <FormItem
                    label='队员2姓名'
                    {...formItemLayout}
                    key='dyxm3'
                    >
                    {getFieldDecorator('dyxm3', {
                          rules: [{ required: false,message: '请填写队员2姓名' }],
                    })(
                        <Input placeholder="请填写队员2的姓名" />
                    )}
              </FormItem>

              <FormItem
                    label='队员2性别'
                    {...formItemLayout}
                    key='sex3'
                   
                >
                    {getFieldDecorator('xb3', {
                    rules: [{
                        required: false, message: '请选择性别'
                    }]
                    })(
                      <RadioGroup name="radiogroup" initialValue={1}>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                      </RadioGroup>
                    )}
                </FormItem>

              <FormItem
                    label='队员2手机号'
                    {...formItemLayout}
                    key='mobile3'
                    >
                    {getFieldDecorator('dysj3', {
                          rules: [{
                            pattern:verity.mobile,message: '请输入正确的号码'
                        },{ required: false,message: '请填写队员2的手机号' }],
                    })(
                        <Input placeholder="请填写队员2的手机号" />
                    )}
              </FormItem>

              <FormItem
                  label='队员2QQ号'
                  {...formItemLayout}
                  key='QQ3'
              >
                    {getFieldDecorator('qq3', {
                          rules: [{
                            pattern:verity.qq,message: '请输入正确的QQ号'
                        },{ required: false,message: '请填写队员2的QQ号' }],
                    })(
                        <Input placeholder="请填写队员2的QQ号" />
                    )}
              </FormItem>
             
        <FormItem
          key="form-content-footer"
        >
          <Row gutter={16} type='flex'>
            <Col xs={{span: 24}} sm={{span: 12, offset: 6}}>
              <Button
                type='primary'
                loading={this.state.loading}
                disabled={this.state.submitted}
                onClick={this.handleSubmit}
              >
                {this.state.submitted ? '提交成功' : '点击提交'}
              </Button>

              <Button
                type="ghost"
                onClick={this.handleReset}
                className='form-button-2'
                style={{marginTop: 20}}
              >
                重置
              </Button>
            </Col>
          </Row>
        </FormItem>

      </Form>
      </div>
      </div>
    </div>
    )
  }
}
export default Form.create()(Home);


