import * as React from "react";

import { ArticleSummaryFragment } from '../sources/datocms/__generated__/types'

const ArticleSummary: React.FC<ArticleSummaryFragment> = ({ title, excerpt }) => (
  <article>
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
  </article>
)

export default ArticleSummary;