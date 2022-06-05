import { Provider } from 'react-redux';
import App, {Container} from 'next/app'
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/reducers/cartReducer';
import Head from 'next/head';
import React from 'react';

import '../static/styles/style.scss';
import '../static/css/rtl.scss';
import '../static/css/responsive.scss';

export default withRedux(initStore)(
    class MyApp extends App {

        static async getInitialProps ({ Component, ctx }) {
            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}
            }
        }

        render () {
            const { Component, pageProps, store } = this.props

            let { query } = this.props.router;
            
            // let style = styleScss;
            // if(query.style == 'default'){
            //     style = styleScss
            // } else if (query.style == 'brink-pink') {
            //     style = 'brink-pink-style.scss'
            // } else if (query.style == 'pink') {
            //     style = 'pink-style.scss'
            // } else if (query.style == 'purple') {
            //     style = 'purple-style.scss'
            // }

            return (
                <Container>
                    <Head>
                        <title>StartP - React + Next + Express Bootstrap 4 Template</title>
                        {/* <link rel="stylesheet" type="text/css" href={`/static/styles/${style}`} key="color" /> */}
                        {/* <link rel="stylesheet" type="text/css" href={`/static/css/responsive.scss`} key="res" /> */}
                    </Head>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Container>
            )
        }
    }
)