import React, { useState, useEffect } from 'react'
import NewsIteams from './NewsIteams';
import { Spinners } from './Spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types'


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);


  //document.title = `${props.category}-NewsMonkey`
  //&page=${state.page}&pageSize=${state.pageSize}

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=5`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json()
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)

    // if (JSON.stringify(parseData.articles) !== JSON.stringify(state.articles)) {
    //   setState({
    //     articles: parseData.articles,
    //     totalResults: parseData.totalResults,
    //     loading: false,
    //   });
    // } else {
    //   console.log("No new articles.");
    //   setState({ loading: false });
    // }
    props.setProgress(100)

  }
  useEffect(() => {
    updateNews()
    console.log('i fire once');
  }, []);



  const fetchMoreData = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=5`;
    setPage(page + 1)
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  };



  // handlePrevClick = async () => {
  //   //   console.log("Prev Click")
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&category=${props.category}&apiKey=129704cdd5334237944075d4b44b1f9b&page=${state.page - 1}&pageSize=5`;
  //   //   setState({ loading: true })
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json()
  //   //   console.log("this is componentDidMount")
  //   //   console.log(parseData)
  //   //   setState({
  //   //     articles: parseData.articles,
  //   //     page: state.page - 1,
  //   //     loading: false,

  //   //   })
  //   //   console.log(state.page)

  //   setState({
  //     page: state.page - 1,
  //   })
  //   updateNews()

  // }

  // handleNextClick = async () => {
  //   // console.log("Next Click")

  //   // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&category=${props.category}&apiKey=129704cdd5334237944075d4b44b1f9b&page=${state.page + 1}&pageSize=5`;
  //   // setState({ loading: true })
  //   // let data = await fetch(url);
  //   // let parseData = await data.json()
  //   // console.log("this is componentDidMount")
  //   // console.log(parseData)
  //   // setState({
  //   //   page: state.page + 1,
  //   //   articles: parseData.articles,
  //   //   loading: false,
  //   // })
  //   setState({
  //     page: state.page + 1,
  //   })
  //   updateNews()

  // }




  return (
    <div>
      <h2 className='text-center mt-3 mb-4'>News-Monk Top {props.category}  Headline</h2>
      {loading && <Spinners />}

      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading...</h4>}>
        <div className="container">
          <div className='row'>


            {articles.map((element) => {


              return <div className='col-md-4' key={element.url}>
                <NewsIteams title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} aurther={element.aurther} date={element.publishedAt} source={element.source.name} />

              </div>
            })}


          </div>
        </div>
      </InfiniteScroll>


      {/* <div className="d-flex justify-content-between">

          <button disabled={state.page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; prev</button>
          <button disabled={(state.page + 1 > Math.ceil(state.totalResults / 5))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next	&rarr;</button>

        </div> */}


    </div>
  )
}




News.defaultProps = {
  pageSize: 5,
  category: 'general'
}

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News