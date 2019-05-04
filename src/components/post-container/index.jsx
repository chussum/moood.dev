import React from 'react'

export const PostContainer = ({ html }) => (
  <div class="content" dangerouslySetInnerHTML={{ __html: html }} />
)
