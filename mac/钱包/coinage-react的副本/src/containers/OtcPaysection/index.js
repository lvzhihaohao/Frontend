import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SectionTitle from '../../components/SectionTitle'
import Video from '../../components/Video'

const AboutSection = () => {
    return(
        <div id="about" className="about-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <SectionTitle title="OTC" subTitle="OTC交易" />
                    </Col>
                   
                    <Col lg={6}>
                        <div className="pd-top-37">
                            <h3 className="entry-title">OTC</h3>
                            <p>OTC交易</p>
                            <p>我们为需要购买数字资产的机构和个人提供OTC服务，也为有大宗订单需求的客户提供更私有、个性化的服务。无论您交易的是美元、人民币还是比特币，Mix·OTC都将为您提供谨慎、安全和极具竞争力的执行和结算服务。使用安全可靠的资金缴电费，保障收款账户零风险。
</p>
                            <a className="btn btn-white-shadow" href="#">查看更多</a>
                        </div>
                    </Col>
                    <Col md={2}>
                       
                    </Col>
                    <Col lg={4}>
                            <img  style={{'width':'325px'}} src={require(`../../../src/assets/images/bg/46f50db1.png`)}  alt="blog" />
                        {/* <Video /> */}
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}
export default AboutSection