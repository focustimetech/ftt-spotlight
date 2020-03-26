import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document'

class SpotlightDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
        <Html>
            <Head>
            <meta charSet='UTF-8' />
            <meta name='format-detection' content='telephone=no' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
            <meta name='msapplication-TileColor' content='#034670' />
            <meta name='theme-color' content='#034670' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'></link>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' rel='stylesheet' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
  }
}

export default SpotlightDocument
