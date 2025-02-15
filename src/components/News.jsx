import React, { Component } from 'react'
import NewsIteams from './NewsIteams';
import { Spinners } from './Spinners';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }



  constructor() {
    super();
    console.log("Hello this is constructor")
    this.state = {
      articles: [],
      loading: false,
      totalResults: 0,
      page: 1,



    }
  }


  //&page=${this.state.page}&pageSize=${this.state.pageSize}

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=129704cdd5334237944075d4b44b1f9b&page=1&pageSize=5`;
    this.setState({ loading: true })
    let data = await fetch(url);


    let parseData = await data.json()
    console.log("this is componentDidMount")
    console.log(`hello parseData ${parseData.articles}`)
    console.log(`hello totalResults ${parseData.totalResults}`)



    if (JSON.stringify(parseData.articles) !== JSON.stringify(this.state.articles)) {
      this.setState({
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        loading: false,
      });
    } else {
      console.log("No new articles.");
      this.setState({ loading: false });
    }

  }


  async componentDidMount() {
    this.updateNews()

  };



  handlePrevClick = async () => {
    //   console.log("Prev Click")
    //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&category=${this.props.category}&apiKey=129704cdd5334237944075d4b44b1f9b&page=${this.state.page - 1}&pageSize=5`;
    //   this.setState({ loading: true })
    //   let data = await fetch(url);
    //   let parseData = await data.json()
    //   console.log("this is componentDidMount")
    //   console.log(parseData)
    //   this.setState({
    //     articles: parseData.articles,
    //     page: this.state.page - 1,
    //     loading: false,

    //   })
    //   console.log(this.state.page)

    this.setState({
      page: this.state.page - 1,
    })
    this.updateNews()

  }

  handleNextClick = async () => {
    // console.log("Next Click")

    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&category=${this.props.category}&apiKey=129704cdd5334237944075d4b44b1f9b&page=${this.state.page + 1}&pageSize=5`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log("this is componentDidMount")
    // console.log(parseData)
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parseData.articles,
    //   loading: false,
    // })
    this.setState({
      page: this.state.page + 1,
    })
    this.updateNews()

  }

  render() {

    return (
      <div className='container my-3'>
        <h2>News-Monk Top Headline</h2>
        {this.state.loading && <Spinners />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className='col-md-4' key={element.url}>
              <NewsIteams title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} aurther={element.aurther} date={element.publishedAt} source={element.source.name} />

            </div>
          })}

        </div>
        <div className="d-flex justify-content-between">

          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; prev</button>
          <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / 5))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next	&rarr;</button>

        </div>

      </div>
    )
  }
}

export default News