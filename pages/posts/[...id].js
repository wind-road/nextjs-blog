import Layout from '../../components/layout'
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
// import hljs from 'highlight.js';
// import '../../components/shades-of-purple.css'
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className='prose'>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: hljs.highlight(postData.contentHtml, { language: 'js'}).value }} /> */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        {/* <div>
          {hljs.highlight(postData.contentHtml, { language: 'js'}).value}
        </div> */}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds().map(path => {
    const newPath = path.params.id.split('/')
    return {
      params: {
        // id: newPath.length > 1 ? newPath : newPath[0]
        id: newPath
      }
    }
  })
  // console.log(paths)
  return {
    paths,
    // paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}