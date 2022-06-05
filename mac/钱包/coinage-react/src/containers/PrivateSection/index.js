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
                        <SectionTitle title="Mix全球支付卡" subTitle="区块链资产私人银行服务" />
                    </Col>
                    <Col lg={6}>
                            <img  style={{'width':'325px'}} src={require(`../../../src/assets/images/bg/46f50db1.png`)}  alt="blog" />
                        {/* <Video /> */}
                    </Col>
                    <Col lg={6}>
                        <div className="pd-top-37">
                            <h3 className="entry-title">Mix全球支付卡</h3>
                            <p>区块链资产私人银行服务</p>
                            <p>Mix卡为您提供在全球各地购物、旅行、娱乐等各种消费的支付服务。您每次在境外提供比特卡网络的商户消费付款，只需要出示Mix卡使用消费，系统将自动从比特卡扣除消费金额与费用，免去您支付现金的麻烦，支付安全、消费隐私受到法律保护。</p>
                            <a className="btn btn-white-shadow" href="#">查看更多</a>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}
export default AboutSection