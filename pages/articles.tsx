import * as React from "react";
import { GetStaticProps, NextPage } from "next";
import { GraphQLClient } from "graphql-request";

import { getSdk } from '../sources/datocms/__generated__/types'
import { AllArticlesQuery } from '../sources/datocms/__generated__/types'

interface PageProps {
  data: AllArticlesQuery;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const client = new GraphQLClient(process.env.DATOCMS_GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_BEARER_TOKEN}`,
    },
  });
  
  const sdk = getSdk(client);
  const data = await sdk.allArticles({ limit: 10 })
  
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