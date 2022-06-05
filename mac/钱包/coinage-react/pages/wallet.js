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
                <InnerPageSection title="资产钱包" />
                <div className="main-blog-section">
                    <Container>
                        <Row>
                            <Col lg={6}>
                            <br/>
                                                <br/>
                                {
                                    this.props.walletInfo.map((item, index) => (
                                        <div className="single-post" key={index}>
                                            {/* <div className="entry-thum">
                                            <img src={require(`./../src/assets/images/blog/big/${item.img}.jpg`)}  alt="blog" />
                                            </div> */}
                                            <div className="post-details">
                                                <div className="entry-title">
                                                    <h3>
                                                        <Link href={{ pathname: '/post', query: { id: item.id } }}>
                                                            <a>{item.label}</a>
                                                        </Link>
                                                    </h3>
                                                    
                                                </div>
                                                {/* <div className="meta-post">
                                                    <ul className="meta-tag">
                                                        <li className="date"><FontAwesomeIcon icon={faCalendar} />{item.post_date}<span>|</span></li>
                                                        <li className="admin"><a href="#"><FontAwesomeIcon icon={faUser} />{item.author}</a><span>|</span></li>
                                                        <li className="commets"><FontAwesomeIcon icon={faComments} />5<span>|</span></li>
                                                        <li className="ratting"><FontAwesomeIcon icon={faHeart} />1995</li>
                                                    </ul>
                                                </div> */}
                                                <p className="entry-content"><br/>{item.text}</p>
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
                                {/* <div className="text-center mg-bottom-70">
                                    
                                    <Pagination className="page-navigation">111
                                        <Pagination.First />
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Item>{2}</Pagination.Item>
                                        <Pagination.Ellipsis />
                                        <Pagination.Item>{5}</Pagination.Item>
                                        <Pagination.Last />
                                    </Pagination>
                                </div> */}
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