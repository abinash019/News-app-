import loading from './loading.gif';
import { React, Component } from 'react';

export class Spinners extends Component {
  render() {
    return (
      <div className='text-center' >
        <img src={loading} alt='loading' />
      </div>

    )
  }
}