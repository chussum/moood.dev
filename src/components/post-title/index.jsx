import React from 'react'

export const PostTitle = ({ title, date }) => (
  <h1 className="title">
    {title}
    <span className="date">{date}</span>
  </h1>
)
