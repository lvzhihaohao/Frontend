import '../static/css/bootstrap.min.css';
import '../static/css/slick.css';
import '../static/css/animate.css';
import '../static/css/flaticon.css';
import '../static/styles/style.scss';
// Change based on available styles like pink, brink-pink, purple then remove comment from below import & change based on available colors in static/styles folder
// import '../static/styles/purple-style.scss'; 
import '../static/css/responsive.scss';

import { Provider } from 'react-redux';
import App, {Container} from 'next/app'
import { DefaultSeo } from "next-seo";
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/reducers/cartReducer';
import React from 'react';


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
            return (
              <Container>
                <DefaultSeo
                  title="StartP - React + Next + Express Bootstrap 4 Template"
                  description="StartP is a React and Bootstrap 4 based Professional website template. This has been built with React, ES6+ and as framework Next.js and Express.js."
                  openGraph={{
                    type: "website",
                    locale: "en_IE",
                    url: "https://startp-react.envytheme.com/",
                    site_name:
                      "StartP - React + Next + Express Bootstrap 4 Template"
                  }}
                />
                <Provider store={store}>
                  <Component {...pageProps} />
                </Provider>
              </Container>
            );
        }
    }
)