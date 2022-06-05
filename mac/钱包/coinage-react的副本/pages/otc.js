import React, { Component } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../src/components/Sidebar'
import Link from 'next/link'
import { Pagination } from 'react-bootstrap'
import { connect } from "react-redux"
import { getAllBlogInfo } from '../src/actions/blog.actions'
import { getAllwalletInfo } from '../src/actions/wallet.actions'
import { bindActionCreators } from 'redux'
import MainLayout from '../src/components/Layout'
import InnerPageSection from '../src/containers/InnerPageSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendar, faComments, faHeart } from '@fortawesome/free-solid-svg-icons'

import ContactSection from '../src/containers/ContactSection'
import FooterSection from '../src/containers/FooterSection'

class blog extends Component {
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.getAllBlogInfo()
        this.props.getAllwalletInfo()
        console.log(this.props)
    }
    render(){
        return(
            <MainLayout>
                <InnerPageSection title="otc交易" />
                <div className="main-blog-section">
                    <Container>
                        <Row>
                            <Col lg={6}>
                            <br/>
                                                <br/>
                                {
                                    this.props.walletInfo.map((item, index) => (
                                        <div className="single-post" key={index}>
                                            
                                            <div className="post-details">
                                                <div className="entry-title">
                                                    <h3>
                                                        <Link href={{ pathname: '/post', query: { id: item.id } }}>
                                                            <a>快捷购买或出售全球资产、稳定币和比特币等数字资产</a>
                                                        </Link>
                                                    </h3>
                                                    
                                                </div>
                                                <p className="entry-content">
                                                <br/>
                                               
                                                    极速体验：注册即可购买或出售数字资产；
                                                    <br></br>
                                                    透明定价：没有隐藏或巧立名目的费用；
                                                    <br></br>
                                                    实时汇率：我们实时获取各大交易所的成交价格；
                                                    <br></br>
                                                    灵活便捷：支持小额交易与大宗订单。
                                                    <br></br>
                                                    安全缴费：可靠资金保障收款账户零风险。
                                                    </p>
                                                <Link href="">
                                                    <a className="btn btn-white-shadow">
                                                    Download on the
                                                    iOS
                                                    - 敬请期待
                                                    </a>
                                                </Link>
                                               
                                                <br/>
                                                <br/>
                                                <Link href="">
                                                    <a className="btn btn-white-shadow">
                                                        Download on the
                                                        Android
                                                        - 敬请期待
                                                        </a>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </Col>
                            <Col lg={{span: 3, offset: 1}} className="mg-bottom-100">
                                
                                   <img  style={{'width':'325px'}} src={require(`../src/assets/images/bg/46f50db1.png`)}  alt="blog" />
                            
                                {/* <Sidebar /> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* <ContactSection/> */}
                <FooterSection />
            </MainLayout>
        )
    }
}

blog.getInitialProps = () => {
  return {};
};



const mapStateToProps = state => ({
    blogInfo: state.blogInfo,
    walletInfo: state.walletInfo
});

const mapDispatchToProps = dispatch => {
    return {
        getAllBlogInfo: bindActionCreators(getAllBlogInfo, dispatch),
        getAllwalletInfo: bindActionCreators(getAllwalletInfo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(blog);