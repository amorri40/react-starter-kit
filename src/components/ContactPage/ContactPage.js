/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ContactPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ContactPage extends Component {

  // const { id } = this.props.params;

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    router: React.PropTypes.func
  };

  componentDidMount() {
    // from the path `/inbox/messages/:id`
    const id = this.props.params.id;
    this.setState({id:id});
  };

  render() {
    const title = 'Contact Us';
    this.context.onSetTitle(title);
    // const id = this.context.router.getCurrentPath();
    return (
      <div className="ContactPage">
        <div className="ContactPage-container">
          <h1>{title}</h1>
          <p>{this.id}</p>
        </div>
      </div>
    );
  }

}

export default ContactPage;
