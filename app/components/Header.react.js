/** @jsx React.DOM */
var React = require('react');
var TopicActionCreators = require('../actions/TopicActionCreators');
var TopicTextInput = require('./TopicTextInput.react');
var Statistics = require('./Statistics.react');
var AnimationMixin = require('../mixins/AnimationMixin');
var cx = require('react/lib/cx');

require('../../scss/components/_animations.scss');

var Header = React.createClass({
  mixins: [AnimationMixin],
  getInitialState: function() {
    return {
      opaque: false
    };
  },
  componentDidMount: function() {
    this.setState({
      opaque : true
    })
  },
  /**
   * @return {object}
   */
  render: function() {
    var text = 'Trending Burger Places';
    return (
      <header id="header">
        <h1 className={cx({
          'opaque--true': this.state.opaque,
          'opaque--false': !this.state.opaque
        })}>
            {this.createTextTransition(text)}
        </h1>
        <h2>Top Burger</h2>
        <Statistics topTopic={this.props.topTopic} topStat={this.props.topStat} />
        <TopicTextInput
          id="new-topic"
          placeholder="Fav burger?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      TopicActionCreators.create(text);
    }

  }

});

module.exports = Header;