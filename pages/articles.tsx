import * as React from "react";
import { GetStaticProps, NextPage } from "next";
import { GraphQLClient } from "graphql-request";

const ARTICLES_QUERY = `query ArticlesPage($limit: IntType) {
  allArticles(first: $limit) {
    id
    title
    excerpt(markdown: true)
  }

  allArticlesMeta: _allArticlesMeta {
    count
  }
}`;

interface PageProps {
  data: any;  // Sufficient for now
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const endpoint = process.env.DATOCMS_GRAPHQL_URL;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_BEARER_TOKEN}`
    }
  });

  const data = await client.request(ARTICLES_QUERY, { limit: 10 });

  return {
    props: { data },
  };
};

const ArticlesPage: NextPage<PageProps> = ({ data }) => (
  <main>
    <h1>Articles</h1>
    <span>Showing {data.allArticles.length} of {data.allArticlesMeta.count} articles</span>

    {data.allArticles.map(article => (
      <article key={article.id}>
        <h2>{article.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: article.excerpt }} />
      </article>
    ))}
  </main>
);

export default ArticlesPage;