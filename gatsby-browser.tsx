import React from "react"
import { Layout } from './src/components/Layout'


export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.pathname && location.pathname == "/") {
    return [0, 0]
  }
  const currentPosition = getLatestSavedScrollPosition(location.pathname)

  window.scrollTo(currentPosition[0] || 0, currentPosition[1] || 0)
  return false
}


const getLatestSavedScrollPosition = (pathname) => {
  let n = sessionStorage.length;
  let i = 0;

  const partialKey = `@@scroll|${pathname}|`
  let results: string[] = [];
  while (++i < n) {
    const key = sessionStorage.key(i);
    if (key && key.includes(partialKey)) {
      results.push(key)
    }
  }
  if (results.length === 0) {
    return [0, 0];
  }
  results.sort();
  return [0, Math.floor(Number(sessionStorage.getItem(results[results.length - 1])) || 0)];
}